import { ATTRACTIONS } from '../data/attractions';

const featured = ['skyfall', 'poseidons-descent', 'stormbreaker', 'crystal-passage'];
const artwork = import.meta.glob<string>('../assets/retro/rides/*.webp', { eager: true, import: 'default' });

export default function GoldenTickets() {
  return <section id="attractions" className="golden-tickets poster-stock" aria-labelledby="golden-title">
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id="ticket-print" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values=".67 .35 .08 0 -.024  .12 .68 .14 0 -.005  .14 .19 .58 0 .025  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues=".03 .06 .13 .26 .40 .57 .73 .85 .94 .98 1" />
            <feFuncG type="discrete" tableValues=".11 .20 .28 .34 .40 .49 .57 .66 .75 .83 .91" />
            <feFuncB type="discrete" tableValues=".13 .19 .24 .28 .29 .30 .34 .39 .46 .57 .74" />
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
