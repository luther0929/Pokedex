import {useState, useEffect} from 'react';
import Image from './Image.jsx';
import About from './About.jsx';
import Stats from './Stats.jsx';
import Evolution from './Evolution.jsx';
import PokemonList from './PokemonList.jsx';
import errorImage from './assets/error.png';
import { useLocation, Route, Routes, NavLink, Navigate  } from 'react-router-dom';
import loadingImage from './assets/pokeball.png';
import { useFadeIn, useFadeInOut, useWiggle } from './utils/animations.jsx';
import { animated } from 'react-spring'
import { FaArrowLeft } from 'react-icons/fa';

export default function Profile({pokemons}){

    const location = useLocation();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonId, setPokemmonId] = useState(location.state?.pokemonId || 1);
    const [pokemon, setPokemon] = useState(null);

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

    const handlePokemonClick = (id) => {
        setPokemmonId(id);
    }

    const fadeInOut = useFadeInOut();
    const wiggle = useWiggle();
    const fadeIn = useFadeIn();

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

    return (
            <animated.div style={fadeIn} className='h-screen px-2'>
            <div className='flex flex-col w-full h-full lg:flex-row'>
                <div className='flex flex-col mx-2 mt-2 bg-white border lg:m-4 lg:w-4/5 drop-shadow-lg rounded-xl'>
                <Image pokemon = {pokemon}/>
                <nav className='flex flex-row justify-around my-4'>
                    <NavLink 
                    to='/profile/about'
                    className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : "text-gray-400")
                    }>About</NavLink>
                    
                    <NavLink 
                    to='/profile/stats'
                    className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : ("text-gray-400")) 
                    }>Stats</NavLink>

                    <NavLink 
                    to='/profile/evolution'
                    className={({isActive}) => (isActive ? ("underline underline-offset-12 font-semibold") : ("text-gray-400")) 
                    }>Evolution</NavLink>
                </nav>

                <Routes>
                    <Route index element={<Navigate to="about" replace/>} />
                    <Route path='about' element={<About pokemon={pokemon}/>}/>
                    <Route path='stats' element={<Stats pokemon={pokemon}/>}/>
                    <Route path='evolution' element={<Evolution pokemon={pokemon} onPokemonClick={handlePokemonClick}/>}/>
                </Routes>
                </div>

                <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick}/>
            </div>
            </animated.div>
    )
}