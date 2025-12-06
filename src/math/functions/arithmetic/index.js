const _add = (x, y) =>{
    if(typeof x === 'number'){
        if(typeof y === 'number') return x + y;
        if(y.isComplex?.()) {
            return y.clone().add(x);
        }
    }
    if(x.isComplex?.()){
        if(typeof y === 'number' || y.isComplex?.()) return new x.clone().add(y);
    }
}

const _sub = (x, y) =>{
    if(typeof x === 'number'){
        if(typeof y === 'number') return x - y;
        if(y.isComplex?.()) return new y.constructor(x - y.a, y.b);
    }
    if(x.isComplex?.()){
        if(typeof y === 'number' || y.isComplex?.()) return new x.clone().sub(y);
    }
}

const _mul = (x, y) =>{
    if(typeof x === 'number'){
        if(typeof y === 'number') return x * y;
        if(y.isComplex?.()) return y.clone().mul(x);
    }
    if(x.isComplex?.()){
        if(typeof y === 'number' || y.isComplex?.()) return new x.clone().mul(y);
    }
}

const _div = (x, y) =>{
    if(typeof x === 'number'){
        if(typeof y === 'number') return x / y;
        if(y.isComplex?.()) return new y.constructor(x, 0).div(y)
    }
    if(x.isComplex?.()){
        if(typeof y === 'number' || y.isComplex?.()) return new x.clone().mul(y);
    }
}

const _modulo = (x, y) =>{
    if(typeof x === 'number'){
        if(typeof y === 'number') return x % y;
        if(y.isComplex?.()) return new y.constructor(x, 0).modulo(y)
    }
    if(x.isComplex?.()){
        if(typeof y === 'number' || y.isComplex?.()) return new x.clone().modulo(y);
    }
}

export const add=(a,...b)=>{
    let res = a;
    for(let i=0; i<b.length; i++)
        res = _add(res, b[i])
    return res;
}
export const sub=(a,...b)=>{
    let res = a;
    for(let i=0; i<b.length; i++)
        res = _sub(res, b[i])
    return res;
}
export const mul=(a,...b)=>{
    let res = a;
    for(let i=0; i<b.length; i++)
        res = _mul(res, b[i])
    return res;
}
export const div=(a,...b)=>{
    let res = a;
    for(let i=0; i<b.length; i++)
        res = _div(res, b[i])
    return res;
}
export const modulo=(a,...b)=>{
    let res = a;
    for(let i=0; i<b.length; i++)
        res = _modulo(res, b[i])
    return res;
}