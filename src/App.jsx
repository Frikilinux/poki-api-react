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

const getPokemonsData = async () => {
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

  console.log('POKEMONES =>', pokemonsData)

  return pokemonsData
}

console.log('POKEOMS DATA', await getPokemonsData())

const pokemonTemplate = (pokemon) => {
  return {
    image: pokemon.sprites.other.home.front_default,
    name: pokemon.name.toUpperCase(),
    experience: pokemon.base_experience,
    types: pokemon.types,
    id: pokemon.id,
    height: pokemon.height / 10,
    weight: pokemon.weight / 10
  }
}

const CreateTypeSpan = (types) => {
  return types.map((tipo, index) => (
    <span key={index} className={`${tipo.type.name} poke__type`}>{tipo.type.name}</span>
  ))
}

// console.log('POKEMON', pokemonObject(fetchPokemons(appState.currentURL)));

// console.log('NEXXT URL', setNextURl(await fetchPokemons(appState.currentURL)))

// console.log(await fetchPokemons(appState.currentURL))

const pokeCard = ({ image, name, experience, types, id, height, weight }) => {
  return (
  <div className="poke">
    <img src={image} />
    <h2>{name}</h2>
    <span className="exp">EXP: {experience}</span>
    <div className="tipo-poke">
      <CreateTypeSpan types={types}/>
    </div>
    <p className="id-poke">#{id}</p>
    <p className="height">Height: {height}m</p>
    <p className="weight">Weight: {weight}Kg</p>
  </div>
  )
}

const PokeCardsSection = (pokemones) => (
  pokemones.map(pokemon => {
    return pokeCard(pokemonTemplate(pokemon))
  })
)

// console.log('CARDS', pokeCardsSection(await getPokemonsData()))

const Header = () => {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
      alt=""
      className="pokemon-logo"
    />
  )
}

const pokemonesData = await getPokemonsData()

export function App () {
  return (
    <section>
      <Header/>
      <div className="poke__container" id="caja">{
        pokemonesData.map((pokemon) => {
          console.log('APP', pokemon)
          const { image, name, experience, types, id, height, weight } = pokemonTemplate(pokemon)
          return (
            <div key={id} className="poke">
              <img src={image} />
              <h2>{name}</h2>
              <span className="exp">EXP: {experience}</span>
              <div className="tipo-poke">
                {
                  types.map((tipo, index) => {
                    return <span key={index} className={`${tipo.type.name} poke__type`}>{tipo.type.name}</span>
                  })
                }
              </div>
              <p className="id-poke">#{id}</p>
              <p className="height">Height: {height}m</p>
              <p className="weight">Weight: {weight}Kg</p>
            </div>
          )
        }
        )
      }
      </div>
    </section>

  )
}

// export default APP
