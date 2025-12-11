import { createSPAFileBasedRouter } from "ziko/router";
import { Matrix, complex, Complex } from "ziko/math";

import { pow, cos, sign, acos, asin, atan, acot, coth, acosh, ln, sqrt, atanh, sec } from '../../src/math/functions/nested'

import { mapfun } from "ziko/math/functions/mapfun";
import { adapted_cos } from "ziko/math/adapted";

globalThis.pairs = await createSPAFileBasedRouter(
    import.meta.glob('./pages/**/*.js')
)

globalThis.m = new Matrix([[1,2], [3,4]])
globalThis.c = complex(1,1)

console.log(acos(complex(2, 3)))
console.log(asin(complex(2, 3)))
console.log(atan(complex(2, 3)))
console.log(acot(complex(2, 3)))
console.log(coth(complex(2, 3)))
console.log(acosh(complex(2, 3)))
console.log(atanh(complex(2, 3)))
console.log(sec(complex(1, 2)))

console.log(
    pow(complex(2,1), complex(1,2))
)
const z = complex(2, 3)

// const zz = ln(z.clone().add(sqrt(z.clone().mul(z.clone()).sub(1))))
// console.log(zz)


const a = mapfun(adapted_cos, 1,2, complex(1,2), [1, 2, {a : 1}])

const c = adapted_cos(1); // number
const b = adapted_cos(complex(1, 2)); 

const aa = cos(1)



import {add} from 'ziko/math/functions/arithmetic'

console.log(add(1,2,3, complex(1,2)))


import { 
    arange, 
    linspace,
    logspace,
    geomspace
 } from 'ziko/math/functions/signal'

console.log(arange(1, 10, 1))
console.log(arange(1, 10, 1, true))

console.log(arange(10, 1, 1))
console.log(arange(10, 1, 1, true))

console.log(linspace(0, complex(1,1), 100, true))

console.log(logspace(1, 10, 100, Math.E, true))
console.log(geomspace(1, 10, 20, true))
console.log(geomspace(1, 20, 20, true))

console.log(geomspace(complex(0, 1), complex(1, 0), 20, true))

    const z1 = complex(1, 2)
    const z2 = complex(2, 1)
    console.log(z1.mul(z2))

console.log(cos(Math.PI/2))

const PI = Math.PI
const mm = new Matrix([[PI, PI/2], [PI*3/2, 2*PI]])

console.log(mm.toComplex().det)