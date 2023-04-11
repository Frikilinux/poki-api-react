import { useState, useEffect } from 'react'
import './App.css'
import { PokeCards } from './Card'
import { PokeBalls } from './Pokeballs'
import LogoUrl from './assets/pokemon_logo.svg'

const appState = {
  currentURL: 'https://pokeapi.co/api/v2/pokemon/?limit=4&offset=0',
  isFetching: false
}

const Header = () => {
  return (
    <img
      src={LogoUrl}
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
    setTimeout(() => {
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
    }, 2000)
  }, [pokemonArr])

  console.log('POKEMON ARRAY 1', pokemonArr)
  console.log('RECARGARGANDO', appState.currentURL)
  console.log('POKE ARRAY 2', pokeArr)
  return (
    <section>
      <Header/>
      <div className="poke__container" id="caja">
        {isLoading ? <PokeBalls /> : <PokeCards pokeData={pokeArr}/>}
      </div>
      <button className='fire poke__type' onClick={() => setUrl(appState.currentURL)}>Próxima página</button>
    </section>
  )
}

// export default APP
