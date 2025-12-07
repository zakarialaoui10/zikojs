import { mapfun, apply_fun } from "../mapfun/index.js";
export const min = (...x) => Math.min(...x);
export const max = (...x) => Math.max(...x);

export const deg2rad = (...deg) => mapfun(x => x * Math.PI / 180, ...deg);
export const rad2deg = (...rad) => mapfun(x => x / Math.PI * 180, ...rad);

export const norm = (x, min, max) => apply_fun(
    x, 
    v => min !== max ? (v - min) / (max - min) : 0
);
export const lerp = (x, min, max) => apply_fun(
    x, 
    v => (max - min) * v + min
);
export const clamp = (x, min, max) => apply_fun(
    x, 
    v => Math.min(Math.max(v, min), max)
);
export const map = (x, a, b, c, d) => apply_fun(
    x, 
    v => lerp(norm(v, a, b), c, d)
);


// export const norm = (x, min, max) => {
//     if(x.isComplex?.()) return new x.constructor(
//         norm(x.a, min, max),
//         norm(x.b, min, max)
//     )
//     if(x.isMatrix?.()) return new x.constructor(
//         x.rows, 
//         x.cols, 
//         norm(x.arr.flat(1), min, max)
//     );
//     if(x instanceof Array) return mapfun(n => norm(n, min, max), ...x);
//     return min !== max ? (x - min) / (max - min) : 0;
// }


// export const lerp = (x, min, max) => {
//     if(x.isComplex?.()) return new x.constructor(
//         lerp(x.a, min, max),
//         lerp(x.b, min, max)
//     )
//     if(x.isMatrix?.()) return new x.constructor(
//         x.rows, 
//         x.cols, 
//         lerp(x.arr.flat(1), min, max)
//     );
//     if(x instanceof Array) return mapfun(n => lerp(n, min, max), ...x);
//     return (max - min) * x + min;
// }

// export const map = (x, a, b, c, d) => {
//     if(x.isComplex?.()) return new x.constructor(
//         map(x.a, a, b, c, d),
//         map(x.b, a, b, c, d)
//     )
//     if(x.isMatrix?.()) return new x.constructor(
//         x.rows, 
//         x.cols, 
//         map(x.arr.flat(1), a, b, c, d)
//     );
//     if(x instanceof Array) return mapfun(n => map(n, a, b, c, d), ...x);
//     return lerp(norm(x, a, b), c, d);
// }

// export const clamp = (x, min, max) => {
//     if(x.isComplex?.()) return new x.constructor(
//         clamp(x.a, min, max),
//         clamp(x.b, min, max)
//     )
//     if(x.isMatrix?.()) return new x.constructor(
//         x.rows, 
//         x.cols, 
//         clamp(x.arr.flat(1), min, max)
//     );
//     if(x instanceof Array) return mapfun(n => clamp(n, min, max), ...x);
//     return Math.min(Math.max(x, min), max)
// }

export const hypot = (...x) => {
  const c0 = x.find(a => a.isComplex?.());
  if (c0) {
    const W = x.map(n => n.isComplex?.() ? n : new c0.constructor(n, 0));
    return Math.hypot(...W.map(c => c.z));
  }
  return Math.hypot(...x);
};


export const atan2 = (y, x, rad = true) => {
    if (y instanceof Array && !(x instanceof Array))
        return mapfun(n => atan2(n, x, rad), ...y);

    if (x instanceof Array && !(y instanceof Array))
        return mapfun(n => atan2(y, n, rad), ...x);

    if (y instanceof Array && x instanceof Array)
        return y.map((v, i) => atan2(v, x[i], rad));

    const phi = Math.atan2(y, x);
    return rad ? phi : phi * 180 / Math.PI;
}


