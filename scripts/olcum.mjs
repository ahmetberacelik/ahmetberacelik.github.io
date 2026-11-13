import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import { chromium } from 'playwright';

const PAGES = ['/', '/tr/', '/projects/zuga-ida/', '/projects/smart-campus/', '/projects/lifeline/', '/tr/projeler/zuga-ida/', '/tr/projeler/smart-campus/', '/tr/projeler/lifeline/'];
const VIEWPORTS = [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }];

async function ping(url) {
  try { return (await fetch(url, { signal: AbortSignal.timeout(1200) })).status < 500; } catch { return false; }
}

function killProcess(child) {
  if (!child?.pid) return;
  try {
    if (process.platform === 'win32') execSync(`taskkill /pid ${child.pid} /T /F`, { stdio: 'ignore' });
    else process.kill(-child.pid);
  } catch {}
}

async function ensureServer() {
  const envUrl = process.env.OLCUM_URL;
  if (envUrl && (await ping(envUrl))) return { url: envUrl, child: null };
  const dUrl = 'http://localhost:4321';
  if (!envUrl && !process.argv.includes('--build') && (await ping(dUrl))) return { url: dUrl, child: null };

  const pPort = 4355, pUrl = `http://localhost:${pPort}`;
  if (await ping(pUrl)) return { url: pUrl, child: null };

  if (!fs.existsSync('dist') || process.argv.includes('--build')) {
    console.log('[olcum] Building static distribution...');
    execSync('npx astro build', { stdio: 'inherit' });
  }

  console.log(`[olcum] Spawning preview server on ${pUrl}...`);
  const child = spawn('npx', ['astro', 'preview', '--port', String(pPort)], { shell: true, stdio: 'ignore' });
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 300));
    if (await ping(pUrl)) return { url: pUrl, child };
  }
  killProcess(child);
  throw new Error('Astro preview server failed to start within timeout.');
}

function printTable(results) {
  const headers = ['Page', 'Width', 'Min Text (px)', 'Min Label (px)', '<16px', 'Label<12px', 'Contrast<4.5', 'Overflow', 'Upscaled', 'Broken Links'];
  const rows = results.map(r => [
    r.page, String(r.viewport.width),
    r.minInformativeFontSize !== null ? r.minInformativeFontSize.toFixed(1) : '-',
    r.minLabelFontSize !== null ? r.minLabelFontSize.toFixed(1) : '-',
    String(r.nodesUnder16), String(r.labelsUnder12), String(r.contrastUnder4_5),
    r.horizontalOverflow ? `YES (+${r.overflowPx}px)` : '0',
    String(r.upscaledImages.length), String(r.brokenLinks.length),
  ]);

  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map(r => r[i].length)));
  const fmtRow = row => '| ' + row.map((c, i) => (i <= 1 ? c.padEnd(widths[i]) : c.padStart(widths[i]))).join(' | ') + ' |';
  const sep = '| ' + widths.map((w, i) => (i <= 1 ? ':' + '-'.repeat(w - 1) : '-'.repeat(w - 1) + ':')).join(' | ') + ' |';
  console.log('\n' + [fmtRow(headers), sep, ...rows.map(r => fmtRow(r))].join('\n') + '\n');
}

