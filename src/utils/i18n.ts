export type Locale = 'en' | 'tr';

export function getHomePath(lang: Locale): string {
  return lang === 'en' ? '/' : '/tr/';
}

export function getProjectPath(lang: Locale, projectSlug: string): string {
  return lang === 'en'
    ? `/projects/${projectSlug}/`
    : `/tr/projeler/${projectSlug}/`;
}

export function getAlternatePath(lang: Locale, projectSlug?: string): string {
  const targetLang: Locale = lang === 'en' ? 'tr' : 'en';
  if (projectSlug) {
    return getProjectPath(targetLang, projectSlug);
  }
  return getHomePath(targetLang);
}
