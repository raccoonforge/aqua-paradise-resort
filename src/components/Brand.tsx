import palm from '../assets/retro/apr-palm-logo.svg';

export default function Brand({ sunset = false }: { sunset?: boolean }) {
  return <a className="apr-brand" href="#/" aria-label="Aqua Paradise Resort — главная">
    <img src={palm} width="76" height="69" alt="" />
    <span className="apr-brand__name">
      {sunset ? <>Aqua Paradise<span className="pier-resort">Resort</span></> : <>Aqua<br />Paradise<small>Resort</small></>}
    </span>
  </a>;
}
