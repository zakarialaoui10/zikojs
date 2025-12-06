import { createSPAFileBasedRouter } from "ziko/router";
import { Matrix, complex, Complex } from "ziko/math";

import { pow, cos, sign, acos, asin, atan, acot, coth, acosh, ln, sqrt, atanh, sec } from '../../src/math/functions/nested'

import { mapfun } from "ziko/math/mapfun";
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
