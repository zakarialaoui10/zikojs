import { tags } from 'ziko/ui'
import {useState, useDerived} from 'ziko/hooks'
export const Timer=()=>{
    const {floor} = Math
    const [timer, setTimer] = useState(0);
    const converToHMS = seconds => `${floor(seconds / 3600)} : ${floor((seconds % 3600) / 60)} : ${seconds % 60} `
    const time = useDerived(t => converToHMS(t) , [timer] )
    // const [time] = useDerived(t => converToHMS(t) , [timer] )
    let i = 1;
    setInterval(()=>{
        setTimer(i);
        i++
    }, 1000)
    return tags.p('Elapsed Time : ', time)
}

Timer().mount()
// import {tags} from 'ziko/ui'
// import {useState} from 'ziko/hooks'


// export const Counter=()=>{
//     const {div, span, button} = tags
//     const [counter, setCounter] = useState(0);
//     return div(
//         span(counter),
//         button('+').onClick(()=> setCounter(n => ++n)),
//         button('-').onClick(()=> setCounter(n => --n)),
//         button('reset').onClick(()=> setCounter(0))
//     )
// }

// Counter().mount()

// const [isVisible, toggleVisibility] = useState(true);
// globalThis.para = tags.p('Hello world', isVisible).style({
//     visibility : isVisible ? 'visible' : 'hidden'
// }).mount()
// globalThis.toggleVisibility = toggleVisibility
// tags.button('Toggle Visibility').onClick(()=> currentValue => toggleVisibility(!currentValue)).mount()


import { createSPAFileBasedRouter } from "ziko/router";
// import { Matrix, complex, Complex } from "ziko/math";

// import { pow, cos, sign, acos, asin, atan, acot, coth, acosh, ln, sqrt, atanh, sec } from '../../src/math/functions'

// import { mapfun } from "ziko/math/functions/mapfun";
// import { and, nand } from 'ziko/math/functions/logic'

globalThis.pairs = await createSPAFileBasedRouter(
    import.meta.glob('./pages/**/*.js')
)

// globalThis.m = new Matrix([[1,2], [3,4]])
// globalThis.c = complex(1,1)

// console.log(acos(complex(2, 3)))
// console.log(asin(complex(2, 3)))
// console.log(atan(complex(2, 3)))
// console.log(acot(complex(2, 3)))
// console.log(coth(complex(2, 3)))
// console.log(acosh(complex(2, 3)))
// console.log(atanh(complex(2, 3)))
// console.log(sec(complex(1, 2)))

// console.log(
//     pow(complex(2,1), complex(1,2))
// )
// const z = complex(2, 3)

// // const zz = ln(z.clone().add(sqrt(z.clone().mul(z.clone()).sub(1))))
// // console.log(zz)


// // const a = mapfun(adapted_cos, 1,2, complex(1,2), [1, 2, {a : 1}])

// // const c = adapted_cos(1); // number
// // const b = adapted_cos(complex(1, 2)); 

// const aa = cos(1)



// import {add} from 'ziko/math/functions/arithmetic'

// console.log(add(1,2,3, complex(1,2)))


// import { 
//     arange, 
//     linspace,
//     logspace,
//     geomspace
//  } from 'ziko/math/functions/signal'

// console.log(arange(1, 10, 1))
// console.log(arange(1, 10, 1, true))

// console.log(arange(10, 1, 1))
// console.log(arange(10, 1, 1, true))

// console.log(linspace(0, complex(1,1), 100, true))

// console.log(logspace(1, 10, 100, Math.E, true))
// console.log(geomspace(1, 10, 20, true))
// console.log(geomspace(1, 20, 20, true))

// console.log(geomspace(complex(0, 1), complex(1, 0), 20, true))

//     const z1 = complex(1, 2)
//     const z2 = complex(2, 1)
//     console.log(z1.mul(z2))

// console.log(cos(Math.PI/2))

// const PI = Math.PI
// const mm = new Matrix([[PI, PI/2], [PI*3/2, 2*PI]])

// console.log(mm.toComplex().det)


// console.log(and([1,1,1,1], [1,0,1]))

// globalThis.mm = mm


// console.log(
//     nand(
//         new Matrix(2,2, [1,1,1,1]),
//         new Matrix(2,2, [1,1,1,1]),
//         new Matrix(2,2, [1,0,0,1])
//     )
// )


// import { Matrix } from "ziko/math/matrix";
// import { complex } from "ziko/math/complex";
// globalThis.Matrix = Matrix
// globalThis.m = new Matrix([
//     [1, 2, complex(3,0)],
//     [4, 5, 6],
//     [7, 8, 9]
// ])

// globalThis.m2 = new Matrix([
//     [1, 2, 3],
//     [4, 5, 6],
// ])

// globalThis.a = m.serialize()
// globalThis.m3 = Matrix.deserialize(a)
// // console.log()

// globalThis.m4 = new Matrix([[m, m],[m, m]])

// import {add} from 'ziko/math'
// globalThis.add = add