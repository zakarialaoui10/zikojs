import { createSPAFileBasedRouter } from "ziko/router";
import { Matrix, complex, cos } from "ziko/math";

globalThis.pairs = await createSPAFileBasedRouter(
    import.meta.glob('./pages/**/*.js')
)

globalThis.m = new Matrix([[1,2], [3,4]])

console.log(cos(complex(1,1)))