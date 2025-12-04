import { createSPAFileBasedRouter } from "ziko/router";
import { Matrix } from "ziko/math/matrix";

globalThis.pairs = await createSPAFileBasedRouter(
    import.meta.glob('./pages/**/*.js')
)

globalThis.m = new Matrix([[1,2], [3,4]])