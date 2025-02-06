import tinycolor from 'tinycolor2';
import useFetchPokemonData from './utils/hooks/useFetchPokemonData.jsx';
import { capitalize } from './utils/utils.jsx';
import { useFadeInOut, useWiggle } from './utils/animations.jsx';
import { animated } from 'react-spring';
import loadingImage from './assets/pokeball.png';
import errorImage from './assets/error.png';
import {useState, useEffect} from 'react';

export default function Menu({pokemons}){

    const { data: sprites, error: spritesError } = useFetchPokemonData(
        pokemons,
        (pokemon) => (pokemon.url),
        (data) => (data.sprites.other['official-artwork'].front_default)
    )

    const { data: colors, error: colorsError } = useFetchPokemonData(
        pokemons,
        (pokemon) => (`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`),
        (data) => data.color.name
    )

    const { data: types, error: typesError } = useFetchPokemonData(
        pokemons,
        (pokemon) => (`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`),
        (data) => (data.types.map((type) => type.type.name))
    )

    const { data: Ids, error: idsError } = useFetchPokemonData(
        pokemons,
        (pokemon) => (`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`),
        (data) => (data.id)
    )

    const lightenColor = (colorName) => {
        if (colorName === "green" || colorName === "purple" ){
            return tinycolor(colorName).desaturate(50).lighten(50).toString(); 
        }
        if (colorName === "blue" || colorName === "red"){
            return tinycolor(colorName).desaturate(0).lighten(25).toString(); 
        }
        if (colorName === "yellow" || colorName === "brown"){
            return tinycolor(colorName).desaturate(15).lighten(20).toString(); 
        }
        if (colorName === "black" ){
            return tinycolor(colorName).desaturate(0).lighten(40).toString(); 
        }
        else return tinycolor(colorName).desaturate(20).lighten(10).toString(); 
    };

    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "A33EA1",
        ground: "E2BF65",
        flying: "A98FF3",
        psychic: "F95587",
        bug: "A6B91A",
        rock: "B6A136",
        ghost: "735797",
        dragon: "6F35FC",
        dark: "705746",
        steel: "B7B7CE",
        fairy: "D685AD",
    };
    
    const getTypeColor = (type) => {
        const color = typeColors[type.toLowerCase()] || "#A8A878";
        return tinycolor(color).toString(); 
    };
    
    const adjustId = (num) => {
        const str = num.toString();
        if (str.length === 1) return "#00" + num;
        else if (str.length === 2) return "#0" + num;
        else return "#" + str;
    }

    const fadeInOut = useFadeInOut(400);
    const wiggle = useWiggle();

    if (!pokemons || colors.length === 0 || sprites.length === 0 || types.length === 0 || Ids.length === 0){
        return(
            <div className="flex flex-col items-center justify-center w-screen h-screen text-gray-800 h-36 lg:w-1/3 lg:h-screen">
                <animated.img style={wiggle} className='w-12' src={loadingImage} alt='loading'/>
                <animated.p style={fadeInOut}>Loading list...</animated.p>
            </div>
        )
        
    }

    if (spritesError || colorsError || typesError || idsError){
        return(
            <div className='flex flex-col items-center justify-center w-full h-screen lg:w-64'>
                <img className='w-24 h-24 lg:w-40 lg:h-40' src={errorImage} alt='error'/>
                <p className='font-bold text-red-500 lg:text-2xl'>Error fetching data</p>
                <p className='lg:text-2xl'>The page crash!</p>
            </div>
        )
    }

    return(
        <div className="grid w-screen h-screen grid-cols-3 gap-4 p-4 text-gray-800 bg-yellow-50 lg:p-10 lg:gap-10 lg:grid-cols-4">
            {pokemons.results.map((pokemon, index) => {
                const capitalizedName = capitalize(pokemon.name)
                return(
                    <div className="flex flex-col px-2 py-1 rounded-lg lg:w-55 lg:p-4 border-1 drop-shadow-lg"key={pokemon.name} onClick={() => onPokemonClick(index+1)} style={{backgroundColor: lightenColor(colors[index])}}>
                        
                        <div className="bg-white border rounded-full drop-shadow-md">
                            <img src={sprites[index]} alt={pokemon.name}/>
                        </div>
                        <h1 className='text-center lg:text-3xl font-bold text-white [text-shadow:_1px_1px_1px_rgb(0_0_0)]'>{capitalizedName}</h1>

                        <div className='flex flex-row justify-center gap-1 m-1 lg:gap-4 lg:m-4'>
                            {types[index].map((type) => {
                                return <p className="p-1 text-xs text-center text-white rounded-lg lg:p-2 lg:text-2xl w-15 border-1 lg:w-24" key={type} style={{backgroundColor: getTypeColor(type)}}>{type}</p>
                            })}
                        </div>
                        <h1 className='text-center pr-1 text-lg font-bold text-white opacity-60 lg:text-3xl [text-shadow:_2px_2px_2px_rgb(0_0_0)]'>{adjustId(Ids[index])}</h1>
                    </div>
                )
            })}
        </div>
    )
}
