import { Complex } from "../../../src/math/index.js";
import { Matrix } from "../../../src/math/matrix/index.js";

/**
 * Objects that behave like primitives for mapfun,
 * meaning fun(x) is applied directly without recursion.
 */
export interface MapfunPrimitiveLike {
    __mapfun__?: boolean;
}

export type PrimitiveLike =
    | number
    | boolean
    | string
    | bigint
    | undefined
    | null
    | { readonly __mapfun__: boolean };

export type Mappable =
    | number
    | string
    | boolean
    | bigint
    | undefined
    | null
    | Matrix
    | MapfunPrimitiveLike
    | any[]
    | Set<any>
    | Map<any, any>
    | object;

/**
 * mapfun transform rules
 */
export type MapfunResult<F extends (x: any) => any, T> =
    // Objects with __mapfun__ → treat as primitive (call fun(x))
    // T extends MapfunPrimitiveLike
    //     ? ReturnType<F> :

    // Matrix → always return Matrix (your JS logic rebuilds a new Matrix)
    
    T extends PrimitiveLike 
        ? ReturnType<F> :
    // T extends Complex
    //     ? T :
    T extends Matrix
        ? T :

    // Array → deep-map
    T extends Array<infer U>
        ? Array<MapfunResult<F, U>> :

    // Set → deep-map
    T extends Set<infer U>
        ? Set<MapfunResult<F, U>> :

    // Map → deep-map values
    T extends Map<infer K, infer V>
        ? Map<K, MapfunResult<F, V>> :

    // Other objects → recursively map fields
    T extends object
        ? { [K in keyof T]: MapfunResult<F, T[K]> } :

    // Primitive
    ReturnType<F>;

/**
 * If only one argument → return mapped value
 * If multiple → return tuple of mapped values
 */
type UnwrapSingle<T extends unknown[]> =
    T extends [infer U] ? U : { [K in keyof T]: T[K] };

/**
 * mapfun main declaration
 */
export declare function mapfun<
    F extends (x: any) => any,
    A extends Mappable[]
>(
    fun: F,
    ...values: A
): UnwrapSingle<{ [K in keyof A]: MapfunResult<F, A[K]> }>;
