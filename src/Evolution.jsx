import { animated } from '@react-spring/web'
import { useFadeIn } from './utils/animations.jsx'
import { capitalize } from './utils/utils.jsx'

export default function Evolution({pokemon, onPokemonClick}){
    const fadeIn = useFadeIn();

    return(
        <animated.div style={fadeIn} className='flex flex-row items-end justify-around h-48 gap-4 px-8 pb-10 lg:px-26 lg:h-58'>
            {pokemon.evolutionChain.map((pokemon)=>(
                <div key={pokemon.name} onClick={() => onPokemonClick(pokemon.id)}>
                    <img style={{width: '8rem'}} src={pokemon.sprite}/>
                    <p className='text-center text-black'>{capitalize(pokemon.name)}</p>
                </div>
            ))}
        </animated.div>
    );
}