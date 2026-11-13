import type { SiteData } from './types';
import { enData } from './en';
import { trData } from './tr';

export function getSiteData(lang: 'en' | 'tr'): SiteData {
  return lang === 'en' ? enData : trData;
}

export { enData, trData };
