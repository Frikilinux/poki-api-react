import { useState, useEffect } from 'react'
import './App.css'
import { PokeCards } from './Card'

const appState = {
  currentURL: 'https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0',
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
  // appState.currentURL = next

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

const pokemonesData = await getPokemonsData()

const Header = () => {
  return (
    <img
      src="./src/assets/pokemon_logo.svg"
      alt=""
      className="pokemon-logo"
    />
  )
}

export function App () {
  const [url, setUrl] = useState(appState.currentURL)
  const [pokemonArr, setPokemonArr] = useState([])
  const [pokeArr, setPokeArr] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPokemonArr(data.results)
        appState.currentURL = data.next
      })
  }, [url])

  useEffect(() => {
    const getData = async () => {
      const data = await Promise.all(
        pokemonArr.map(async (pokemon) => {
          return await fetch(pokemon.url)
            .then(res => res.json())
        })
      )
      setPokeArr(data)
      setIsLoading(false)
    }
    getData()
  }, [pokemonArr])

  console.log('POKEMON ARRAY 1', pokemonArr)
  console.log('RECARGARGANDO', appState.currentURL)
  console.log('POKE ARRAY 2', pokeArr)
  return (
    <section>
      <Header/>
      <div className="poke__container" id="caja">
        <PokeCards pokeData={pokemonesData}/>
      </div>
      <button onClick={() => setUrl(appState.currentURL)}>Recargar todo</button>
    </section>
  )
}

// export default APP
