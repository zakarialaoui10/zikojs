import { createSPAFileBasedRouter } from "ziko/router";
import { Matrix, complex } from "ziko/math";

import { cos, sign, acos, asin, atan } from 'ziko/math/functions/primitives'

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


const a = mapfun(adapted_cos, 1,2, complex(1,2), [1, 2, {a : 1}])

const c = adapted_cos(1); // number
const b = adapted_cos(complex(1, 2)); 

const aa = cos(1)