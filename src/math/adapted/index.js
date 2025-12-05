export const adapted_cos = x =>{
    if(x.isComplex?.()) return new x.constructor(
            Math.cos(x.a)*Math.cosh(x.b),
            -(Math.sin(x.a)*Math.sinh(x.b))
    );
    return Math.cos(x)
}
