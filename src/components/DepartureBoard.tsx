import { useState } from 'react';
import { ALL_INTERESTS, parties, todayLocal } from '../data/planner-options';
import HeaderLineIcon from './HeaderLineIcon';
import traveller from '../assets/retro/departure-traveller.webp';
import foreground from '../assets/retro/departure-foreground.webp';

function Letters({value}: {value: string}) {
  return <span className="board-letters" aria-hidden="true">
    {Array.from(value.toLocaleUpperCase('ru')).map((letter, i) => <i key={i}><b key={letter}>{letter === ' ' ? ' ' : letter}</b></i>)}
  </span>;
}

function localDate(value: Date) {
  return [value.getFullYear(), String(value.getMonth()+1).padStart(2,'0'), String(value.getDate()).padStart(2,'0')].join('-');
}

export default function DepartureBoard() {
  const [date, setDate] = useState(todayLocal);
  const [party, setParty] = useState('couple');
  const [interests, setInterests] = useState<string[]>(['Релакс']);
  const [error, setError] = useState('');
  const selected = parties.find(option => option.id === party)!;
  const dateLabel = date === todayLocal() ? 'Сегодня' : date ? new Date(date + 'T12:00').toLocaleDateString('ru', {day:'numeric', month:'short', year:'numeric'}) : 'Дата';
  function changeDay(delta: number) {
    const next = new Date((date || todayLocal()) + 'T12:00');
    next.setDate(next.getDate() + delta);
    setDate(localDate(next) < todayLocal() ? todayLocal() : localDate(next));
  }
  function changeParty(delta: number) {
    const index = parties.indexOf(selected);
    setParty(parties[(index + delta + parties.length) % parties.length].id);
  }
  return <section id="planner" tabIndex={-1} className="departure poster-stock" aria-labelledby="departure-title">
    <header className="poster-heading departure-heading">
      <span className="departure-art" aria-hidden="true">
        <img className="departure-foliage" src={foreground} width={414} height={190} alt="" loading="lazy" decoding="async" />
        <img className="departure-traveller" src={traveller} width={398} height={692} alt="" loading="lazy" decoding="async" />
      </span>
      <div className="departure-copy">
        <h2 id="departure-title">Спланируйте своё идеальное прибытие в рай</h2>
        <p>Выберите дату, компанию и настроение отдыха.</p>
      </div>
    </header>
    <form className="terminal" onSubmit={event => {
      event.preventDefault();
      if (!interests.length) { setError('Выберите хотя бы один интерес.'); return; }
      window.location.hash = '#/planner?' + new URLSearchParams({date, party, interests:interests.join(',')});
    }}>
      <div className="terminal-crown"><span className="flight-mark" aria-hidden="true">✈</span><h3>Табло отправлений в рай</h3><span>Aqua Paradise Resort</span></div>
      <div className="board-case">
        <div className="board-row">
          <label htmlFor="board-date" className="board-label"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="6" width="26" height="22" rx="2"/><path d="M3 13h26M10 3v7m12-7v7m-15 7h4m3 0h4m3 0h4M7 22h4m3 0h4"/></svg>Дата поездки</label>
          <div className="board-line"><button type="button" aria-label="Предыдущая дата" disabled={!date || date <= todayLocal()} onClick={() => changeDay(-1)}>◂</button>
            <div className="board-control"><Letters value={dateLabel} /><input type="date" required id="board-date" min={todayLocal()} value={date} onChange={e => setDate(e.target.value)}
              onClick={e => { try { e.currentTarget.showPicker(); } catch { /* Native keyboard/date entry remains available. */ } }} /></div>
            <button type="button" aria-label="Следующая дата" onClick={() => changeDay(1)}>▸</button></div>
        </div>
        <div className="board-row">
          <label htmlFor="board-party" className="board-label"><HeaderLineIcon name="family" />Кто отдыхает</label>
          <div className="board-line"><button type="button" aria-label="Предыдущая компания" onClick={() => changeParty(-1)}>◂</button>
            <div className="board-control"><Letters value={selected.label} /><select id="board-party" value={party} onChange={e => setParty(e.target.value)}>
              {parties.map(option => <option key={option.id} value={option.id}>{option.label} · {option.adults} взр.{option.children ? ' + ' + option.children + ' реб.' : ''}</option>)}
            </select></div><button type="button" aria-label="Следующая компания" onClick={() => changeParty(1)}>▸</button></div>
        </div>
        <div className="board-row"><span className="board-label" id="mood-label"><HeaderLineIcon name="compass" />Настроение отдыха</span>
          <div className="board-interests" role="group" aria-labelledby="mood-label">{ALL_INTERESTS.map(interest =>
            <button key={interest} type="button" aria-pressed={interests.includes(interest)} onClick={() => {
              setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev,interest]); setError('');
            }}><b key={String(interests.includes(interest))}>{interest}</b></button>
          )}</div></div>
        <div className="board-row"><span className="board-label"><HeaderLineIcon name="ticket" />Маршрут дня</span>
          <output className="board-summary">{selected.adults} взр.{selected.children ? ' + ' + selected.children + ' реб.' : ''} · {interests.length ? interests.join(' / ') : 'Выберите интересы'}</output>
        </div>
      </div>
      {error && <p role="alert" className="board-error">{error}</p>}
      <button type="submit" className="riv-button board-submit">Составить мой маршрут <span aria-hidden="true">→</span></button>
    </form>
  </section>;
}
