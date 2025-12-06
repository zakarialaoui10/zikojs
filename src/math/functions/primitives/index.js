import { mapfun } from '../../mapfun/index.js';
import { complex } from '../../complex/index.js'

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
            return new x.constructor({z: x.z**(1/2), phi: x.phi/2});
        if(x < 0) return complex(0, Math.sqrt(-x)) 
        return Math.sqrt(x);
    },
    ...x
);

export const cbrt = (...x) => mapfun(
    x=>{
        if(x.isComplex?.()) 
            return new x.constructor({z: x.z**(1/3), phi: x.phi/3})
        return Math.cbrt(x);
    },
    ...x
);

export const nthr = (...x) => {
    const n = x.pop();
    if(typeof n !== 'number') throw Error('nthr expects a real number n');
    return mapfun(
        x => {
            if(x.isComplex?.()) return new x.constructor({z: x.z ** (1/n), phi: x.phi / n});
            if(x<0) return n%2===2 ? complex(0, (-x)**(1/n)) : -1 * (-x)**(1/n)                
            return x**(1/n)
        },
        ...x
    )
}

export const croot = (...x) =>{
    const c = x.pop()
    if(!c.isComplex?.()) throw Error('croot expect Complex number as root')
    return mapfun(
        x => {
            if(typeof x === 'number') x = new c.constructor(x, 0);
            const {a : c_a, b : c_b} = c;
            const {z, phi} = x;
            const D = Math.hypot(c_a, c_b);
            const A = Math.exp((Math.log(z)*c_a + phi*c_b)/D);
            const B = (phi*c_a - Math.log(z)*c_b)/D
            return new c.constructor(
                A * Math.cos(B),
                A * Math.sin(B)
            )
        },
        ...x
    )
}

export const exp = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.exp(x.a) * Math.cos(x.b),
            Math.exp(x.a) * Math.sin(x.b)
        );
        return Math.exp(x)
    }
    ,...x
);

export const ln = (...x) => mapfun(
    x => {
        if(x.isComplex?.()) return new x.constructor(
            Math.log(x.z),
            x.phi
        );
        return Math.log(x)
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
            Math.cosh(x.a) * Math.cos(x.b),
            Math.sinh(x.a) * Math.sin(x.b)
        ); 
        return Math.cosh(x)
    },
    ...x
)
export const sinh = (...x) => mapfun(
    x =>{
        if(x?.isComplex) return new x.constructor(
            Math.sinh(x.a) * Math.cos(x.b),
            Math.cosh(x.a) * Math.sin(x.b)
        ); 
        return Math.sinh(x)
    },
    ...x
)
export const tanh = (...x) => mapfun(
    x =>{
        if(x?.isComplex){
            const D = Math.cosh(2*a) + Math.cos(2*b);
            return new x.constructor(
                Math.sinh(2*a) / D,
                Math.sin(2*b) / D
            )
        } 
        return Math.tanh(x)
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
        return 1/(1+Math.exp(-x))
    },
    ...x
)