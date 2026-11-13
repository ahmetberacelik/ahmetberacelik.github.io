import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import { chromium } from 'playwright';

const target = process.argv[2] || 'once';
const outDir = path.resolve('_tur', '2', target);
fs.mkdirSync(outDir, { recursive: true });

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
  const dUrl = 'http://localhost:4321';
  if (await ping(dUrl)) return { url: dUrl, child: null };
  const pPort = 4355, pUrl = `http://localhost:${pPort}`;
  if (await ping(pUrl)) return { url: pUrl, child: null };

  console.log(`[capture] Spawning preview server on ${pUrl}...`);
  const child = spawn('npx', ['astro', 'preview', '--port', String(pPort)], { shell: true, stdio: 'ignore' });
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 300));
    if (await ping(pUrl)) return { url: pUrl, child };
  }
  killProcess(child);
  throw new Error('Astro preview server failed to start within timeout.');
}

const SHOTS = [
  { url: '/', width: 1440, height: 900, name: 'home-en-1440.png' },
  { url: '/', width: 390, height: 844, name: 'home-en-390.png' },
  { url: '/tr/', width: 1440, height: 900, name: 'home-tr-1440.png' },
  { url: '/projects/zuga-ida/', width: 1440, height: 900, name: 'detail-zuga-ida-1440.png' },
  { url: '/projects/smart-campus/', width: 1440, height: 900, name: 'detail-smart-campus-1440.png' },
  { url: '/projects/lifeline/', width: 1440, height: 900, name: 'detail-lifeline-1440.png' },
  { url: '/projects/zuga-ida/', width: 390, height: 844, name: 'detail-zuga-ida-390.png' },
];

async function main() {
  const { url: baseUrl, child } = await ensureServer();
  const cleanup = () => killProcess(child);
  process.on('exit', cleanup);
  process.on('SIGINT', () => { cleanup(); process.exit(1); });

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    for (const shot of SHOTS) {
      await page.setViewportSize({ width: shot.width, height: shot.height });
      await page.goto(new URL(shot.url, baseUrl).href, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach(img => {
          img.loading = 'eager';
        });
        for (let y = 0; y < document.body.scrollHeight; y += 300) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 40));
        }
        const imgs = Array.from(document.querySelectorAll('img'));
        await Promise.all(imgs.map(img => {
          if (img.complete) return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
          return new Promise(resolve => {
            img.onload = () => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()).then(resolve);
            img.onerror = resolve;
          });
        }));
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 100));
      });
      const dest = path.join(outDir, shot.name);
      await page.screenshot({ path: dest, fullPage: true });
      console.log(`Saved: ${dest}`);
    }
  } finally {
    if (browser) await browser.close();
    killProcess(child);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
