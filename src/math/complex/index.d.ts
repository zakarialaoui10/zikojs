export declare class Complex {
    a: number;
    b: number;

    constructor(a?: number, b?: number);
    constructor(c: Complex);
    constructor(a: 
        { a: number; b: number } | 
        { a: number; z: number } | 
        { a: number; phi: number } | 
        { b: number; z: number } | 
        { b: number; phi: number } | 
        { z: number; phi: number }
    );
    constructor();

    isComplex(): true;
    toString(): string;
    readonly __mapfun__ : boolean
    readonly clone: Complex;
    readonly z: number;
    readonly phi: number;
    readonly conj: Complex;
    readonly inv: Complex;
    readonly sqrt: Complex;
    readonly cbrt: Complex;
    readonly log: Complex;
    readonly cos: Complex;
    readonly sin: Complex;
    readonly tan: Complex;
    expo: [number, number];

    add(...z: (number | Complex)[]): this;
    sub(...z: (number | Complex)[]): this;
    mul(...z: (number | Complex)[]): this;
    div(...z: (number | Complex)[]): this;
    pow(n: number): this;
    nthr(n?: number): Complex;

    static zero(): Complex;
    static twiddle(K : number, N : number): Complex;
    static fromPolar(z: number, phi: number): Complex;
    
    static add(c: Complex, ...z: (number | Complex)[]): Complex;
    static sub(c: Complex, ...z: (number | Complex)[]): Complex;
    static mul(c: Complex, ...z: (number | Complex)[]): Complex;
    static div(c: Complex, ...z: (number | Complex)[]): Complex;
    static pow(c: Complex, n: number): Complex;
}

export declare function complex(a: number, b?: number): Complex;
export declare function complex(a: Complex): Complex;
export declare function complex(a: object): Complex;
export declare function complex(): Complex;