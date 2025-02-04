import { useSpring } from '@react-spring/web'

export const useFadeIn = () => {
    return(useSpring({
        from: {opacity:0},
        to: {opacity:1}
    }))
}