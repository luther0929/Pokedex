import tinycolor from 'tinycolor2';

import { typeColors } from '../utils/colors.jsx';
import { capitalize } from '../utils/utils.jsx';

export default function Image({ pokemon }) {
  const getTypeColor = (type) => {
    const color = typeColors[type.toLowerCase()] || '#A8A878';
    return tinycolor(color).toString();
  };

  const adjustId = (num) => {
    const str = num.toString();
    if (str.length === 1) return '#00' + num;
    else if (str.length === 2) return '#0' + num;
    else return '#' + str;
  };

  const lightenColor = (color) => {
    return tinycolor(color).desaturate(15).lighten(10).toString();
  };

  return (
    <div
      className="flex flex-row p-2 h-60 lg:flex-row lg:h-80 rounded-t-xl"
      style={{ backgroundColor: lightenColor(getTypeColor(pokemon.types[0])) }}
    >
      <div className="flex flex-col justify-between w-1/2">
        <div>
          <h1 className="text-3xl font-bold text-left text-white lg:text-6xl ">
            {capitalize(pokemon.name)}
          </h1>
          <div className="flex flex-row gap-1.5 mx-1 my-4 lg:gap-4">
            {pokemon.types.map((type) => {
              return (
                <p
                  className="w-16 p-1 text-center text-white rounded-lg border-1"
                  key={type}
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type}
                </p>
              );
            })}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white lg:text-6xl opacity-60 ">
          {adjustId(pokemon.id)}
        </h1>
      </div>
      <img
        className="mx-auto w-50 lg:w-70"
        src={pokemon.sprite}
        alt={pokemon.name}
        loading="lazy"
      />
    </div>
  );
}
