import PokeBallsUrl from './assets/pokeball.png'

const Balls = () => <img src={PokeBallsUrl} alt="pokebola" className="pokeball" />

export const PokeBalls = () => (
  <div className="pokeballs-container">
    <Balls />
    <Balls />
    <Balls />
  </div>
)
