import { mapfun } from '../../mapfun/index.js';

export const abs = (...x) => mapfun(
    x =>{
        if(x.isComplex?.()) return x.z;
        return Math.abs(x)
    },
    ...x
)

export const sqrt = (...x) => mapfun(
    x=>{
        if(x.isComplex?.()){
            const {z, phi} = x
            return new x.constructor(
                Math.sqrt(z) * Math.cos(phi/2),
                Math.sqrt(z) * Math.sin(phi/2)
            );
        } 
        return Math.sqrt(x);
    },
    ...x
)

export const e = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.exp(x.a) * Math.cos(x.b),
            Math.exp(x.a) * Math.sin(x.b)
        );
        return Math.ln(x)
    }
    ,...x
);

export const ln = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.log(x.z),
            x.phi
        );
        return Math.ln(x)
    }
    ,...x
);

export const sign = (...x) => mapfun(
    x => {
        if(x.isComplex?.()){
            const {z, phi} = x;
            if(z===0) return new x.constructor(0, 0);
            return new x.constructor({z:1, phi})
        }
        return Math.sign(x)
    }
    ,...x
);
export const cos = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.cos(x.a) * Math.cosh(x.b),
            -Math.sin(x.a) * Math.sinh(x.b)
        );
        return Math.cos(x)
    }
    ,...x
);

export const sin = (...x) => mapfun(
    x =>{
        if(x?.isComplex) return new x.constructor(
            Math.sin(x.a) * Math.cosh(x.b),
            Math.cos(x.a) * Math.sinh(x.b)
        );
        return Math.sin(x)
    }
    , ...x
);

export const tan = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            const DEN = Math.cos(2*x.a) + Math.cosh(2*x.b);
            return new x.constructor(
                Math.sin(2*x.a) / DEN,
                Math.sinh(2*x.b) / DEN
            );
        } 
        return Math.tan(x) 
    },
    ...x
);

export const acos = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            const { a, b } = x;
            const Rp = Math.hypot(a + 1, b);
            const Rm = Math.hypot(a - 1, b);
            globalThis.Rp = Rp
            globalThis.Rm = Rm
            console.log({a, b, Rp, Rm})
            return new x.constructor(
                Math.acos((Rp - Rm) / 2),
                -Math.acosh((Rp + Rm) / 2),
            )
        } 
        return Math.acos(x) 
    },
    ...x
);

export const asin = (...x) => mapfun(
    x => {
        if(x?.isComplex){
            const { a, b } = x;
            const Rp = Math.hypot(a + 1, b);
            const Rm = Math.hypot(a - 1, b);
            return new x.constructor(
                Math.asin((Rp - Rm) / 2), 
                Math.acosh((Rp + Rm) / 2)
            );
        }
        return Math.asin(x);
    },
    ...x
);

export const atan = (...x) => mapfun(
    x => {
        if(x?.isComplex){
            const { a, b } = x;
            return new x.constructor(
                Math.atan((a*2/(1-a**2-b**2)))/2,
                Math.log((a**2 + (1+b)**2)/(a**2 + (1-b)**2))/4
            )
        }
        return Math.atan(x);
    },
    ...x
);


export const cosh = (...x) => mapfun(
    x =>{
        if(x?.isComplex) return new x.constructor(
            cosh(x.a)*cos(x.b),
            sinh(x.a)*sin(x.b)
        ); 
        return cosh(x)
    },
    ...x
)
export const sinh = (...x) => mapfun(
    x =>{
        if(x?.isComplex) return new x.constructor(
            sinh(x.a)*cos(x.b),
            cosh(x.a)*sin(x.b)
        ); 
        return sinh(x)
    },
    ...x
)
export const tanh = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            const DEN=cosh(2*a)+cos(2*b);
            return new x.constructor(
                sinh(2*a)/DEN,
                sin(2*b)/DEN
            )
        } 
        return tanh(x)
    },
    ...x
)