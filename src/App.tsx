import Header from './components/Header'
import Hero from './components/Hero'
import IslandMap from './components/IslandMap'

function App() {
  const isMap = import.meta.env.VITE_MAP_PREVIEW === 'true' || window.location.pathname.replace(/\/$/,'') === '/map'
  return <div><Header />{isMap ? <IslandMap /> : <Hero />}</div>
}

export default App

