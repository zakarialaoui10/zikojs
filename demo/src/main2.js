// import { Flex, useTimeLoop, UIElement, tags} from 'ziko'
// // import { tags } from 'ziko/dom'
// import { useState, useDerived } from 'ziko/hooks'
// // import { composeInstance } from '../../src/__helpers__/composition-dep'
// import { register } from '../../src/__helpers__/register'
// import { IndexingMethods } from '../../src/ui/__methods__'

// class Over extends UIElement{
//     constructor(...args){
//         super(...args)
//     }
//     // at(){
//     //     return 1
//     // }
// }

// globalThis.a = new Over('div').append(tags.span({},'Over ...'))
// register(a, IndexingMethods)
// let t0 = 10, step = 400, start = 0, end = step * 11
// const [timer, setTimer] = useState('Start')
// globalThis.tt = tags.h2({ },timer).setAttr({id : timer})

// const [bg, setBg] = useState('cyan')


// globalThis.hh =tags.h1({}, "Hello world").style({
//     color : 'red',
//     background : bg
// })

// globalThis.setBg = setBg

// useTimeLoop(e => setTimer(t0 - e.i), step, start, end)

// let [msg] = useDerived(
//     n => (typeof n === 'number' && n<10) ? `0${n}` : n,
//     [timer])

// Flex(msg).style({
//     width : '200px',
//     height : '200px',
//     borderRadius : '50%',
//     border : '4px solid green',
//     fontSize : '3em',
//     color  : 'green',
//     margin : 'auto'
// }).vertical(0,0)


// // import { Scheduler } from 'ziko/time/scheduler/index.js'

// // const s2 = Scheduler([
// //   [
// //     { fn: () => console.log("Parallel A (1s)"), delay: 1000 },
// //     { fn: () => console.log("Parallel B (2s)"), delay: 2000 }
// //   ],
// //   { fn: () => console.log("After parallel"), delay: 500 }
// // ]);

// // s2.run();
import { InBounce } from "../../src/time/ease";
import { animation } from "../../src/time/animation";

animation(({t, tx, ty})=>console.log({t, tx, ty}), InBounce)