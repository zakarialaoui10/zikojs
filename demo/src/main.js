import { FileBasedRouting } from "ziko";
FileBasedRouting(import.meta.glob('./pages/**/*.js'))

import { Complex, complex } from "ziko/math";

const a = new Complex(1, 1)
const aa = new Complex({ a: 10,})

console.log({a})

const b = complex()