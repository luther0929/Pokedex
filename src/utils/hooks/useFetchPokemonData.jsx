import { useEffect, useState } from "react";

export default function useFetchPokemonData(pokemons, endpointBuilder, dataExtractor) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            try{
                if (!pokemons?.results?.length) {
                    setData([]); 
                    return;
                }
    
                const results = await Promise.all(
                    pokemons.results.map(async (pokemon) => {
                        const response = await fetch(endpointBuilder(pokemon));
                        if (!response.ok){
                            throw new Error(` Failed to fetch species: ${response.status}`)
                        }
                        const json = await response.json();
                        return dataExtractor(json);
                    })
                )
                setData(results);
            }
            catch(err){
                setError(err.message);
            } 
        }
        fetchData();
    }, [pokemons])

    return { data, error };
}