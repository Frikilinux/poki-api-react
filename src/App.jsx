import './App.css'
import { PokeCards } from './Card'

const appState = {
  currentURL: 'https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0',
  isFetching: false
}

const fetchPokemons = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

// const setNextURl = (data) => {
//   return data.next
// }

export const getPokemonsData = async () => {
  const { next, results } = await fetchPokemons(appState.currentURL)
  appState.currentURL = next

  const pokemonDataUrls = results.map((pokemon) => {
    return pokemon.url
  })

  const pokemonsData = await Promise.all(
    pokemonDataUrls.map(async (url) => {
      const nextPokemonsData = await fetch(url)
      return await nextPokemonsData.json()
    })
  )

  return pokemonsData
}

export const pokemonesData = await getPokemonsData()

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
      <div className="poke__container" id="caja">
        <PokeCards pokeData={pokemonesData}/>
      </div>
    </section>
  )
}

// export default APP
