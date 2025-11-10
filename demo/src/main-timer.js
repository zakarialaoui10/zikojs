// // To Fix Id in initial state 

// import {Flex, useState, useDerived, tick} from 'ziko'

// let count = 11
// const [timer, setTimer] = useState('Start')
// tick((e)=>setTimer(count - e.frame), 1000, count);
// let msg = useDerived(
//     n => (typeof n === 'number' && n<10) ? `0${n}` : n,
// [timer])

// Flex(msg).style({
//     width : '200px',
//     height : '200px',
//     borderRadius : '50%',
//     border : '4px solid darkblue',
//     fontSize : '3em',
//     color  : 'darkblue',
//     textShadow: '0 0 5px darkviolet',
//     boxShadow: '0 0 5px darkviolet',
//     margin : 'auto'
// }).vertical(0,0)

import { tags, Flex, HTMLWrapper, SVGWrapper } from 'ziko'
import { useReactive } from 'ziko/hooks'
const { section, p, button } = tags

const {count, name} = useReactive({ count: 0, name: 'Zikllo' })


globalThis.s = section(
    p({id : 'p1', class : 'para'},'Count: ', count.get),
    p({id : 'p2', class : 'para'},'Name: ', name.get),
    button('Increment').onClick(() => count.set(n=> n+1)).useClient(),
    button('Reset Count').onClick(() => count.set(0)),
    button('Change Name').onClick(() => name.set('Zikojs'))
).style({color : "green"})

globalThis.f = Flex(
    HTMLWrapper('<div>kdkkd</div>'),
    SVGWrapper(`
        <svg width="100" height="100" >
            <circle cx="50" cy="50" r="40"
        stroke="green" stroke-width="4" fill="yellow" />
        Sorry, your browser does not support inline SVG.
        </svg>
    `)
)
// globalThis.state = useReactive({ count: 0, name: 'Ziko', nested : { a : 1, b: 2} })


