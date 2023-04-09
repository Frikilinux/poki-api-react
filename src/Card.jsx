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

const CreateTypeSpan = ({ types }) => (
  types.map((tipo, index) => (
    <span key={index} className={`${tipo.type.name} poke__type`}>{tipo.type.name}</span>
  ))
)

export const PokeCards = ({ pokeData }) => (
  pokeData.map((pokemon) => {
    const { image, name, experience, types, id, height, weight } = pokemonTemplate(pokemon)
    return (
      <div key={id} id={id} className="poke">
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
  )
)
