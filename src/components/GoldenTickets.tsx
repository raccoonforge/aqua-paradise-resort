import { ATTRACTIONS } from '../data/attractions';
import openingFlowers from '../assets/retro/rides/botanical-opening.webp';
import closingFlowers from '../assets/retro/rides/botanical-closing.webp';
import './GoldenTickets.css';

const featured = ['skyfall', 'poseidons-descent', 'stormbreaker', 'crystal-passage'];
const artwork = import.meta.glob<string>('../assets/retro/rides/*.avif', { eager: true, import: 'default' });

export default function GoldenTickets() {
  return <section id="attractions" tabIndex={-1} className="golden-tickets poster-stock" aria-labelledby="golden-title">
    <header className="poster-heading tickets-title">
      <img className="tickets-flora tickets-flora--opening" src={openingFlowers} alt="" width="738" height="670" loading="lazy" decoding="async" />
      <div className="tickets-title__copy">
        <p className="imprint">AQUA PARADISE RESORT</p>
        <h2 id="golden-title">Легендарные аттракционы</h2>
        <p className="ticket-subtitle">Четыре главных приключения острова</p>
      </div>
    </header>
    <div className="ticket-collection">
      {featured.map(id => {
        const ride = ATTRACTIONS.find(item => item.id === id)!;
        return <a key={id} className={'golden-ticket ride-' + id} href={'#/attractions?ride=' + id}>
          <div className="ticket-stock">
            <div className="ticket-picture"><img src={artwork['../assets/retro/rides/' + id + '.avif']} alt="" loading="lazy" width="1024" height="1024" /></div>
            <div className="ticket-lettering"><h3>{ride.name}</h3><p>{ride.zone}</p></div>
            <div className="ticket-stub"><span>{ride.intensity}</span><span>{ride.minAge}+ · от {ride.minHeight} см</span></div>
          </div>
        </a>;
      })}
    </div>
    <div className="ticket-all">
      <a className="riv-button" href="#/attractions">Все аттракционы <span aria-hidden="true">→</span></a>
      <img className="tickets-flora tickets-flora--closing" src={closingFlowers} alt="" width="820" height="309" loading="lazy" decoding="async" />
    </div>
    <div className="golden-tickets__tear" aria-hidden="true" />
  </section>;
}