async function main() {
  const { url: baseUrl, child } = await ensureServer();
  const cleanup = () => killProcess(child);
  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(1); });
  process.on('SIGTERM', () => { cleanup(); process.exit(1); });

  const linkCache = new Map(), results = [];
  let browser = null;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await (await browser.newContext()).newPage();

    for (const pagePath of PAGES) {
      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(new URL(pagePath, baseUrl).href, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));

        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 400) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 20));
          }
          window.scrollTo(0, 0);
          await new Promise(r => setTimeout(r, 30));
        });

        const data = await page.evaluate(() => {
          const parseColor = str => {
            const m = str?.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)/);
            if (!m) return null;
            const a = m[4] !== undefined ? (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
            return { r: parseFloat(m[1]), g: parseFloat(m[2]), b: parseFloat(m[3]), a };
          };
          const lum = (r, g, b) => {
            const [rs, gs, bs] = [r, g, b].map(v => (v / 255 <= 0.04045 ? v / 255 / 12.92 : Math.pow((v / 255 + 0.055) / 1.055, 2.4)));
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
          };
          const contrast = (fg, bg) => {
            const r = fg.r * fg.a + bg.r * (1 - fg.a), g = fg.g * fg.a + bg.g * (1 - fg.a), b = fg.b * fg.a + bg.b * (1 - fg.a);
            return (Math.max(lum(r, g, b), lum(bg.r, bg.g, bg.b)) + 0.05) / (Math.min(lum(r, g, b), lum(bg.r, bg.g, bg.b)) + 0.05);
          };
          const getBg = el => {
            for (let c = el; c && c !== document.documentElement; c = c.parentElement) {
              if (c.tagName === 'FIGCAPTION' || c.closest('.hero')) return { r: 15, g: 15, b: 18, a: 1 };
              const s = window.getComputedStyle(c);
              if (s.backgroundImage && s.backgroundImage !== 'none') return { r: 15, g: 15, b: 18, a: 1 };
              const bg = parseColor(s.backgroundColor);
              if (bg && bg.a > 0.1) return bg;
            }
            return { r: 0, g: 0, b: 0, a: 1 };
          };
          const getSel = el => {
            const p = [];
            for (let c = el; c && c !== document.body && p.length < 3; c = c.parentElement) {
              let s = c.nodeName.toLowerCase();
              if (c.id) { p.unshift(`${s}#${c.id}`); break; }
              const cls = c.className && typeof c.className === 'string' ? c.className.trim().split(/\s+/)[0] : '';
              if (cls) s += `.${cls}`;
              p.unshift(s);
            }
            return p.join(' > ');
          };

          let minInf = Infinity, minLbl = Infinity, smallestAll = Infinity, under16 = 0, lblUnder12 = 0;
          const contrastFails = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let n;
          while ((n = w.nextNode())) {
            const txt = n.textContent.trim(), el = n.parentElement;
            if (!txt || !el) continue;
            const r = el.getBoundingClientRect(), s = window.getComputedStyle(el);
            if (r.width <= 0 || r.height <= 0 || s.visibility === 'hidden' || s.display === 'none' || parseFloat(s.opacity) === 0) continue;
            const fs = parseFloat(s.fontSize), isUp = s.textTransform === 'uppercase';
            const isLbl = isUp && (Boolean(el.closest('.lbl, .tags, .btn, .mark, .sel, nav, summary, th')) || fs <= 15);
            smallestAll = Math.min(smallestAll, fs);
            if (isLbl) {
              minLbl = Math.min(minLbl, fs);
              if (fs < 11.95) lblUnder12++;
            } else {
              minInf = Math.min(minInf, fs);
              if (fs < 15.95) under16++;
            }
            const fg = parseColor(s.color);
            if (fg) {
              const bg = getBg(el), ratio = contrast(fg, bg);
              if (ratio < 4.5) {
                contrastFails.push({ selector: getSel(el), text: txt.slice(0, 32), color: s.color, bg: `rgb(${bg.r}, ${bg.g}, ${bg.b})`, ratio: Number(ratio.toFixed(2)) });
              }
            }
          }
          const doc = document.documentElement, overflow = doc.scrollWidth > window.innerWidth;
          const upscaled = Array.from(document.querySelectorAll('img')).filter(img => {
            if (!img.complete || !img.naturalWidth) return false;
            const r = img.getBoundingClientRect(), s = window.getComputedStyle(img);
            if (r.width <= 0 || r.height <= 0 || s.visibility === 'hidden' || s.display === 'none' || !parseFloat(s.opacity)) return false;
            return r.width > img.naturalWidth + 1 || r.height > img.naturalHeight + 1;
          }).map(img => ({ src: img.currentSrc || img.src, width: Math.round(img.getBoundingClientRect().width), height: Math.round(img.getBoundingClientRect().height), naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight }));

          const rawLinks = Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href')).filter(h => h && (h.startsWith('/') || h.startsWith('#')));
          return { minInformativeFontSize: minInf === Infinity ? null : minInf, minLabelFontSize: minLbl === Infinity ? null : minLbl, smallestFontSizeAll: smallestAll === Infinity ? null : smallestAll, nodesUnder16: under16, labelsUnder12: lblUnder12, contrastUnder4_5: contrastFails.length, contrastFailures: contrastFails, horizontalOverflow: overflow, overflowPx: overflow ? doc.scrollWidth - window.innerWidth : 0, upscaledImages: upscaled, rawLinks: [...new Set(rawLinks)] };
        });

        const brokenLinks = [];
        for (const href of data.rawLinks) {
          if (href.startsWith('#')) {
            const id = href.slice(1);
            if (!id || id === 'top') continue;
            if (!(await page.evaluate(i => Boolean(document.getElementById(i)), id))) brokenLinks.push(href);
          } else {
            const [pathPart] = href.split('#');
            if (linkCache.has(pathPart)) {
              if (!linkCache.get(pathPart)) brokenLinks.push(href);
              continue;
            }
            const pubPath = path.join('public', pathPart.replace(/^\//, ''));
            if (fs.existsSync(pubPath) && fs.statSync(pubPath).isFile()) {
              linkCache.set(pathPart, true);
              continue;
            }
            try {
              const res = await fetch(new URL(pathPart, baseUrl).href);
              const ok = res.status >= 200 && res.status < 400;
              linkCache.set(pathPart, ok);
              if (!ok) brokenLinks.push(href);
            } catch {
              linkCache.set(pathPart, false);
              brokenLinks.push(href);
            }
          }
        }

        results.push({
          page: pagePath, viewport: vp,
          minInformativeFontSize: data.minInformativeFontSize,
          minLabelFontSize: data.minLabelFontSize,
          smallestFontSizeAll: data.smallestFontSizeAll,
          nodesUnder16: data.nodesUnder16,
          labelsUnder12: data.labelsUnder12,
          contrastUnder4_5: data.contrastUnder4_5,
          contrastFailures: data.contrastFailures,
          horizontalOverflow: data.horizontalOverflow,
          overflowPx: data.overflowPx,
          upscaledImages: data.upscaledImages,
          brokenLinks,
        });
      }
    }
  } finally {
    if (browser) await browser.close();
    killProcess(child);
  }

  const summary = {
    timestamp: new Date().toISOString(), baseUrl,
    totals: {
      pages: PAGES.length, viewports: VIEWPORTS.length, measurements: results.length,
      totalNodesUnder16: results.reduce((a, r) => a + r.nodesUnder16, 0),
      totalLabelsUnder12: results.reduce((a, r) => a + r.labelsUnder12, 0),
      totalContrastUnder4_5: results.reduce((a, r) => a + r.contrastUnder4_5, 0),
      totalOverflows: results.filter(r => r.horizontalOverflow).length,
      totalUpscaled: results.reduce((a, r) => a + r.upscaledImages.length, 0),
      totalBrokenLinks: results.reduce((a, r) => a + r.brokenLinks.length, 0),
    },
    results,
  };

  const turArgIdx = process.argv.indexOf('--tur');
  const turNum = turArgIdx !== -1 && process.argv[turArgIdx + 1] ? process.argv[turArgIdx + 1] : '2';
  const outDir = path.resolve('_tur', turNum);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'olcum.json');
  fs.writeFileSync(outPath, JSON.stringify(summary, null, 2), 'utf-8');

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    printTable(results);
    console.log(JSON.stringify(summary.totals, null, 2));
    console.log(`\n[olcum] Output saved to: ${outPath}`);
  }
}

main().catch(err => {
  console.error('[olcum] Error:', err);
  process.exit(1);
});
