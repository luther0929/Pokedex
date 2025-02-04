import { useState, useEffect } from "react";
import tinycolor from 'tinycolor2';
import { capitalize } from './utils/utils.jsx';

export default function Image({pokemon}){
  const [types, setTypes] = useState([]);
  
  useEffect(() =>{
    const fetchType = async() => {
      const type = pokemon.types.map((types) => {
        return types.type.name;
      })
      setTypes(type);
    }
    fetchType();
  }, [pokemon.types, setTypes])

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

      const lightenColor = (color) => {
        return tinycolor(color).desaturate(15).lighten(10).toString(); 
      }
 
  return(
  <>
    {types.length === 0 || !pokemon ? (
      <p>loading image...</p>
      ) : (
        <div className= "flex flex-row p-6 h-60 lg:flex-row lg:h-80 rounded-t-xl" style={{backgroundColor: lightenColor(getTypeColor(types[0]))}} >
          <div className="flex flex-col justify-between">
            <div >
              <h1 className="text-3xl font-bold text-left text-white lg:text-6xl " >{capitalize(pokemon.name)}</h1>
              <div className='flex flex-row gap-4 mx-1 my-4 drop-shadow-lg'>
                  {types.map((type) => {
                      return <p className="w-16 p-1 text-center text-white rounded-lg border-1" key={type} style={{backgroundColor: getTypeColor(type)}}>{type}</p>
                  })}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white lg:text-6xl opacity-60 ">{adjustId(pokemon.id)}</h1>
          </div>
          <img className="mx-auto w-50 lg:w-64 " src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name}/>
        </div>
      ) 
    }
  </>)
  }