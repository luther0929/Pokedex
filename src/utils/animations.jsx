import { useSpring } from '@react-spring/web'

export const useFadeIn = () => {
    return(
        useSpring({
        from: { opacity:0 },
        to: { opacity:1 },
        })
    )
    
}

export const useWiggle = (leftAngle = 40, rightAngle = 40, duration = 300) => {
    return(
        useSpring({
            loop: { reverse: true },
            from: { transform: `rotate(${-leftAngle}deg` },
            to: { transform: `rotate(${rightAngle}deg)` },
            config: { duration: duration }
        })
    )
}

export const useFadeInOut = (duration = 300) => {
    return(
        useSpring({
            loop: { reverse: true },
            from: { opacity: 0 },
            to: { opacity: 1 },
            config: { duration: duration }
        })
    )
} 