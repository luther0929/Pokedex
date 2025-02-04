import {useState, useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate  } from 'react-router-dom';
import Image from './Image.jsx';
import About from './About.jsx';
import Stats from './Stats.jsx';
import Evolution from './Evolution.jsx';
import PokemonList from './PokemonList.jsx';

export default function App() {

  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonId, setPokemmonId] = useState(1);
  const [pokemons, setPokemons] = useState(null);

  useEffect(()=>{
    const fetchPokemon = async() => {
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
        if (!response.ok){
          throw new Error('Unable to load pokemon data');
        }
        const data = await response.json();
        setPokemon(data);
        setIsLoading(false);
      }
      catch(error){
        setError(error);
        setIsLoading(false);
      }
    }
    fetchPokemon();
  }, [pokemonId]) 

  useEffect(()=>{
    const fetchPokemons = async() =>{
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
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

  const handlePokemonClick = (id) => {
    setPokemmonId(id);
  }

  useEffect(()=>{
    console.log(pokemon);
  }, [pokemon]);

  if(isLoading){
    return(
      <div className='flex items-center justify-center h-screen'>
        <p>Loading...</p>
      </div>
    )
  }

  if(error){
    return(
      <p>Error: {error.message}</p>
    )
  }

  return (
    <Router>
      <div className='lg:px-2 bg-yellow-50'>
        <div className='flex flex-col w-full h-full lg:flex-row'>
          <div className='flex flex-col m-4 bg-white border lg:m-4 lg:w-3/5 drop-shadow-lg rounded-xl'>
            <Image pokemon = {pokemon}/>
            <nav className='flex flex-row justify-around my-4'>
              <NavLink 
                to='/about'
                className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : "text-gray-400")
              }>About</NavLink>
              
              <NavLink 
                to='/stats'
                className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : ("text-gray-400")) 
              }>Stats</NavLink>

              <NavLink 
                to='/evolution'
                className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : ("text-gray-400")) 
              }>Evolution</NavLink>
            </nav>

            <Routes>
              <Route path="/" element={<Navigate to="/about" />} />
              <Route path='/about' element={<About pokemon={pokemon}/>}/>
              <Route path='/stats' element={<Stats pokemon={pokemon}/>}/>
              <Route path='/evolution' element={<Evolution pokemon={pokemon}/>}/>
            </Routes>
          </div>

            <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick}/>
        </div>
      </div>
    </Router>
    
  );
}
