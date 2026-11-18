import { ATTRACTIONS } from '../data/attractions';

const featured = ['skyfall', 'poseidons-descent', 'stormbreaker', 'crystal-passage'];
const artwork = import.meta.glob<string>('../assets/retro/rides/*.webp', { eager: true, import: 'default' });

export default function GoldenTickets() {
  return <section id="attractions" className="golden-tickets poster-stock" aria-labelledby="golden-title">
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id="ticket-print" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values=".64" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues=".03 .04 .07 .12 .24 .42 .65 .80 .91 .98 1" />
            <feFuncG type="discrete" tableValues=".12 .22 .32 .40 .49 .56 .62 .67 .73 .81 .9" />
            <feFuncB type="discrete" tableValues=".12 .19 .25 .28 .28 .24 .25 .28 .34 .45 .67" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
    <header className="poster-heading">
      <p className="imprint">AQUA PARADISE RESORT</p>
      <h2 id="golden-title">Легендарные аттракционы</h2>
      <p className="ticket-subtitle">Четыре главных приключения острова</p>
    </header>
    <div className="ticket-collection">
      {featured.map(id => {
        const ride = ATTRACTIONS.find(item => item.id === id)!;
        return <a key={id} className={'golden-ticket ride-' + id} href={'#/attractions?ride=' + id}>
          <div className="ticket-stock">
            <div className="ticket-picture"><img src={artwork['../assets/retro/rides/' + id + '.webp']} alt="" loading="lazy" width="800" height="600" /></div>
            <div className="ticket-lettering"><h3>{ride.name}</h3><p>{ride.zone}</p></div>
            <div className="ticket-stub"><span>{ride.intensity}</span><span>{ride.minAge}+ · от {ride.minHeight} см</span></div>
          </div>
        </a>;
      })}
    </div>
    <div className="ticket-all"><a className="riv-button" href="#/attractions">Все аттракционы <span aria-hidden="true">→</span></a></div>
  </section>;
}
