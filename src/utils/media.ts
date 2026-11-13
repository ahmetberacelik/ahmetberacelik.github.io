import type { ImageMetadata } from 'astro';

import lifelineDevre from '../assets/media/lifeline-devre.jpg';
import profilFoto from '../assets/media/profil-foto.jpg';
import safescriptStant from '../assets/media/safescript-teknofest-2024-stant.jpg';
import takimTeknofest from '../assets/media/takim-teknofest-2026-web.jpg';
import toplulukAnkara from '../assets/media/topluluk-ankara-zirve-2025-10.jpg';
import toplulukAnkaraAfis from '../assets/media/topluluk-ankara-zirve-2025-10-afis.jpg';
import toplulukIdeathonCalisma from '../assets/media/topluluk-ideathon-2025-12-calisma.jpg';
import toplulukIdeathonGrup from '../assets/media/topluluk-ideathon-2025-12-grup.jpg';
import toplulukWorkshopGun1 from '../assets/media/topluluk-workshop-2025-11-gun1.jpg';
import toplulukWorkshopGun2a from '../assets/media/topluluk-workshop-2025-11-gun2-a.jpg';
import toplulukWorkshopGun2b from '../assets/media/topluluk-workshop-2025-11-gun2-b.jpg';
import zugaIdaAtolye1 from '../assets/media/zuga-ida-atolye-1.jpg';
import zugaIdaAtolye2 from '../assets/media/zuga-ida-atolye-2.jpg';
import zugaIdaAtolye3 from '../assets/media/zuga-ida-atolye-3-web.jpg';

export const mediaImages: Record<string, ImageMetadata> = {
  'lifeline-devre.jpg': lifelineDevre,
  'profil-foto.jpg': profilFoto,
  'safescript-teknofest-2024-stant.jpg': safescriptStant,
  'takim-teknofest-2026-web.jpg': takimTeknofest,
  'topluluk-ankara-zirve-2025-10.jpg': toplulukAnkara,
  'topluluk-ankara-zirve-2025-10-afis.jpg': toplulukAnkaraAfis,
  'topluluk-ideathon-2025-12-calisma.jpg': toplulukIdeathonCalisma,
  'topluluk-ideathon-2025-12-grup.jpg': toplulukIdeathonGrup,
  'topluluk-workshop-2025-11-gun1.jpg': toplulukWorkshopGun1,
  'topluluk-workshop-2025-11-gun2-a.jpg': toplulukWorkshopGun2a,
  'topluluk-workshop-2025-11-gun2-b.jpg': toplulukWorkshopGun2b,
  'zuga-ida-atolye-1.jpg': zugaIdaAtolye1,
  'zuga-ida-atolye-2.jpg': zugaIdaAtolye2,
  'zuga-ida-atolye-3-web.jpg': zugaIdaAtolye3,
};

export function getMediaImage(filename: string): ImageMetadata {
  const image = mediaImages[filename];
  if (!image) {
    throw new Error(`Unknown media image: ${filename}`);
  }
  return image;
}

export { takimTeknofest as defaultOgImage, profilFoto as portraitImage };
