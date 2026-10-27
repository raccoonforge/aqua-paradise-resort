import Header from "./components/Header";
import Homepage from "./components/Homepage";
import IslandMap from "./components/IslandMap";

function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isMap = import.meta.env.VITE_MAP_PREVIEW === "true" || path === "/map";
  return (
    <>
      <Header />
      {isMap ? (
        <IslandMap />
      ) : path === "/" ? (
        <Homepage />
      ) : (
        <main id="main-content" className="coming-page">
          <p className="eyebrow">AQUA PARADISE · В РАЗРАБОТКЕ</p>
          <h1>
            Продолжение путешествия
            <br />
            ещё впереди.
          </h1>
          <p>
            Этот раздел пока не реализован. Исследуйте главную страницу или
            карту острова.
          </p>
          <a className="resort-button dark" href="/">
            На главную ↗
          </a>
          <a className="resort-button" href="/map">
            Карта острова ↗
          </a>
        </main>
      )}
    </>
  );
}
export default App;
