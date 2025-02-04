import { animated } from '@react-spring/web'
import { useFadeIn } from './utils/animations.jsx'
import { capitalize } from './utils/utils.jsx'
import { useFetchEvolutionChain } from './utils/hooks/useFetchEvolutionChain.jsx'
export default function Evolution({pokemon}){

    const { evolutionChain, isLoading, error } = useFetchEvolutionChain(pokemon);
    
    const fade = useFadeIn();

    if (isLoading || !pokemon){
        return <p>Loading data...</p>
    }

    if (error){
        return <p>Error: {error}</p>
    }

    return(
        <animated.div style={fade} className='flex flex-row justify-around h-48 gap-4 px-8 pt-5 lg:px-26 lg:h-50'>
            {evolutionChain.map((pokemon)=>(
                <div key={pokemon.name}>
                    <img style={{width: '8rem'}} src={pokemon.sprites.other['official-artwork'].front_default}/>
                    <p className='text-center text-black'>{capitalize(pokemon.name)}</p>
                </div>
            ))}
        </animated.div>
    );
}