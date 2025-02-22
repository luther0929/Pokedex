import tinycolor from 'tinycolor2';
import { useState, useEffect } from 'react';
import { capitalize } from './utils/utils.jsx';
import { animated, useTransition } from 'react-spring';
import { useNavigate } from 'react-router-dom';

export default function Menu({pokemons}){

    const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //   console.log(filteredPokemons);
    // })
    
    useEffect(() => {
        if (!searchTerm.trim()){
            setFilteredPokemons(pokemons);
            return;
        } else {
            const result = pokemons.filter((pokemon) => 
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPokemons(result);
        }
    }, [searchTerm, pokemons]);

    const transitions = useTransition(filteredPokemons, {
        from: { opacity: 0, transform: 'scale(0.9)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { 
            opacity: 0, 
            transform: 'scale(0.9)', 
            position: 'absolute', 
            zIndex: -1, 
            pointerEvents: 'none',
            width: 0,
            height: 0,
            overflow: 'hidden'
        },
        keys: pokemon => pokemon.id,
        trail: 0,
        config: { 
            tension: 300, 
            friction: 20,
            // Make the enter animation faster
            duration: 200 
        }
    });

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

    const navigate = useNavigate();

    const handlePokemonClick = (pokemonId) => {
        navigate(`/profile/about`, { state: { pokemonId } })
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return(
        <>
        <div className='fixed right-0 w-2/5 m-2 bg-white border rounded-md z-2 top-4 lg:w-1/5 lg:mr-8'>
            <input
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={handleSearchChange}
                onInput={handleSearchChange}
                className='w-full pl-2 '
            />
        </div>

        <div className="relative grid w-full h-full grid-cols-3 gap-4 pt-20 mx-auto text-gray-800 lg:pt-26 max-w-9/10 lg:gap-15 justify-self-center lg:grid-cols-4">
            {transitions((style, pokemon) => {
                const capitalizedName = capitalize(pokemon.name);
                return (
                    <animated.div
                        style={{...style, backgroundColor: lightenColor(pokemon.color)}}
                        className="flex flex-col px-2 py-1 rounded-lg cursor-pointer lg:w-55 lg:p-4 border-1 drop-shadow-lg"
                        key={pokemon.name} 
                        onClick={() => handlePokemonClick(pokemon.id)}
                    >
                        <div className="bg-white border rounded-full drop-shadow-md">
                            <img 
                                src={pokemon.sprite}
                                alt={pokemon.name}
                                loading="lazy"
                            />
                        </div>
                        <h1 className='text-center lg:text-3xl font-bold text-white [text-shadow:_1px_1px_1px_rgb(0_0_0)]'>{capitalizedName}</h1>

                        <div className='flex flex-row justify-center gap-1 mt-1 lg:gap-4 lg:mt-4'>
                            {pokemon.types.map((type) => {
                                return <p
                                        className="p-1 text-xs text-center text-white rounded-lg w-14 lg:px-2 lg:text-2xl border-1 lg:w-24"
                                        key={type}
                                        style={{backgroundColor: getTypeColor(type)}}
                                        >
                                            {type}
                                        </p>
                            })}
                        </div>
                        <h1 className='text-center lg:pt-2 pr-1 text-lg font-bold text-white opacity-60 lg:text-3xl [text-shadow:_2px_2px_2px_rgb(0_0_0)]'>{adjustId(pokemon.id)}</h1>
                    </animated.div>
                )
            })}
        </div>
        </>
    )
}
