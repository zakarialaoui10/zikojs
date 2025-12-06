export const norm = (x, min, max) => {
    if(x.isComplex?.()) return new x.constructor(
        norm(x.a, min, max),
        norm(x.b, min, max)
    )
    if(x.isMatrix?.()) return new x.constructor(
        x.rows, 
        x.cols, 
        norm(x.arr.flat(1), min, max)
    );
    return min !== max ? (value - min) / (max - min) : 0;
}

export const lerp = (x, min, max) => {
    if(x.isComplex?.()) return new x.constructor(
        lerp(x.a, min, max),
        lerp(x.b, min, max)
    )
    if(x.isMatrix?.()) return new x.constructor(
        x.rows, 
        x.cols, 
        lerp(x.arr.flat(1), min, max)
    );
    return (max - min) * value + min;
}

export const map = (x, min, max) => {
    if(x.isComplex?.()) return new x.constructor(
        map(x.a, min, max),
        map(x.b, min, max)
    )
    if(x.isMatrix?.()) return new x.constructor(
        x.rows, 
        x.cols, 
        map(x.arr.flat(1), min, max)
    );
    return lerp(norm(x, a, b), c, d);
}

export const clamp = (x, min, max) => {
    if(x.isComplex?.()) return new x.constructor(
        clamp(x.a, min, max),
        clamp(x.b, min, max)
    )
    if(x.isMatrix?.()) return new x.constructor(
        x.rows, 
        x.cols, 
        clamp(x.arr.flat(1), min, max)
    );
    return Math.min(Math.max(c, min), max)
}

export const hypot = (...x) => {
  const c0 = x.find(a => a.isComplex?.());
  if (c0) {
    const W = x.map(n => n.isComplex?.() ? n : new c0.constructor(n, 0));
    return Math.hypot(...W.map(c => c.z));
  }
  return Math.hypot(...x);
};


export const atan2 = (x, y, rad = true) =>{

}