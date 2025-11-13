import { animated } from '@react-spring/web';
import { useFadeIn } from '../utils/animations.jsx';
import { capitalize } from '../utils/utils.jsx';

export default function About({ pokemon }) {
  const fade = useFadeIn();

  return (
    <animated.div
      style={fade}
      className="h-40 pl-3 m-4 text-base text-left text-gray-800 lg:h-50 "
    >
      <div className="grid grid-cols-5 gap-y-2">
        <p className="col-span-1 text-gray-400 ">Type</p>
        <p className="col-span-4 ">
          {pokemon.types.map((type) => capitalize(type)).join(', ')}
        </p>

        <p className="col-span-1 text-gray-400">Height</p>
        <p className="col-span-4">{pokemon.height} m</p>

        <p className="col-span-1 text-gray-400">Weight</p>
        <p className="col-span-4">{pokemon.weight} kg</p>

        <p className="col-span-1 text-gray-400">Abilities</p>
        <p className="col-span-4">
          {pokemon.abilities.map((ability) => capitalize(ability)).join(', ')}
        </p>
      </div>
    </animated.div>
  );
}
