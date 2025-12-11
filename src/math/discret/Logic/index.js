import { Complex } from "../../complex/index.js";
import { Matrix } from "../../matrix/index.js";
const Logic={
    _mode:Number,
    _map:function(func,a,b){
        if (a instanceof Matrix)
            return new Matrix(
                a.rows,
                a.cols,
                a.arr.flat(1).map((n) => func(n, b))
            );
        else if (a instanceof Complex) return new Complex(func(a.a, b), func(a.b, b));
        else if (a instanceof Array) return a.map((n) => func(n, b));      
    },
    not:function(input){
        if(["number","boolean"].includes(typeof input)) return Logic._mode(!input);
        else return this._map(this.not,input)
    },
    and:function(a, ...b){
        if(["number","boolean"].includes(typeof a))return Logic._mode(b.reduce((n, m) => (n &= m), a));
        else return this._map(this.and,a,b)
    },
    or:function(a, ...b) {
        if(["number","boolean"].includes(typeof a)) return Logic._mode(b.reduce((n, m) => (n |= m), a));
        else return this._map(this.or,a,b);
    },
    nand:function(a, ...b) {
        return this.not(this.and(a, b));
    },
    nor:function(a, ...b) {
        return this.not(this.or(a, b));
    },
    xor:function(a,...b){
        let arr=[a,...b]
        if(["number","boolean"].includes(typeof a))return this._mode(arr.reduce((length,cur)=>{
            if(+cur===1)length+=1;
            return length;
        },0)===1);
        else return this._map(this.xor,a,b);
    },
    xnor:function(a,...b){
        return Logic.not(Logic.xor(a,b))
    }
    
}
export{Logic}