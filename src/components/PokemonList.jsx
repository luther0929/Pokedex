import tinycolor from 'tinycolor2';
import { capitalize } from '../utils/utils.jsx';
import { memo } from 'react';

function PokemonList({ pokemons, onPokemonClick }) {
  const lightenColor = (colorName) => {
    if (colorName === 'green' || colorName === 'purple') {
      return tinycolor(colorName).desaturate(50).lighten(50).toString();
    }
    if (colorName === 'blue' || colorName === 'red') {
      return tinycolor(colorName).desaturate(0).lighten(25).toString();
    }
    if (colorName === 'yellow' || colorName === 'brown') {
      return tinycolor(colorName).desaturate(15).lighten(20).toString();
    }
    if (colorName === 'black') {
      return tinycolor(colorName).desaturate(0).lighten(40).toString();
    } else return tinycolor(colorName).desaturate(20).lighten(10).toString();
  };

  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: 'A33EA1',
    ground: 'E2BF65',
    flying: 'A98FF3',
    psychic: 'F95587',
    bug: 'A6B91A',
    rock: 'B6A136',
    ghost: '735797',
    dragon: '6F35FC',
    dark: '705746',
    steel: 'B7B7CE',
    fairy: 'D685AD',
  };

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

  return (
    <div className="flex flex-row w-screen pt-2 overflow-y-scroll text-gray-800 h-30 lg:w-1/3 lg:h-screen lg:flex-col ">
      {pokemons.map((pokemon) => {
        const capitalizedName = capitalize(pokemon.name);
        return (
          <div
            className="flex justify-between m-2 rounded-lg border-1 drop-shadow-xl"
            key={pokemon.name}
            onClick={() => onPokemonClick(pokemon.id)}
            style={{ backgroundColor: lightenColor(pokemon.color) }}
          >
            <div className="w-30 lg:w-1/3">
              <div className="justify-between m-2 lg:flex-row">
                <h1 className="text-xl font-bold text-white opacity-60 lg:text-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0)]">
                  {adjustId(pokemon.id)}
                </h1>
                <h1 className="text-lg mr-6 lg:text-2xl font-bold text-white [text-shadow:_1px_1px_1px_rgb(0_0_0)]">
                  {capitalizedName}
                </h1>
              </div>

              <div className="flex flex-row w-32 gap-2 m-4">
                {pokemon.types.map((type) => {
                  return (
                    <p
                      className="hidden p-1 text-center text-white rounded-lg w-15 lg:block border-1"
                      key={type}
                      style={{ backgroundColor: getTypeColor(type) }}
                    >
                      {type}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="w-20 bg-white border-l rounded-r-lg rounded-l-3xl lg:w-1/3 drop-shadow-md">
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(PokemonList);
