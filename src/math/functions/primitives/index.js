import { mapfun } from '../../mapfun/index.js';

export const abs = (...x) => mapfun(
    x =>{
        if(x.isComplex?.()) return x.z;
        return Math.abs(x)
    },
    ...x
)

export const pow = (...x) => {
    const n = x.pop();
    return mapfun(
        x => {
            if(x.isComplex?.()) {
                if(n.isComplex?.()) return new x.constructor({
                    z: Math.exp(n.a * Math.log(x.z) - n.b * x.phi),
                    phi: n.b * Math.log(x.z) + n.a * x.phi
                })
                return new x.constructor({z: x.z ** n, phi: x.phi * n});
            }
            if(n.isComplex?.()) return new x.constructor({
                    z: Math.exp(n.a * Math.log(x)),
                    phi: n.b * Math.log(x)
                })
            return Math.pow(x, n)
        },
        ...x
    )
}

export const sqrt = (...x) => mapfun(
    x=>{
        if(x.isComplex?.()) 
            return new x.constructor({z: x.z**(1/2), phi: x.phi/2})
        return Math.sqrt(x);
    },
    ...x
);

export const sqrtn = (...x) => {
    const n = x.pop();
    return mapfun(
        x => {
            if(x.isComplex?.()){
                if(n.isComplex?.()){
                    // To Be implemented
                }
                return new x.constructor({z: x.z ** 1/n, phi: x.phi / n});
            }
            if(n.isComplex?.()){
                // To Be implemented
            }
            return x**(1/n)
        },
        ...x
    )
}

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

export const floor = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.floor(x.a),
            Math.floor(x.b)
        )
        return Math.floor(x)
    },
    ...x
)
export const ceil = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.ceil(x.a),
            Math.ceil(x.b)
        )
        return Math.ceil(x)
    },
    ...x
)
export const round = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.round(x.a),
            Math.round(x.b)
        )
        return Math.round(x)
    },
    ...x
)

export const trunc = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.trunc(x.a),
            Math.trunc(x.b)
        )
        return Math.trunc(x)
    },
    ...x
)

export const fract = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            x.a - Math.trunc(x.a),
            x.b - Math.trunc(x.b)
        )
        return x - Math.trunc(x)
    },
    ...x
)

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
            const D = Math.cos(2*x.a) + Math.cosh(2*x.b);
            return new x.constructor(
                Math.sin(2*x.a) / D,
                Math.sinh(2*x.b) / D
            );
        } 
        return Math.tan(x) 
    },
    ...x
);

export const sec = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) {

        }
        return 1 / Math.cos(x)
    }
    ,...x
);

export const acos = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            const { a, b } = x;
            const Rp = Math.hypot(a + 1, b);
            const Rm = Math.hypot(a - 1, b);
            globalThis.Rp = Rp
            globalThis.Rm = Rm
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

export const acot = (...x) => mapfun(
    x => {
        if(x?.isComplex){
            const { a, b } = x;
            return new x.constructor(
                Math.atan(2*a/(a**2+(b-1)*(b+1)))/2,
                Math.log((a**2 + (b-1)**2)/(a**2 + (b+1)**2))/4   
            )
        }
        return Math.PI/2 - Math.atan(x);
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
            const D=cosh(2*a)+cos(2*b);
            return new x.constructor(
                sinh(2*a)/D,
                sin(2*b)/D
            )
        } 
        return tanh(x)
    },
    ...x
)

export const coth = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            const {a, b} = x
            const D = (Math.sinh(a)**2)*(Math.cos(b)**2) + (Math.cosh(a)**2)*(Math.sin(b)**2) 
            return new x.constructor(
                Math.cosh(a) * Math.sinh(a) / D,
                - Math.sin(b) * Math.cos(b) / D
            )
        } 
        return 1/Math.tanh(x)
    },
    ...x
)

export const acosh = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            return ln(x.clone().add(sqrt(x.clone().mul(x.clone()).sub(1))))
        } 
        return Math.acosh(x)
    },
    ...x
)

export const asinh = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            return ln(x.clone().add(sqrt(x.clone().mul(x.clone()).add(1))))
        } 
        return Math.asinh(x)
    },
    ...x
)

export const atanh = (...x) => mapfun(
    x =>{
        if(x?.isComplex){

        } 
        return Math.atanh(x)
    },
    ...x
)

export const sig = (...x) => mapfun(
    x =>{
        if(x?.isComplex){

        } 
        return 1/(1+Math.e(-x))
    },
    ...x
)