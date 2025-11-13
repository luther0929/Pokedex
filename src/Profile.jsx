import { useState, useEffect, useCallback } from 'react';
import Image from './Image.jsx';
import About from './About.jsx';
import Stats from './Stats.jsx';
import Evolution from './Evolution.jsx';
import PokemonList from './PokemonList.jsx';
import {
  useLocation,
  Route,
  Routes,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { useFadeIn } from './utils/animations.jsx';
import { animated } from 'react-spring';

export default function Profile({ pokemons }) {
  const location = useLocation();
  const [pokemonId, setPokemmonId] = useState(location.state?.pokemonId || 1);
  const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);

  const fadeIn = useFadeIn();

  const handlePokemonClick = useCallback((id) => {
    setPokemmonId(id);
  }, []);

  // const handlePokemonClick = (id) => {
  //   setPokemmonId(id);
  // };

  return (
    <div className="h-screen px-2 pt-16 lg:h-1/2">
      <div className="flex flex-col w-full h- lg:h-180 lg:flex-row">
        <animated.div
          style={fadeIn}
          className="flex flex-col mx-2 mt-2 bg-white border lg:m-4 lg:w-4/5 drop-shadow-lg rounded-xl"
        >
          <Image pokemon={pokemon} />
          <nav className="flex flex-row justify-around my-4">
            <NavLink
              to="/profile/about"
              className={({ isActive }) =>
                isActive
                  ? 'underline underline-offset-12 font-semibold'
                  : 'text-gray-400'
              }
            >
              About
            </NavLink>

            <NavLink
              to="/profile/stats"
              className={({ isActive }) =>
                isActive
                  ? 'underline underline-offset-12 font-semibold'
                  : 'text-gray-400'
              }
            >
              Stats
            </NavLink>

            <NavLink
              to="/profile/evolution"
              className={({ isActive }) =>
                isActive
                  ? 'underline underline-offset-12 font-semibold'
                  : 'text-gray-400'
              }
            >
              Evolution
            </NavLink>
          </nav>

          <Routes>
            <Route index element={<Navigate to="about" replace />} />
            <Route path="about" element={<About pokemon={pokemon} />} />
            <Route path="stats" element={<Stats pokemon={pokemon} />} />
            <Route
              path="evolution"
              element={
                <Evolution
                  pokemon={pokemon}
                  pokemons={pokemons}
                  onPokemonClick={handlePokemonClick}
                />
              }
            />
          </Routes>
        </animated.div>

        <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick} />
      </div>
    </div>
  );
}
