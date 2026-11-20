import { ATTRACTIONS } from '../data/attractions';
import './GoldenTickets.css';

const featured = ['skyfall', 'poseidons-descent', 'stormbreaker', 'crystal-passage'];
const artwork = import.meta.glob<string>('../assets/retro/rides/*.avif', { eager: true, import: 'default' });

export default function GoldenTickets() {
  return <section id="attractions" tabIndex={-1} className="golden-tickets poster-stock" aria-labelledby="golden-title">
    <div className="tickets-scenery" aria-hidden="true" />
    <header className="poster-heading tickets-title">
      <p className="imprint">AQUA PARADISE RESORT</p>
      <h2 id="golden-title">Легендарные аттракционы</h2>
      <p className="ticket-subtitle">Четыре главных приключения острова</p>
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
    </div>
    <div className="golden-tickets__tear" aria-hidden="true" />
  </section>;
}
