import { animated } from '@react-spring/web'
import { useFadeIn } from './utils/animations.jsx'
import { capitalize } from './utils/utils.jsx'

export default function Stats({pokemon}){

    function getStatBarWidth(num) {
        return num > 100 ? "100%" : `${num}%`
    }

    function getShortenedName(word) {
        if (word === "special-attack"){
            return "Sp. Atk";
        }

        else if (word === "special-defense"){
            return "Sp. Def";
        }
        else return capitalize(word);
    }

    const fade = useFadeIn();

    return(
        <animated.div style={fade} className="grid h-40 pl-3 m-4 text-base text-left text-gray-800 lg:h-50">
            {pokemon.stats.map((stat)=> {
                const barWidth = getStatBarWidth(stat.value)
                const changedName = getShortenedName(stat.name)
                return (
                    <div className='grid items-center grid-cols-10' key={stat.name}>
                        <p className='col-span-2 text-gray-400 lg:col-span-1'>{changedName}</p>
                        <p className="col-span-2 text-center">{stat.value}</p>

                        <div className="h-2 col-span-4 bg-gray-300 rounded-full lg:w-4/5">
                        <div className="h-2 bg-green-300 rounded-full" style={{width: barWidth}}></div>
                        </div>
                    </div>    
                )
            })}
        </animated.div>
    );
}