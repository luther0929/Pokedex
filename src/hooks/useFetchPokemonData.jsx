import { useEffect,useState } from 'react';

export function useFetchPokemonData(limit = 151, maxRetries = 3) {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let retryCount = 0;

    setState({
      //resets the state values
      data: [],
      isLoading: true,
      error: null,
    });

    const attemptFetch = async () => {
      try {
        const pokemonsResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
          { signal }
        ); //attach signal to cancel fetching
        if (!pokemonsResponse.ok) {
          throw new Error(
            `Unable to fetch pokemon list ${pokemonsResponse.status}`
          );
        }
        const pokemonsData = await pokemonsResponse.json();

        if (!pokemonsData?.results?.length) {
          //safely checks if pokemons.result is null
          setState({
            data: [],
            isLoading: false,
            error: null,
          });
          return;
        }

        const pokemonData = await Promise.all(
          pokemonsData.results.map(async (pokemon) => {
            //fetches each pokemon's data
            const basicResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`,
              { signal }
            ); //attaches the abort controller
            if (!basicResponse.ok) {
              throw new Error(
                `Failed to fetch pokemon basic data: ${basicResponse.status}`
              );
            }
            const basicData = await basicResponse.json();

            const specieResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}/`,
              { signal }
            );
            if (!specieResponse.ok) {
              throw new Error(
                `Failed to fetch pokemon specie data: ${specieResponse.status}`
              );
            }
            const specieData = await specieResponse.json();

            const evolutionChainResponse = await fetch(
              specieData.evolution_chain.url,
              { signal }
            );
            const evolutionChainData = await evolutionChainResponse.json();

            const getEvolutionChainNames = (chain) => {
              //recursive function to get each pokemon name on the evolution chain
              const names = [chain.species.name];
              if (chain.evolves_to.length > 0) {
                chain.evolves_to.forEach((evolution) => {
                  names.push(...getEvolutionChainNames(evolution));
                });
              }
              return names;
            };

            const evolutionChainNames = getEvolutionChainNames(
              evolutionChainData.chain
            );

            const evolutionChain = await Promise.all(
              evolutionChainNames.map(async (name) => {
                //fetch pokemon object to create an array of pokemons on the evolution chain
                const response = await fetch(
                  `https://pokeapi.co/api/v2/pokemon/${name}/`,
                  { signal }
                );
                if (!response.ok) {
                  throw new Error(
                    `Failed to fetch Pokemon evolution chain data: ${response.status}`
                  );
                }
                const data = await response.json();

                return {
                  id: data.id,
                  name: data.name,
                  sprite: data.sprites.other['official-artwork'].front_default,
                };
              })
            );

            return {
              //return the only needed basic data
              id: basicData.id,
              name: basicData.name,
              height: basicData.height / 10, //convert to meters
              weight: basicData.weight / 10, //convert to kilograms
              abilities: basicData.abilities.map(
                (ability) => ability.ability.name
              ),
              sprite: basicData.sprites.other['official-artwork'].front_default,
              stats: basicData.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
              types: basicData.types.map((type) => type.type.name),
              color: specieData.color.name,
              evolutionChain: evolutionChain,
            };
          })
        );

        setState({
          data: pokemonData,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        //update error value if there is one
        if (error.name === 'AbortError') return; //abort error disregarded as an error since it is intentional

        if (retryCount < maxRetries) {
          //retry mechanism with exponential backoff
          retryCount++;
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); //exponential delays per retry
          setTimeout(attemptFetch, delay);
        } else {
          setState({
            data: [],
            isLoading: false,
            error: error.message || 'failed to fetch Pokemon basic data',
          });
        }
      }
    };
    attemptFetch();

    return () => abortController.abort(); //clean up function
  }, [limit, maxRetries]);

  return state;
}
