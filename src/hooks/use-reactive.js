import {mapfun} from '../math'
import { useState } from './use-state.js'

const useReactive = (nested_value) => mapfun(n => n, nested_value)
export{
    useReactive
}