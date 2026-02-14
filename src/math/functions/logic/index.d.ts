import type { Complex } from "../../complex/index.d.ts";
// import type { Matrix } from "../../matrix/index.d.ts";
import { Matrix } from '../../../../src/math/matrix/index.js'

export declare const not: (x: 0 | 1 | Complex | Matrix) => 0 | 1 | Complex | Matrix;
export declare const and: (...x: (0 | 1 | Complex | Matrix)[]) => 0 | 1 | Complex | Matrix;
export declare const or: (...x: (0 | 1 | Complex | Matrix)[]) => 0 | 1 | Complex | Matrix;
export declare const xor: (...x: (0 | 1 | Complex | Matrix)[]) => 0 | 1 | Complex | Matrix;
export declare const nand: (...x: (0 | 1 | Complex | Matrix)[]) => 0 | 1 | Complex | Matrix;
export declare const nor: (...x: (0 | 1 | Complex | Matrix)[]) => 0 | 1 | Complex | Matrix;
export declare const xnor: (...x: (0 | 1 | Complex | Matrix)[]) => 0 | 1 | Complex | Matrix;
