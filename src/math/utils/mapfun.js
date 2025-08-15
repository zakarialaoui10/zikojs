/** @module Math */
import { Matrix } from "../matrix/index.js";
import { Complex , complex } from "../complex/index.js";
import {ln,e,cos,sin,sqrt,cosh,sinh} from "../functions/index.js";
import { Fixed } from "../functions/helper.js";
 /**
 * map a function to ...X
 * @param {function} fun
 * @param {...any} X
 * @returns {any|any[]}
 */
const mapfun=(fun,...X)=>{
    const Y=X.map(x=>{
        if(x===null)return fun(null);
        if(["number","string","boolean","bigint","undefined"].includes(typeof x))return fun(x);
        if(x instanceof Array)return x.map(n=>mapfun(fun,n));
        if(ArrayBuffer.isView(x))return x.map(n=>fun(n));
        if(x instanceof Set)return new Set(mapfun(fun,...[...x]));
        if(x instanceof Map)return new Map([...x].map(n=>[n[0],mapfun(fun,n[1])]));
        if(x instanceof Matrix){
            return new Matrix(x.rows,x.cols,mapfun(x.arr.flat(1)))
        }
        if(x instanceof Complex){
            const [a,b,z,phi]=[x.a,x.b,x.z,x.phi];
            switch(fun){
                case Math.log:return complex(ln(z),phi); // Done
                case Math.exp:return complex(e(a)*cos(b),e(a)*sin(b)); // Done
                case Math.abs:return z; // Done
                case Math.sqrt:return complex(sqrt(z)*cos(phi/2),sqrt(z)*sin(phi/2)); // Done
                case Fixed.cos:return complex(cos(a)*cosh(b),-(sin(a)*sinh(b)));
                case Fixed.sin:return complex(sin(a)*cosh(b),cos(a)*sinh(b));
                case Fixed.tan:{
                    const DEN=cos(2*a)+cosh(2*b);
                    return complex(sin(2*a)/DEN,sinh(2*b)/DEN);
                }
                case Fixed.cosh:return complex(cosh(a)*cos(b),sinh(a)*sin(b));
                case Fixed.sinh:return complex(sinh(a)*cos(b),cosh(a)*sin(b));
                case Fixed.tanh:{
                    const DEN=cosh(2*a)+cos(2*b);
                    return complex(sinh(2*a)/DEN,sin(2*b)/DEN)
                }
                default : return fun(x)
            }
        }
        else if(x instanceof Object){
            return Object.fromEntries(Object.entries(x).map(n=>n=[n[0],mapfun(fun,n[1])]))
            return fun(Object) || Object.fromEntries(Object.entries(x).map(n=>n=[n[0],mapfun(fun,n[1])]))
        }
    });
   return Y.length==1?Y[0]:Y; 
}
export {mapfun}