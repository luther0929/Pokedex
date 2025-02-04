import { useState, useEffect } from 'react';

export const useFetchEvolutionChain = (pokemon) => {
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchData = async() => {
            try{
                setIsLoading(true);
                const speciesResp = await fetch(pokemon.species.url); //fetch species
                if (!speciesResp.ok){
                    throw new Error(`Failed to fetch species: ${speciesResp.status}`)
                }
                const speciesData = await speciesResp.json();

                const chainResp = await fetch(speciesData.evolution_chain.url); //fetch evolution chain
                if (!chainResp.ok){
                    throw new Error(`Failed to fetch chain: ${chainResp.status}`)
                }
                const chainData = await chainResp.json();
                const chain = chainData.chain

                const extractEvolutionChainUrls = (chain) => { //fetch each pokemon species URLs in that evolution chain
                    const evolutionPokemonUrls = [chain.species.url];
                    if (chain.evolves_to.length > 0){
                        chain.evolves_to.forEach((evolution)=>{
                            evolutionPokemonUrls.push(...extractEvolutionChainUrls(evolution));
                        })
                    }
                    return evolutionPokemonUrls
                }
                const pokemonChainUrls = extractEvolutionChainUrls(chain);

                const pokemoPromises = pokemonChainUrls.map(async(url) => { //fetch pokemon data from the species
                    const speciesResp = await fetch(url);
                    if (!speciesResp.ok){
                        throw new Error(`Failed to fetch species: ${speciesResp.status}`)
                    }
                    const speciesData = await speciesResp.json();

                    const pokemonResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`);
                    if (!pokemonResp.ok){
                        throw new Error(`Failed to fetch pokemons: ${pokemonResp.status}`)
                    }
                    const pokemonData = await pokemonResp.json();
                    return pokemonData;
                })
                const pokemons = await Promise.all(pokemoPromises) //await promises to resolve.
                setEvolutionChain(pokemons);
                setIsLoading(false);
            }
            catch(error){
                setError(error.message)
                setIsLoading(false);
            }
        }
        fetchData();

    }, [pokemon])

    return{ evolutionChain, isLoading, error }
}