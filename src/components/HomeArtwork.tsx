import './home-artwork.css';

const illustrations = import.meta.glob('../assets/living-atlas/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
// Approved raster masters. Vite bundles these local repository files as assets.
const approvedArtwork: Record<string, string> = {
  'paradise-beach': new URL('../../docs/design/review/about-art-v1/ART-01-ocean-bay.png', import.meta.url).href,
  'velocity-racers': new URL('../../docs/design/review/about-art-v1/ART-02-velocity-racers.png', import.meta.url).href,
  'emerald-walk': new URL('../../docs/design/review/about-art-v1/ART-03-emerald-walk.png', import.meta.url).href,
  'grand-infinity-pool': new URL('../../docs/design/review/about-art-v1/ART-04-grand-hotel.png', import.meta.url).href,
  'tidal-kingdom': new URL('../../docs/design/review/remaining-art-v1/ART-05-tidal-kingdom.png', import.meta.url).href,
  'stormbreaker': new URL('../../docs/design/review/remaining-art-v1/ART-06-stormbreaker.png', import.meta.url).href,
  'rainbow-reef': new URL('../../docs/design/review/remaining-art-v1/ART-07-rainbow-reef.png', import.meta.url).href,
  'lotus-thermal-pools': new URL('../../docs/design/review/remaining-art-v1/ART-08-lotus-thermal-pools.png', import.meta.url).href,
  'sunset-market-square': new URL('../../docs/design/review/remaining-art-v1/ART-09-sunset-market-square.png', import.meta.url).href,
  'palm-avenue': new URL('../../docs/design/review/remaining-art-v1/ART-10-palm-avenue.png', import.meta.url).href,
  'skyfall': new URL('../../docs/design/review/skyfall-tidal-drop-v2/ART-11-skyfall-v2.png', import.meta.url).href,
  'poseidons-descent': new URL('../../docs/design/review/remaining-art-v1/ART-12-poseidons-descent.png', import.meta.url).href,
  'crystal-passage': new URL('../../docs/design/review/remaining-art-v1/ART-13-crystal-passage.png', import.meta.url).href,
  'eagles-lookout': new URL('../../docs/design/review/remaining-art-v1/ART-14-eagles-lookout.png', import.meta.url).href,
  'tidal-drop': new URL('../../docs/design/review/skyfall-tidal-drop-v2/ART-15-tidal-drop-v2.png', import.meta.url).href,
};

const resources: Record<string, string> = {
  'ocean-bay': 'paradise-beach',
  'adrenaline-peak': 'velocity-racers',
  'eden-gardens': 'emerald-walk',
  hotel: 'grand-infinity-pool',
  'atlantis-realm': 'tidal-kingdom',
  'serenity-spa': 'lotus-thermal-pools',
  'pirates-cove': 'stormbreaker',
  'little-paradise': 'rainbow-reef',
  'paradise-market': 'sunset-market-square',
  'paradise-boulevard': 'palm-avenue',
};

/** Local object studies; shared by editorial cards and actual planner recommendations. */
export function HomeArtwork({ subject, label, className = '' }: { subject: string; label: string; className?: string }) {
  const resource = resources[subject] ?? subject;
  const src = approvedArtwork[resource] ?? illustrations[`../assets/living-atlas/${resource}.svg`];
  if (!src) return <div className={`apr-atlas apr-atlas--empty ${className}`} aria-hidden="true" />;
  return <div className={`apr-atlas ${className}`} data-atlas-subject={subject} data-art-approved={approvedArtwork[resource] ? "true" : undefined}>
    <img src={src} alt={label} width="640" height="480" loading="lazy" decoding="async" />
  </div>;
}
