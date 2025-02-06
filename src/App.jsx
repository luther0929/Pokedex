import {useState, useEffect} from 'react';
import './App.css';
import Profile from './Profile';
import Menu from './Menu';
import errorImage from './assets/error.png'
import loadingImage from './assets/pokeball.png';
import { useFadeInOut, useWiggle } from './utils/animations.jsx';
import { animated } from 'react-spring';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, Outlet} from 'react-router-dom';
import About from './About.jsx';
import Stats from './Stats.jsx';
import Evolution from './Evolution.jsx';

export default function App() {

  const [pokemons, setPokemons] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pokemonCount = 151;

  useEffect(()=>{
    const fetchPokemons = async() =>{
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`);
        if(!response.ok){
          throw new Error('Unable to fetch pokemon list')
        }
        const data = await response.json();
        setPokemons(data);
        setIsLoading(false);
      }
      catch(error){
        setError(error.message);
        setIsLoading(false);
      }
    }
    fetchPokemons();
  }, [])

  const fadeInOut = useFadeInOut();
  const wiggle = useWiggle();

  useEffect(()=>{
    console.log(pokemons)
  }, [pokemons])

  if(isLoading){
      return(
          <div className='flex flex-col items-center justify-center h-screen gap-2'>
            <animated.img style={wiggle} className='w-12' src={loadingImage} alt='loading'/>
            <animated.p style={fadeInOut}>Loading</animated.p>
          </div>
      )
  }

  if(error){
      return(
          <div className='flex flex-col items-center justify-center w-full h-screen m-2 '>
              <img className='w-24 h-24 lg:w-40 lg:h-40' src={errorImage} alt='error'/>
              <p className='font-bold text-red-500 lg:text-2xl'>Error fetching data</p>
              <p className='lg:text-2xl'>The page crash!</p>
          </div>
      )
  }

  return(
    <Router>
      <nav>
        <NavLink 
          to='/menu'
          className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : "text-gray-400")
        }>Menu</NavLink>

        <NavLink
        to='/profile'
        className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : "text-gray-400")
        }>Profile</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path='/menu' element={<Menu pokemons={pokemons}/>}/>
        <Route path='/profile/*' element={<Profile pokemons={pokemons}/>}/>
      </Routes>
    </Router>
  )
}
