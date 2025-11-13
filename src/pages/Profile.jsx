import { useCallback, useState } from 'react';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { animated } from 'react-spring';

import About from '../components/About.jsx';
import Evolution from '../components/Evolution.jsx';
import Image from '../components/Image.jsx';
import PokemonList from '../components/PokemonList.jsx';
import Stats from '../components/Stats.jsx';
import { useFadeIn } from '../utils/animations.jsx';

export default function Profile({ pokemons }) {
  const location = useLocation();
  const [pokemonId, setPokemmonId] = useState(location.state?.pokemonId || 1);
  const pokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);

  const fadeIn = useFadeIn();

  const handlePokemonClick = useCallback((id) => {
    setPokemmonId(id);
  }, []);

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
