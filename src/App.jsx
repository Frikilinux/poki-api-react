import './App.css'

const appState = {
  currentURL: 'https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0',
  isFetching: false
}

const fetchPokemons = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

const setNextURl = (data) => {
  return data.next
}

console.log('NEXXT URL', setNextURl(fetchPokemons(appState.currentURL)))

console.log(await fetchPokemons(appState.currentURL))

const PokeCard = ({ image, name, experience, types, id, height, weight }) => {
  return (
  <div className="poke">
    <img src={image} />
    <h2>{name}</h2>
    <span className="exp">EXP: {experience}</span>
    {/* <div className="tipo-poke">{createTypeSpan(types)}</div> */}
    <p className="id-poke">#{id}</p>
    <p className="height">Height: {height}m</p>
    <p className="weight">Weight: {weight}Kg</p>
  </div>
  )
}

const Header = () => {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
      alt=""
      className="pokemon-logo"
    />
  )
}

export function App () {
  return (
    <section>
      <Header/>
      <PokeCard/>
    </section>

  )
}

// export default APP
