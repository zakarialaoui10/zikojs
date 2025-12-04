const {PI, cos, sin, tan, acos, asin, atan, cosh, sinh, tanh, acosh, asinh, atanh, log} = Math
export let Fixed={
    cos : x=> {
        if(x.isComplex) return new x.constructor(cos(x.a)*cosh(x.b),-(sin(x.a)*sinh(x.b)))
            return cos(x)
    },
    sin,
    tan,
    sinc: x => sin(PI*x)/(PI*x),
    sec: x => 1/cos(x),
    csc: x => 1/sin(x),
    cot: x => 1/tan(x),
    acos,
    asin,
    atan,
    acot: x => PI/2-atan(x),
    cosh,
    sinh,
    tanh,
    coth: n => (1/2*log((1+n)/(1-n))),
    acosh,
    asinh,
    atanh,
}

// Fixed = new Proxy(Fixed, {
//     get(target, prop) {
//         if(prop in target){
//             return x => + target[prop](x).toFixed(15);
//         }
//         return undefined;
//     }
// })