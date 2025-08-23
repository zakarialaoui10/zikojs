import {mapfun} from '../math'
import { useState } from './use-state.js'

const useReactive = (nested_value) => mapfun(
    n => {
        const state = useState(n)
        console.log(state)
        return {
            value : state[0],
            set : state[1],
        }
    }, 
    nested_value
)
export{
    useReactive
}