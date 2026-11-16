import './home-artwork.css';

const illustrations = import.meta.glob('../assets/living-atlas/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
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
  const src = illustrations[`../assets/living-atlas/${resource}.svg`];
  if (!src) return <div className={`apr-atlas apr-atlas--empty ${className}`} aria-hidden="true" />;
  return <div className={`apr-atlas ${className}`} data-atlas-subject={subject}>
    <img src={src} alt={label} width="640" height="480" loading="lazy" decoding="async" />
  </div>;
}
