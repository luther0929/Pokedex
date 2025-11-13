import './App.css';
import errorImage from './assets/error.png';
import loadingImage from './assets/pokeball.png';
import logo from './assets/logo.png';
import { useFadeInOut, useWiggle } from './utils/animations.jsx';
import { animated } from 'react-spring';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { useFetchPokemonData } from './utils/hooks/useFetchPokemonData.jsx';
import { lazy } from 'react';

const Menu = lazy(() => import('./Menu'));
const Profile = lazy(() => import('./Profile'));

export default function App() {
  const pokemonCount = 151;
  const {
    data: pokemons,
    isLoading,
    error,
  } = useFetchPokemonData(pokemonCount, 3);
  const fadeInOut = useFadeInOut();
  const wiggle = useWiggle();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <animated.img
          style={wiggle}
          className="w-12"
          src={loadingImage}
          alt="loading"
        />
        <animated.p style={fadeInOut}>Loading</animated.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen m-2 ">
        <img
          className="w-24 h-24 lg:w-40 lg:h-40"
          src={errorImage}
          alt="error"
        />
        <p className="font-bold text-red-500 lg:text-2xl">
          Error fetching data
        </p>
        <p>{error}</p>
        <p className="lg:text-2xl">The page crash!</p>
      </div>
    );
  }

  return (
    <Router>
      <nav className="fixed flex items-center w-screen h-16 bg-red-400 border-b z-1 ">
        <NavLink
          to="/menu"
          className="w-screen mx-4 text-3xl font-semibold text-yellow-200 lg:mx-10 align-center"
        >
          <img className="w-2/5 lg:w-42" src={logo} alt="Pokedex logo" />
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="/menu" element={<Menu pokemons={pokemons} />} />
        <Route path="/profile/*" element={<Profile pokemons={pokemons} />} />
      </Routes>
    </Router>
  );
}
