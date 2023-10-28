'use strict';

const { PI, E } = Math;
const EPSILON=Number.EPSILON;

var Signal={
    _map(func){

    },
    linspace(){

    },
    logspace(){

    },
    arange(){

    },
    echelon(t,t0=0){
        if(typeof t==="number")return +(t>=t0);
    },
    rampe(t,t0=0){
        if(typeof t==="number")return (t>=t0)?t-t0:0;
    },
    sign(t,t0=0){
        if(typeof t==="number")return Math.sign(t-t0);
    },
    rect(t,T,t0=0){
        if(typeof t==="number")return this.echelon(t,t0-T/2)-(this.echelon(t,t0+T/2));
    },
    tri(t,T,t0){
        if(typeof t==="number"){
            if(Math.abs(t)>T/2)return 0;
            else if(t<t0)return this.rampe(t,t0)
            else return -this.rampe(t,t0)
        }
    },
    dirac(){

    },
    lorentz(t,t0=0){
        if(typeof t==="number")return 1/(1+(t-t0)**2);
    },
    sinc(){

    },
    square(){

    },
    sawtooth(){

    }
    
};

class AbstractZikoMath {}

//import ZMath from "./index.js";
class Complex extends AbstractZikoMath{
    constructor(a = 0, b = 0) {
        super();
        if(a instanceof Complex){
            this.a=a.a;
            this.b=a.b;
        }
        if(typeof(a)==="object"){
            if(("a" in b && "b" in a)){
                this.a=a.a;
                this.b=a.b;
            }
            else if(("a" in b && "z" in a)){
                this.a=a.a;
                this.b=sqrt((a.z**2)-(a.a**2));
            }
            else if(("a" in b && "phi" in a)){
                this.a=a.a;
                this.b=a.a*tan(a.phi);
            }
            else if(("b" in b && "z" in a)){
                this.b=a.b;
                this.a=sqrt((a.z**2)-(a.b**2));
            }
            else if(("b" in b && "phi" in a)){
                this.b=b;
                this.a=a.b/tan(a.phi);
            }
            else if(("z" in b && "phi" in a)){
                this.a=a.z*cos(a.phi);
                this.a=a.z*sin(a.phi);
            }
        }
        else if(typeof(a)==="number"&&typeof(b)==="number"){
            this.a = +a.toFixed(32);
            this.b = +b.toFixed(32);
        }
    }
    get clone() {
        return new Complex(this.a, this.b);
    }
    get z(){
        return hypot(this.a,this.b);    
    }
    get phi(){
        return atan2(this.b , this.a);        
    }
    static get ZERO() {
        return new Complex(0, 0);
    }
    get conj() {
        return new Complex(this.a, -this.b);
    }
    get inv() {
        return new Complex(this.a / (pow(this.a, 2) + pow(this.b, 2)), -this.b / (pow(this.a, 2) + pow(this.b, 2)));
    }
    add(...z) {
        for (let i = 0; i < z.length; i++) {
            if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
        }
        let re = z.map((n) => n.a);
        let im = z.map((n) => n.b);
        this.a+=+sum(...re).toFixed(15);
        this.b+=+sum(...im).toFixed(15);
        return this;
    }
    sub(...z) {
        for (let i = 0; i < z.length; i++) {
            if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
        }
        let re = z.map((n) => n.a);
        let im = z.map((n) => n.b);
        this.a-=+sum(...re).toFixed(15);
        this.b-=+sum(...im).toFixed(15);
        return this;
    }
    mul(...z){
        for (let i = 0; i < z.length; i++) {
            if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
        }
        let Z=+prod(this.z,...z.map(n=>n.z)).toFixed(15);
        let phi=+sum(this.phi,...z.map(n=>n.phi)).toFixed(15);
        this.a=+(Z*cos(phi).toFixed(15)).toFixed(14);
        this.b=+(Z*sin(phi).toFixed(15)).toFixed(14);    
        return this;
    }
    div(...z) {
        for (let i = 0; i < z.length; i++) {
            if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
        }
        let Z=+(this.z/prod(...z.map(n=>n.z))).toFixed(15);
        let phi=+(this.phi-sum(...z.map(n=>n.phi))).toFixed(15);
        this.a=+(Z*cos(phi).toFixed(15)).toFixed(15);
        this.b=+(Z*sin(phi).toFixed(15)).toFixed(15);
        return this;
    }
    pow(n) {
        if (floor(n) === n && n > 0) {
            let z=+(this.z**n).toFixed(15);
            let phi=+(this.phi*n).toFixed(15);
            this.a=+(z*cos(phi).toFixed(15)).toFixed(15);
            this.b=+(z*sin(phi).toFixed(15)).toFixed(15);
        }
        return this;
    }
    static fromExpo(z, phi) {
        return new Complex(z * cos(phi), z * sin(phi));
    }
    get expo() {
        return [this.z, this.phi];
    }
    static add(c,...z) {
        return c.clone.add(...z);
    }
    static sub(c,...z) {
        return c.clone.sub(...z);
    }
    static mul(c,...z) {
        return c.clone.mul(...z);
    }
    static div(c,...z) {
        return c.clone.div(...z);
    }
    static pow(z,n){
        return z.clone.pow(n);
    }
    static xpowZ(x){
        return complex((x**this.a)*cos(this.b*ln(x)),(x**this.a)*sin(this.b*ln(x)));
    }
    sqrtn(n=2){
        return complex(sqrtn(this.z,n)*cos(this.phi/n),sqrtn(this.z,n)*sin(this.phi/n));
    }
    get sqrt(){
        return this.sqrtn(2);
    }
    get log(){
        return complex(this.z,this.phi);
    }
    get cos(){
        return complex(cos(this.a)*cosh(this.b),sin(this.a)*sinh(this.b))
    }
    get sin(){
        return complex(sin(this.a)*cosh(this.b),cos(this.a)*sinh(this.b))
    }
    get tan(){
        const de=cos(this.a*2)+cosh(this.b*2);
        return complex(sin(2*this.a)/de,sinh(2*this.b)/de);
    }
    printInConsole() {
        let string = this.a + " + " + this.b + " * i";
        console.log(string);
        return string;
    }
    print() {
        //return text(this.a + " + i * " + this.b);
    }
    UI() {
        return "<span>" + this.a + " + i * " + this.b + "</span>";
    }
}

const complex=(a,b)=>{
    if((a instanceof Array||ArrayBuffer.isView(a)) && (b instanceof Array||ArrayBuffer.isView(a)))return a.map((n,i)=>complex(a[i],b[i]));
    if(a instanceof Matrix && b instanceof Matrix){
        if((a.shape[0]!==b.shape[0])||(a.shape[1]!==b.shape[1]))return Error(0)
        const arr=a.arr.map((n,i)=>complex(a.arr[i],b.arr[i]));
        return new Matrix(a.rows,a.cols,...arr)
    }
    return new Complex(a,b)
};

//import ZMath from "./index.js"  
class Utils {
    static zeros(num,n){
        return new Array(n).fill(0);
    }
    static ones(num,n){
        return new Array(n).fill(1);
    }
    static numbers(num,n){
        return new Array(n).fill(num);
    }
    static #add(a,b){
        if(typeof(a)==="number"){
            if (typeof b == "number") return a + b;
            else if (b instanceof Complex)return complex(a + b.a, b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).add(b);
            else if (b instanceof Array)return b.map(n=>Utils.add(n,a));                 
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.add(n));
            return a.clone.add(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array);
            else {
                return a.map(n=>Utils.add(n,b));
            }
        }
    }
    static #sub(a,b){
        if(typeof(a)==="number"){
            if (typeof b == "number") return a - b;
            else if (b instanceof Complex)return complex(a - b.a, -b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).sub(b);
            else if (b instanceof Array)return b.map(n=>Utils.sub(n,a));                 
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.sub(n));
            return a.clone.sub(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array);
            else {
                return a.map(n=>Utils.add(n,b));
            }
        }
    }
    static #mul(a,b){
        if(typeof(a)==="number"){
        if (typeof b == "number") return a * b;
            else if (b instanceof Complex)return complex(a * b.a,a * b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).mul(b);
            else if (b instanceof Array)return b.map(n=>Utils.mul(a,n)); 
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.mul(n));
            return a.clone.mul(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array);
            else {
                return a.map(n=>Utils.mul(n,b));
            }
        }
    }
    static #div(a,b){
        if(typeof(a)==="number"){
        if (typeof b == "number") return a / b;
            else if (b instanceof Complex)return complex(a / b.a,a / b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).div(b);
            else if (b instanceof Array)return b.map(n=>Utils.div(a,n));
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.div(n));
            return a.clone.div(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array);
            else {
                return a.map(n=>Utils.add(n,b));
            }
        }
    }
    static #modulo(a,b){
        if(typeof(a)==="number"){
            if (typeof b == "number") return a % b;
                else if (b instanceof Complex)return complex(a % b.a,a % b.b);
                else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).modulo(b);
                else if (b instanceof Array)return b.map(n=>Utils.div(a,n));
            }
            else if(a instanceof Complex||a instanceof Matrix){
                if(b instanceof Array)return b.map(n=>a.clone.div(n));
                return a.clone.div(b);
            }
            else if(a instanceof Array){
                if(b instanceof Array);
                else {
                    return a.map(n=>Utils.add(n,b));
                }
            }
    }
    static add(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#add(res,b[i]);
        return res;
    }
    static sub(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#sub(res,b[i]);
        return res;
    }
    static mul(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#mul(res,b[i]);
        return res;
    }
    static div(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#div(res,b[i]);
        return res;
    }
    static modulo(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#modulo(res,b[i]);
        return res;
    }
    static sum(...x) {
        let s = x[0];
        for (let i = 1; i < x.length; i++) s += x[i];
        return s;
    }
    static prod(...x) {
        let p = x[0];
        for (let i = 1; i < x.length; i++) p *= x[i];
        return p;
    }
    static deg2rad(x) {
        if (typeof x === "number") return (x * PI) / 180;
        else if (x instanceof Matrix) return new Matrix(x.rows, x.cols, Utils.deg2rad(x.arr.flat(1)));
        else if (x instanceof Complex) return new Complex(Utils.deg2rad(x.a), Utils.deg2rad(x.b));
        else if (x instanceof Array) {
            if (x.every((n) => typeof (n === "number"))) {
                return x.map((n) => Utils.deg2rad(n));
            } else {
                let y = new Array(x.length);
                for (let i = 0; i < x.length; i++) {
                    y[i] = this.deg2rad(x[i]);
                }
            }
        }
    }
    static rad2deg(x) {
        if (typeof x === "number") return (x / PI) * 180;
        else if (x instanceof Matrix) return new Matrix(x.rows, x.cols, Utils.rad2deg(x.arr.flat(1)));
        else if (x instanceof Complex) return new Complex(Utils.rad2deg(x.a), Utils.rad2deg(x.b));
        else if (x instanceof Array) {
            if (x.every((n) => typeof (n === "number"))) {
                return x.map((n) => Utils.rad2deg(n));
            } else {
                let y = new Array(x.length);
                for (let i = 0; i < x.length; i++) {
                    y[i] = this.rad2deg(x[i]);
                }
            }
        }
    }
    static pgcd(n1, n2) {
        let i,
            pgcd = 1;
        if (n1 == floor(n1) && n2 == floor(n2)) {
            for (i = 2; i <= n1 && i <= n2; ++i) {
                if (n1 % i == 0 && n2 % i == 0) pgcd = i;
            }
            return pgcd;
        } else console.log("error");
    }
    static ppcm(n1, n2) {
        let ppcm;
        if (n1 == floor(n1) && n2 == floor(n2)) {
            ppcm = n1 > n2 ? n1 : n2;
            while (true) {
                if (ppcm % n1 == 0 && ppcm % n2 == 0) break;
                ++ppcm;
            }
            return ppcm;
        } else console.log("error");
    }
    static linspace(a,b,n=abs(b-a)+1,endpoint=true) {
        if(a instanceof Complex||b instanceof Complex){
            a=complex(a);
            b=complex(b);
            n=n||Math.abs(b.a-a.a)+1;
            const X=this.linspace(a.a,b.a,n,endpoint);
            const Y=this.linspace(a.b,b.b,n,endpoint);
            let Z=new Array(n).fill(null);
            Z=Z.map((n,i)=>complex(X[i],Y[i]));
            return Z;
        }
        else if(a instanceof Array){
            let Y=[];
            for(let i=0;i<a.length;i++){
                n=n||abs(b[i]-a[i])+1;
                Y[i]=this.linspace(a[i],b[i],n,endpoint);
            }
            return Y;
        }
        const [high,low]=[a,b].sort((a,b)=>b-a);
        if (floor(n) !== n) return;
        var arr = [];
        let step = (high - low) / (n - 1);
        if(!endpoint)step = (high - low) / n;
        for (var i = 0; i < n; i++) {
            arr.push(low+step*i);
        }
        return a<b?arr:arr.reverse();
    }
    static logspace(a,b,n=b-a+1,base=E,endpoint=true){
        if(a instanceof Complex||b instanceof Complex){
            a=complex(a);
            b=complex(b);
            n=n??abs(b.a-a.a);
            const X=this.linspace(a.a,b.a,n,base,endpoint);
            const Y=this.linspace(a.b,b.b,n,base,endpoint);
            const Z=new Array(X.length).fill(0);
            const ZZ=Z.map((n,i) => pow(base,complex(X[i],Y[i])));
            return ZZ;
        }
        const start=base**min(a,b);
        const stop=base**max(a,b);
        const y = Utils.linspace(ln(start) / ln(base), ln(stop) / ln(base), n, endpoint);
        const result=y.map(n => pow(base, n));
        return a<b?result:result.reverse();
    }
    static geomspace(a,b,n=abs(b-a)+1){
        var [high,low]=[a,b].sort((a,b)=>b-a);
        var step=sqrtn(high,n-low);
        var arr=[low];
        for(let i=1;i<n;i++)arr[i]=arr[i-1]*step;
        arr=arr.map(n=>+n.toFixed(8));
        return a<b?arr:arr.reverse()
    }
    static arange(a, b, pas) {
        let tab = [];
        for (let i = a; i < b; i += pas) tab.push((i * 10) / 10);
        return tab;
    }
    static norm(value, min, max) {
        if (typeof value === "number") return min !== max ? (value - min) / (max - min) : 0;
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.norm(value.arr.flat(1), min, max));
        else if (value instanceof Complex) return new Complex(Utils.norm(value.a, min, max), Utils.norm(value.b, min, max));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.norm(n, min, max));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = this.norm(value[i]);
                }
            }
        }
    }
    static lerp(value, min, max) {
        if (typeof value === "number") return (max - min) * value + min;
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.lerp(value.arr.flat(1), min, max));
        else if (value instanceof Complex) return new Complex(Utils.lerp(value.a, min, max), Utils.lerp(value.b, min, max));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.lerp(n, min, max));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = Utils.lerp(value[i]);
                }
            }
        }
    }
    static map(value, a, b, c, d) {
        if (typeof value === "number") return Utils.lerp(Utils.norm(value, a, b), c, d);
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.map(value.arr.flat(1), a, b, c, d));
        else if (value instanceof Complex) return new Complex(Utils.map(value.a, b, c, d), Utils.map(value.b, a, b, c, d));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.map(n, a, b, c, d));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = Utils.map(value[i], a, b, c, d);
                }
            }
        }
    }
    static clamp(value, min, max) {
        if (typeof value === "number") return min(max(value, min), max);
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.clamp(value.arr.flat(1), min, max));
        else if (value instanceof Complex) return new Complex(Utils.clamp(value.a, min, max), Utils.clamp(value.b, min, max));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.clamp(n, min, max));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = Utils.clamp(value[i], min, max);
                }
            }
        }
    }
    static aproximatelyEqual(a,b,Epsilon=0.0001){
        return abs(a-b)<Epsilon;
    }
    static cartesianProduct(a, b){
        return a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);
    }
    static accum(...arr){
        let acc = arr.reduce((x, y) => [...x, x[x.length - 1] + y], [0]);
            acc.shift();
            return acc;
    }
}
var {zeros,ones,numbers,sum,prod,add,mul,div,sub,modulo,rad2deg,deg2rad,arange,linspace,logspace,norm,lerp,map,clamp,pgcd,ppcm,aproximatelyEqual,cartesianProduct}=Utils;

//import{arange}from "../Utils/index.js"
const Logic$1={
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
        if(["number","boolean"].includes(typeof input)) return Logic$1._mode(!input);
        else return this._map(this.not,input)
    },
    and:function(a, ...b){
        if(["number","boolean"].includes(typeof a))return Logic$1._mode(b.reduce((n, m) => (n &= m), a));
        else return this._map(this.and,a,b)
    },
    or:function(a, ...b) {
        if(["number","boolean"].includes(typeof a)) return Logic$1._mode(b.reduce((n, m) => (n |= m), a));
        else return this._map(this.or,a,b);
    },
    nand:function(a, ...b) {
        return this.not(this.and(a, b));
    },
    nor:function(a, ...b) {
        return this.not(this.or(a, b));
    },
    xor:function(a,...b){
        let arr=[a,...b];
        if(["number","boolean"].includes(typeof a))return this._mode(arr.reduce((length,cur)=>{
            if(+cur===1)length+=1;
            return length;
        },0)===1);
        else return this._map(this.xor,a,b);
    },
    xnor:function(a,...b){
        return Logic$1.not(Logic$1.xor(a,b))
    }
    
};

var Base={
    _mode:Number,
    _map:function(func,number,toBase){
        if (number instanceof Matrix)
            return new Matrix(
                number.rows,
                number.cols,
                number.arr.flat(1).map(n=>func(n,toBase))
            );
        else if (number instanceof Complex) return new Complex(func(number.a,toBase),func(number.b,toBase));
        else if (number instanceof Array) return number.map((n) =>func(n,toBase));
    },
    dec2base(dec,base){
        base<=10?this._mode=Number:this._mode=String;
        //this._mode=String
        if (typeof dec === "number") return this._mode((dec >>> 0).toString(base));
          return this._map(this.dec2base,dec,base)
    },
    dec2bin(dec){
        return this.dec2base(dec,2);
    },
    dec2oct(dec){
        return this.dec2base(dec,8);
    },
    dec2hex(dec){
        return this.dec2base(dec,16);
    },
    bin2base(bin, base) {
        return this.dec2base(this.bin2dec(bin),base)
    },
    bin2dec(bin){
        return this._mode("0b"+bin);
    },
    bin2oct(bin){
        return this.bin2base(bin,8);
    },
    bin2hex(bin){
        return this.bin2base(bin,16);
    },
    oct2dec(oct){
        return this._mode("0o"+oct);
    },
    oct2bin(oct){
        return this.dec2bin(this.oct2dec(oct))
    },
    oct2hex(oct){
        return this.dec2hex(this.oct2dec(oct))
    },
    oct2base(oct, base) {
        return this.dec2base(this.oct2dec(oct),base)
    },
    hex2dec(hex){
        return this._mode("0x"+hex);
    },
    hex2bin(hex){
        return this.dec2bin(this.hex2dec(hex))
    },
    hex2oct(hex){
        return this.dec2oct(this.hex2dec(hex))
    },
    hex2base(hex, base) {
        return this.dec2base(this.hex2dec(hex),base)
    },
    IEEE32toDec(Bin){
        let IEEE32=Bin.split(" ").join("").padEnd(32,"0");
        let s=IEEE32[0];
        let e=2**(+("0b"+IEEE32.slice(1,9))-127);
        let m=IEEE32.slice(9,32).split("").map(n=>+n);
        let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
        let dec=(-1)**s*(1+M)*e;
        return dec
    },
    IEEE64toDec(Bin){
        let IEEE64=Bin.split(" ").join("").padEnd(64,"0");
        let s=IEEE64[0];
        let e=2**(+("0b"+IEEE64.slice(1,12))-1023);
        let m=IEEE64.slice(13,64).split("").map(n=>+n);
        let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
        let dec=(-1)**s*(1+M)*e;
        return dec;
    }
};

// class Logic1{
//     static not(input) {
//         if (typeof input === "number") return +!input;
//         else if (input instanceof Matrix)
//             return new Matrix(
//                 input.rows,
//                 input.cols,
//                 input.arr.flat(1).map((n) => Logic.not(n))
//             );
//         else if (input instanceof Complex) return new Complex(Logic.not(input.a), Logic.not(input.b));
//         else if (input instanceof Array) return input.map((n) => Logic.not(n));
//     }
//     static and(a, ...b) {
//         if (typeof a === "number") return b.reduce((n, m) => (n &= m), a);
//         else if (a instanceof Matrix)
//             return new Matrix(
//                 a.rows,
//                 a.cols,
//                 a.arr.flat(1).map((n) => Logic.and(n, b))
//             );
//         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.and(a.b, b));
//         else if (a instanceof Array) return a.map((n) => Logic.and(n, b));
//     }
//     static or(a, ...b) {
//         if (typeof a === "number") return b.reduce((n, m) => (n |= m), a);
//         else if (a instanceof Matrix)
//             return new Matrix(
//                 a.rows,
//                 a.cols,
//                 a.arr.flat(1).map((n) => Logic.or(n, b))
//             );
//         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.or(a.b, b));
//         else if (a instanceof Array) return a.map((n) => Logic.or(n, b));
//     }
//     static nand(a, ...b) {
//         return Logic.not(Logic.and(a, b));
//     }
//     static nor(a, ...b) {
//         return Logic.not(Logic.or(a, b));
//     }
//     static xor(a, ...b) {
//         if (typeof a === "number") {
//             const c = b.Count(1);
//             switch (c) {
//                 case 0:
//                     return a;
//                 case 1:
//                     return Logic.not(a);
//                 default:
//                     return 0;
//             }
//         } else if (a instanceof Matrix)
//             return new Matrix(
//                 a.rows,
//                 a.cols,
//                 a.arr.flat(1).map((n) => Logic.xor(n, b))
//             );
//         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.xor(a.b, b));
//         else if (a instanceof Array) return a.map((n) => Logic.xor(n, b));
//     }
//     static xnor(a, ...b) {
//         return Logic.not(Logic.xor(a, b));
//     }
// }
// class BaseConversion {
//     constructor() {}
//     static dec2base(dec, base) {
//         if (typeof dec === "number") return (dec >>> 0).toString(base);
//         else if (dec instanceof Matrix)
//             return new Matrix(
//                 dec.rows,
//                 dec.cols,
//                 dec.arr.flat(1).map((n) => (n >>> 0).toString(base))
//             );
//         else if (dec instanceof Complex) return new Complex((dec.a >>> 0).toString(base), (dec.b >>> 0).toString(base));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2base(n, base));
//     }
//     static bin2base(bin, base) {
//         if (typeof bin === "number") return parseInt(bin, 2).toString(base);
//         else if (bin instanceof Matrix)
//             return new Matrix(
//                 bin.rows,
//                 bin.cols,
//                 bin.arr.flat(1).map((n) => parseInt(n, 2).toString(base))
//             );
//         else if (bin instanceof Complex) return new Complex(parseInt(bin.a, 2).toString(base), parseInt(bin.b, 2).toString(base));
//         else if (bin instanceof Array) return bin.map((n) => BaseConversion.bin2base(n, base));
//     }
//     static oct2base(oct, base) {
//         if (typeof oct === "number") return +parseInt(oct, 8).toString(base);
//         else if (oct instanceof Matrix)
//             return new Matrix(
//                 oct.rows,
//                 oct.cols,
//                 oct.arr.flat(1).map((n) => parseInt(n, 8).toString(base))
//             );
//         else if (oct instanceof Complex) return new Complex(parseInt(oct.a, 8).toString(base), parseInt(oct.b, 8).toString(base));
//         else if (oct instanceof Array) return oct.map((n) => BaseConversion.oct2base(n, base));

//         //return oct instanceof Array?oct.map((n)=>parseInt(n,8).toString(base)):parseInt(bin,8).toString(base);
//     }
//     static hex2base(hex, base) {
//         if (typeof hex === "number") return +parseInt(hex, 16).toString(base);
//         else if (hex instanceof Matrix)
//             return new Matrix(
//                 hex.rows,
//                 hex.cols,
//                 hex.arr.flat(1).map((n) => parseInt(n, 16).toString(base))
//             );
//         else if (hex instanceof Complex) return new Complex(parseInt(hex.a, 16).toString(base), parseInt(hex.b, 16).toString(base));
//         else if (hex instanceof Array) return hex.map((n) => BaseConversion.hex2base(n, base));
//     }
//     static bin2dec(bin) {
//         //return bin instanceof Array?bin.map((n)=>bin2base(n,10)):bin2base(bin,10);

//         if (typeof bin === "number") return +BaseConversion.bin2base(bin, 10);
//         else if (bin instanceof Matrix)
//             return new Matrix(
//                 bin.rows,
//                 bin.cols,
//                 bin.arr.flat(1).map((n) => +BaseConversion.bin2base(n, 10))
//             );
//         else if (bin instanceof Complex) return new Complex(+BaseConversion.bin2base(bin.a, 10), +BaseConversion.bin2base(bin.b, 10));
//         else if (bin instanceof Array) return bin.map((n) => BaseConversion.bin2dec(n));
//     }
//     static dec2bin(dec) {
//         //return +BaseConversion.dec2base(dec,2);

//         if (typeof dec === "number") return +BaseConversion.dec2base(dec, 2);
//         else if (dec instanceof Matrix)
//             return new Matrix(
//                 dec.rows,
//                 dec.cols,
//                 dec.arr.flat(1).map((n) => +BaseConversion.dec2base(n, 2))
//             );
//         else if (dec instanceof Complex) return new Complex(+BaseConversion.dec2base(dec.a, 2), +BaseConversion.dec2base(dec.a, 2));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2bin(n));
//     }
//     static dec2oct(dec) {
//         if (typeof dec === "number") return +BaseConversion.dec2base(dec, 8);
//         else if (dec instanceof Matrix)
//             return new Matrix(
//                 dec.rows,
//                 dec.cols,
//                 dec.arr.flat(1).map((n) => +BaseConversion.dec2base(n, 8))
//             );
//         else if (dec instanceof Complex) return new Complex(+BaseConversion.dec2base(dec.a, 8), +BaseConversion.dec2base(dec.a, 8));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2oct(n));
//     }
//     static dec2hex(dec) {
//         if (typeof dec === "number") return BaseConversion.dec2base(dec, 16);
//         //else if(dec instanceof Matrix)return new Matrix(dec.rows,dec.cols,dec.arr.flat(1).map(n=>BaseConversion.dec2base(n,16)));
//         //else if(dec instanceof Complex)return new Complex(BaseConversion.dec2base(dec.a,16),BaseConversion.dec2base(dec.a,16));
//         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2hex(n));
//     }
//     static IEEE32toDec(Bin){
//         let IEEE32=Bin.split(" ").join("").padEnd(32,"0");
//         let s=IEEE32[0];
//         let e=2**(+("0b"+IEEE32.slice(1,9))-127)
//         let m=IEEE32.slice(9,32).split("").map(n=>+n)
//         let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
//         let dec=(-1)**s*(1+M)*e;
//         return dec
//     }
//     static IEEE64toDec(Bin){
//         let IEEE64=Bin.split(" ").join("").padEnd(64,"0");
//         let s=IEEE64[0];
//         let e=2**(+("0b"+IEEE64.slice(1,12))-1023)
//         let m=IEEE64.slice(13,64).split("").map(n=>+n)
//         let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
//         let dec=(-1)**s*(1+M)*e;
//         return dec
//     }
// }
class Permutation {
    static withDiscount(arr, l = arr.length) {
        if (l === 1) {
            return arr.map((n) => [n]);
        }
        const permutations = [];
        let smallerPermutations;
        smallerPermutations = this.withDiscount(arr, l - 1);
        arr.forEach((currentOption) => {
            smallerPermutations.forEach((smallerPermutation) => {
                permutations.push([currentOption].concat(smallerPermutation));
            });
        });
        return permutations;
    }
    static withoutDiscount(arr) {
        const l = arr.length;
        if (l === 1) {
            return arr.map((n) => [n]);
        }
        const permutations = [];
        const smallerPermutations = this.withoutDiscount(arr.slice(1));
        const firstOption = arr[0];
        for (let i = 0; i < smallerPermutations.length; i++) {
            const smallerPermutation = smallerPermutations[i];
            for (let j = 0; j <= smallerPermutation.length; j++) {
                const permutationPrefix = smallerPermutation.slice(0, j);
                const permutationSuffix = smallerPermutation.slice(j);
                permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
            }
        }
        return permutations;
    }
}
class Combinaison {
    static withDiscount(comboOptions, comboLength) {
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        // Init combinations array.
        const combos = [];
        // Remember characters one by one and concatenate them to combinations of smaller lengths.
        // We don't extract elements here because the repetitions are allowed.
        comboOptions.forEach((currentOption, optionIndex) => {
            // Generate combinations of smaller size.
            const smallerCombos = this.withDiscount(comboOptions.slice(optionIndex), comboLength - 1);
            // Concatenate currentOption with all combinations of smaller size.
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });
        return combos;
    }
    static withoutDiscount(comboOptions, comboLength) {
        // If the length of the combination is 1 then each element of the original array
        // is a combination itself.
        if (comboLength === 1) {
            return comboOptions.map((comboOption) => [comboOption]);
        }
        // Init combinations array.
        const combos = [];
        // Extract characters one by one and concatenate them to combinations of smaller lengths.
        // We need to extract them because we don't want to have repetitions after concatenation.
        comboOptions.forEach((currentOption, optionIndex) => {
            // Generate combinations of smaller size.
            const smallerCombos = this.withoutDiscount(comboOptions.slice(optionIndex + 1), comboLength - 1);
            // Concatenate currentOption with all combinations of smaller size.
            smallerCombos.forEach((smallerCombo) => {
                combos.push([currentOption].concat(smallerCombo));
            });
        });

        return combos;
    }
}
function PowerSet(originalSet) {
    const subSets = [];
    const numberOfCombinations = 2 ** originalSet.length;
    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
        const subSet = [];
        for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
            if (combinationIndex & (1 << setElementIndex)) {
                subSet.push(originalSet[setElementIndex]);
            }
        }
        subSets.push(subSet);
    }
    return subSets;
}
var subset = (...arr) => {
    let list = arange(0, 2 ** arr.length, 1);
    let bin = list.toBin.map((n) => n.padStart(arr.length, 0)).map((n) => n.split("").map((n) => +n));
    let sub = bin.map((n) => n.map((m, i) => (arr[i])));
    for (let i = 0; i < sub.length; i++) for (let j = 0; j < sub[i].length; j++) sub[i][j] = { n: sub[i][j], m: bin[i][j] };
    sub = sub.map((n) => n.filter((x) => x.m == 1));
    sub = sub.map((n) => n.map((m) => m.n));
    return sub;
};
var Discret={
    Logic: Logic$1,
    Base,
    Permutation,
    Combinaison,
    PowerSet,
    subset
};

class Random {
    static rand(a = 1, b) {
        return b ? Math.random() * (b - a) + a : a * Math.random();
    }
    static randInt(a, b) {
        return Math.floor(Random.rand(a, b));
    }
    static get randBin() {
        return Random.randInt(2);
    }
    static get randOct() {
        return Random.randInt(8);
    }
    static get randHex() {
        return Random.randInt(16);
    }
    static choice(choices = [1, 2, 3], p = new Array(choices.length).fill(1 / choices.length)) {
        let newchoice = new Array(100);
        p=Utils.accum(...p).map(n=>n*100);
        newchoice.fill(choices[0], 0, p[0]);
        for (let i = 1; i < choices.length; i++) newchoice.fill(choices[i], p[i - 1], p[i]);
        return newchoice[Random.randInt(newchoice.length - 1)];
    }
    static shuffle(arr){
        return arr.sort(()=>0.5-Math.random())
    }
    static rands(n, a, b) {
        return new Array(n).fill(0).map(() => Random.rand(a, b));
    }
    static randsInt(n, a, b) {
        return new Array(n).fill(0).map(() => Random.randInt(a, b));
    }
    static randsBin(n) {
        return new Array(n).fill(0).map(() => Random.randInt(2));
    }
    static randsOct(n) {
        return new Array(n).fill(0).map(() => Random.randInt(8));
    }
    static randsHex(n) {
        return new Array(n).fill(0).map(() => Random.randInt(16));
    }
    static choices(n, choices, p) {
        return new Array(n).fill(0).map(() => Random.choice(choices, p));
    }
    static permutation(...arr) {
        return arr.permS[Random.randInt(arr.length)];
    }
    static get randomColor() {
        return "#" + Base.dec2hex(Random.rand(16777216)).padStart(6,0);
    }
    static randComplex(a = 0, b = 1) {
        return new Complex(...Random.rands(2, a, b));
    }
    static randIntComplex(a = 0, b = 1) {
        return new Complex(...Random.randsInt(2, a, b));
    }
    static get randBinComplex() {
        return new Complex(...Random.randsBin(2));
    }
    static get randOctComplex() {
        return new Complex(...Random.randsOct(2));
    }
    static get randHexComplex() {
        return new Complex(...Random.randsOct(2));
    }
    static randsComplex(n, a = 0, b = 1) {
        return new Array(n).fill(0).map(() => Random.randComplex(a, b));
    }
    static randsIntComplex(n, a = 0, b = 1) {
        return new Array(n).fill(0).map(() => Random.randIntComplex(a, b));
    }
    static randsBinComplex(n) {
        return new Array(n).fill(0).map(() => Random.randBinComplex);
    }
    static randsOctComplex(n) {
        return new Array(n).fill(0).map(() => Random.randOctComplex);
    }
    static randsHexComplex(n) {
        return new Array(n).fill(0).map(() => Random.randHexComplex);
    }
}

//import { Logic } from "./Discret/index.js"
//import Math from "./index.js";
class Matrix extends AbstractZikoMath{
    constructor(rows, cols, element = []) {
        super();
        if(rows instanceof Matrix){
            this.arr=rows.arr;
            this.rows=rows.rows;
            this.cols=rows.cols;
        }
        else {
        let arr = [],
            i,
            j;
        if (arguments[0] instanceof Array) {
            rows = arguments[0].length;
            cols = arguments[0][0].length;
            arr = arguments[0];
        } else {
            for (i = 0; i < rows; i++) {
                arr.push([]);
                arr[i].push(new Array(cols));
                for (j = 0; j < cols; j++) {
                    arr[i][j] = element[i * cols + j];
                    if (element[i * cols + j] == undefined) arr[i][j] = 0;
                }
            }
        }
        this.rows = rows;
        this.cols = cols;
        this.arr = arr;   
    }
    this._maintain();
        //Object.seal(this);
    }
    at(i=0,j=undefined){
        if(i<0)i=this.rows+i;
        if(j==undefined) return this.arr[i];
        if(j<0)j=this.cols+j;
        return this.arr[i][j];
    }
    reshape(newRows, newCols) {
        let check = newRows * newCols === this.rows * this.cols;
        if (check) return new Matrix(newRows, newCols, this.arr.flat(1));
        else console.error("Err");
    }
    static eye(size) {
        let result = new Matrix(size, size);
        for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) i === j ? (result.arr[i][j] = 1) : (result.arr[i][j] = 0);
        return result;
    }
    get clone() {
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    get size() {
        return this.rows * this.cols;
    } 
    get shape() {
        return [this.rows, this.cols];
    }
    get reel() {
        return new Matrix(this.cols, this.rows, this.arr.flat(1).reel);
    }
    get imag() {
        return new Matrix(this.cols, this.rows, this.arr.flat(1).imag);
    }
    _maintain(){
        for(let i=0;i<this.arr.length;i++)Object.assign(this,{[[i]]:this.arr[i]});
        return this;
    }
    get(row = 0, col = 0) {
        if (col == -1) return this.arr[row];
        else if (row == -1) return this.arr.map((n) => n[col]);
        else return this.arr[row][col];
    }
    set(row = 0, col = 0, value) {
        if (col == -1) return (this.arr[row] = value);
        else if (row == -1) {
            for (let i = 0; i < this.cols; i++) {
                this.arr[i][col] = value[i] || 0;
            }
            return this.arr;
        }
        return (this.arr[row][col] = value);
    }
    get isSquare() {
        return this.rows / this.cols === 1;
    }
    get isSym() {
        if (!this.isSquare) return false;
        const T = this.T;
        const M = this.clone;
        return Matrix.sub(M, T).max == 0 && Matrix.sub(M, T).min == 0;
    }
    get isAntiSym() {
        if (!this.isSquare) return false;
        const T = this.T;
        const M = this.clone;
        return Matrix.add(M, T).max == 0 && Matrix.add(M, T).min == 0;
    }
    get isDiag() {
        if (!this.isSquare) return false;
        const T = this.T;
        const M = this.clone;
        const MT = Matrix.mul(M, T);
        const TM = Matrix.dot(T, M);
        return Matrix.sub(MT, TM).max == 0 && Matrix.sub(MT, TM).min == 0;
    }
    get isOrtho() {
        if (!this.isSquare) return false;
        return this.isDiag && (this.det == 1 || this.det == -1);
    }
    get isIdemp() {
        if (!this.isSquare) return false;
        const M = this.clone;
        const MM = Matrix.dot(M, M);
        return Matrix.sub(MM, M).max == 0 && Matrix.sub(MM, M).min == 0;
    }
    get T() {
        let transpose = [];
        for (let i = 0; i < this.arr[0].length; i++) {
            transpose[i] = [];
            for (let j = 0; j < this.arr.length; j++) {
                transpose[i][j] = this.arr[j][i];
            }
        }
        return new Matrix(this.cols, this.rows, transpose.flat(1));
    }
    get det() {
        if (!this.isSquare) return new Error("is not square matrix");
        if (this.rows == 1) return this.arr[0][0];
        function determinat(M) {
            if (M.length == 2) {
                if (M.flat(1).some((n) => n instanceof Matrix)) {
                    console.warn("Tensors are not completely supported yet ...");
                    return;
                }
                return Utils.sub(Utils.mul(M[0][0],M[1][1]),Utils.mul(M[0][1],M[1][0]))
            }
            var answer = 0;
            for (var i = 0; i < M.length; i++) {
                //console.log(M[0][i]);
                /*answer = answer.add(
                    pow(-1, i)
                        .mul(M[0][i])
                        .mul(determinat(deleteRowAndColumn(M, i)))
                );*/
                //const to_be_added=Utils.add(Utils.mul(pow(-1, i),Utils.mul(M[0][i],determinat(deleteRowAndColumn(M, i)))));
                const to_be_added=Utils.add(Utils.mul(pow(-1, i),Utils.mul(M[0][i],determinat(deleteRowAndColumn(M, i)))));
                answer=Utils.add(answer,to_be_added);
            }
            return answer;
        }
        function deleteRowAndColumn(M, index) {
            var temp = [];
            for (let i = 0; i < M.length; i++) temp.push(M[i].slice(0));
            temp.splice(0, 1);
            for (let i = 0; i < temp.length; i++) temp[i].splice(index, 1);
            return temp;
        }
        return determinat(this.arr);
    }
    get inv() {
        if (!this.isSquare) return new Error("is not square matrix");
        if (this.det === 0) return "determinat = 0 !!!";
        let A = InverseMatrixe(this.arr);
        return new Matrix(this.rows, this.cols, A.flat(1));
    }
    static zeros(rows, cols) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) for (var j = 0; j < cols; j++) result.arr[i][j] = 0;
        return result;
    }
    static ones(rows, cols) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = 1;
        return result;
    }
    static numbers(rows, cols, number) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = number;
        return result;
    }
    static get rand(){
        return {
            int:(rows, cols, a, b)=>{
                let result = new Matrix(rows, cols);
                for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randInt(a, b);
                return result;
            },
            bin:(rows,cols)=>{
                let result = new Matrix(rows, cols);
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randBin;
                }
                return result;       
            },
            hex:(rows,cols)=>{
                let result = new Matrix(rows, cols);
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randHex;
                }
                return result;       
            },
            choices:(rows, cols, choices, p)=>{
                let result = new Matrix(rows, cols);
                for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.choice(choices, p);
                return result
            },
            permutation:(rows,cols,arr)=>{
                //return new Matrix(rows, cols, Random.permutation(...arr))
            }
        }
    }
    static rands(rows, cols, a = 1, b) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.rand(a, b);
        return result;
    }
    /*static randsInt(rows, cols, a, b) {
    }
    static randsBin(rows, cols) {
    }
    static randsHex(rows, cols) {
    }
    static randsChoices(rows, cols, choices, p) {
    }
    static randPermutation(rows, cols, arr) {
        return new Matrix(rows, cols, Random.permutation(...arr));
    }*/
    /*map(fct) {
        var array = this.arr.flat(1);
        return new Matrix(
            this.rows,
            this.cols,
            array.map((n) => fct(n))
        );
    }
    static map(m, fct) {
        var array = m.arr.flat(1);
        return new Matrix(
            m.rows,
            m.cols,
            array.map((n) => fct(n))
        );
    }*/
    map(Imin, Imax, Fmin, Fmax) {
        return Utils.map(this, Imin, Imax, Fmin, Fmax);
    }
    lerp(min, max) {
        return Utils.lerp(this, min, max);
    }
    norm(min, max) {
        return Utils.norm(this, min, max);
    }
    clamp(min, max) {
        return Utils.clamp(this, min, max);
    }
    static map(matrix, Imin, Imax, Fmin, Fmax) {
        return Utils.map(matrix, Imin, Imax, Fmin, Fmax);
    }
    static lerp(matrix, min, max) {
        return Utils.lerp(matrix, min, max);
    }
    static norm(matrix, min, max) {
        return Utils.norm(matrix, min, max);
    }
    static clamp(m, min, max) {
        return Utils.clamp(matrix, min, max);
    }
    toPrecision(p) {
        for (let i = 0; i < this.cols; i++) for (let j = 0; j < this.rows; j++) this.arr[i][j] = +this.arr[i][j].toPrecision(p);
        return this;
    }
    get toBin() {
        let newArr = this.arr.flat(1).toBin;
        return new Matrix(this.rows, this.cols, newArr);
    }
    get toOct() {
        let newArr = this.arr.flat(1).toOct;
        return new Matrix(this.rows, this.cols, newArr);
    }
    get toHex() {
        let newArr = this.arr.flat(1).toHex;
        return new Matrix(this.rows, this.cols, newArr);
    }
    /*get isOdd() {
        let newArr = this.arr.flat(1).isOdd;
        return new Matrix(this.rows, this.cols, newArr);
    }*/
    max2min() {
        let newArr = this.arr.flat(1).max2min;
        return new Matrix(this.rows, this.cols, newArr);
    }
    min2max() {
        let newArr = this.arr.flat(1).min2max;
        return new Matrix(this.rows, this.cols, newArr);
    }
    sortRows(calback=undefined){
        let newArr=this.arr.map(n=>n.sort(calback)).flat(1);
        return new Matrix(this.rows, this.cols, newArr);           
    }
    sortCols(calback=undefined){
        let m=this.T;
        let newArr=m.arr.map(n=>n.sort(calback)).flat(1);
        return new Matrix(this.rows, this.cols, newArr).T;           
    }
    filterByRows(item){
        var truth=this.arr.map(n=>n.map(m=>+(""+m).includes(item)));
        var mask=truth.map(n=>!!Logic.or(...n));
        var filtredArray=this.arr.filter((n,i)=>mask[i]===true);
        if(filtredArray.length===0)filtredArray.push([]);
        console.log(filtredArray);
        return new Matrix(filtredArray)
    }
    filterByCols(item){
        return new Matrix(this.T.arr.filter(n=>n.includes(item)))
    }
    sortAll(calback=undefined){
        let newArr=this.arr.flat(1).sort(calback);
        return new Matrix(this.rows, this.cols, newArr);         
    }
    count(n) {
        return this.arr.flat(1).count(n);
    }
    toBase(n) {
        let newArr = this.arr.flat(1).toBase(n);
        return new Matrix(this.rows, this.cols, newArr);
    }
    #hstack(matrix){
        if (this.rows !== matrix.rows) return;
        let newArr = this.arr;
        for (let i = 0; i < this.rows; i++) for (let j = this.cols; j < this.cols + matrix.cols; j++) newArr[i][j] = matrix.arr[i][j - this.cols];
        this.cols += matrix.cols;
        return new Matrix(this.rows, this.cols, newArr.flat(1));
    }
    hstack(...matrices) {
        const M=[this,...matrices].reduce((a,b)=>a.#hstack(b));
        Object.assign(this,M);
        return this;
    }
    static hstack(matrix,...matrices) {
        return matrix.clone.hstack(...matrices);
    }
    #vstack(matrix) {
        if (this.cols !== matrix.cols) return;
        let newArr = this.arr;
        for (let i = this.rows; i < this.rows + matrix.rows; i++) {
            newArr[i] = [];
            for (let j = 0; j < this.cols; j++) newArr[i][j] = matrix.arr[i - this.rows][j];
        }
        this.rows += matrix.rows;
        return new Matrix(this.rows, this.cols, newArr.flat(1));
    }
    vstack(...matrices) {
        const M=[this,...matrices].reduce((a,b)=>a.#vstack(b));
        Object.assign(this,M);
        return this;
    }
    static vstack(matrix,...matrices) {
        return matrix.clone.vstack(...matrices);
    }
    hqueue(...matrices){
        const M=[this,...matrices].reverse().reduce((a,b)=>a.#hstack(b));
        Object.assign(this,M);
        return this;
    }
    vqueue(...matrices){
        const M=[this,...matrices].reverse().reduce((a,b)=>a.#vstack(b));
        Object.assign(this,M);
        return this;
    }
    static hqueue(matrix,...matrices) {
        return matrix.clone.hqueue(...matrices);
    }
    static vqueue(matrix,...matrices) {
        return matrix.clone.vqueue(...matrices);
    }
    slice(r0=0, c0=0, r1=this.rows-1, c1=this.cols-1) {
        let newRow = r1 - r0,
            newCol = c1 - c0;
        let newArr = new Array(newCol);
        for (let i = 0; i < newRow; i++) {
            newArr[i] = [];
            for (let j = 0; j < newCol; j++) newArr[i][j] = this.arr[i + r0][j + c0];
        }
        return new Matrix(newRow, newCol, newArr.flat(1));
    }
    static slice(m1,r0=0, c0=0, r1=this.rows-1, c1=this.cols-1) {
        return m1.slice(r0, c0, r1, c1);
    }
    getRows(ri, rf = ri + 1) {
        return this.slice(ri, 0, rf, this.cols);
    }
    getCols(ci, cf = ci + 1) {
        return this.slice(0, ci, this.rows, cf);
    }
    static getRows(m, ri, rf = ri + 1) {
        return m.slice(ri, 0, rf, m.cols);
    }
    static getCols(m, ci, cf = ci + 1) {
        return m.slice(0, ci, m.rows, cf);
    }
    add(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number"||matr[k] instanceof Math.Complex) matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.add(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    sub(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.sub(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    static add(m1, ...m2) {
        return m1.clone.add(...m2);
    }
    static sub(m1, ...m2) {
        return m1.clone.sub(...m2);
    }
    mul(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
            for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.mul(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    div(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.div(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    static div(m1, ...m2) {
        return m1.clone.div(...m2);
    }
    static mul(m1, ...m2) {
        return m1.clone.mul(...m2);
    }
    modulo(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)this.arr[i][j]=Utils.modulo(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    static modulo(m1, ...m2) {
        return m1.clone.modulo(...m2);
    }
    dot(matrix) {
        var res = [];
        for (var i = 0; i < this.arr.length; i++) {
            res[i] = [];
            for (var j = 0; j < matrix.arr[0].length; j++) {
                res[i][j] = 0;
                for (var k = 0; k < this.arr[0].length; k++) {
                    res[i][j] = res[i][j].add(this.arr[i][k].mul(matrix.arr[k][j]));
                }
            }
        }
        return new Matrix(this.arr.length, matrix.arr[0].length, res.flat(1));
    }
    static dot(matrix1, matrix2) {
        return matrix1.dot(matrix2);
    }
    pow(n) {
        let a = this.clone,
            p = this.clone;
        for (let i = 0; i < n - 1; i++) p = p.dot(a);
        return p;
    }
    static pow(m, n) {
        return m.clone.pow(n);
    }
    get somme() {
        let S = 0;
        for (let i = 0; i < this.rows; i++) for (let j = 0; j < this.cols; j++) S += this.arr[i][j];
        return S;
    }
    get DoesItContainComplexNumbers() {
        return this.arr.flat(Infinity).some((n) => n instanceof Complex);
    }
    get min() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        let minRow = [];
        for (let i = 0; i < this.rows; i++) minRow.push(min$1(...this.arr[i]));
        return min$1(...minRow);
    }
    get max() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) maxRow.push(max$1(...this.arr[i]));
        return max$1(...maxRow);
    }
    get minRows() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        let minRow = [];
        for (let i = 0; i < this.rows; i++) minRow.push(min$1(...this.arr[i]));
        return minRow;
    }
    get maxRows() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) maxRow.push(max$1(...this.arr[i]));
        return maxRow;
    }
    get minCols() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        return this.T.minRows;
    }
    get maxCols() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        return this.T.maxRows;
    }
    static fromVector(v) {
        return new Matrix(v.length, 1, v);
    }
    get toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.arr[i][j]);
            }
        }
        return arr;
    }
    get print() {
        //"pretty print" the matrix
        let fstring = "[";
        for (let i = 0; i < this.arr.length; i++) {
            fstring += (i != 0 ? " " : "") + ` [${this.arr[i].map((n) => " " + n.toString() + " ")}],\n`;
        }
        console.log(fstring.substring(0, fstring.length - 2) + " ]");
        document.write(fstring.substring(0, fstring.length - 2) + " ]");
    }
    get table() {
        console.table(this.arr);
    }
    get serialize() {
        return JSON.stringify(this);
    }
    static deserialize(data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        let matrix = new Matrix(data.rows, data.cols);
        matrix.arr = data.arr;
        return matrix;
    }
    toTable() {
        var table = new DocumentFragment();
        var Tr = new Array(this.rows).fill(null).map(() => document.createElement("tr"));
        var Td = this.arr.map((n) => n.map(() => document.createElement("td")));
        for (let i = 0; i < Td.length; i++) {
            for (let j = 0; j < Td[0].length; j++) {
                Td[i][j].innerHTML = this.arr[i][j];
                Tr[i].appendChild(Td[i][j]);
            }
        }
        Tr.map((n) => table.appendChild(n));
        return table;
    }
    toGrid(element, style = {}) {
        let a = Grid();
        a.append(
            ...this.map(element)
                .arr.flat(1)
                .map((n) => n.style(style))
        );
        a.Columns(this.cols);
        return a;
    }
    sortTable(n=0,{type="num",order="asc"}={}) {
        var obj=this.T.arr.map(n=>n.map((n,i)=>Object.assign({},{x:n,y:i})));
        var newObj=this.T.arr.map(n=>n.map((n,i)=>Object.assign({},{x:n,y:i})));
        if(type==="num"){
            if(order==="asc")obj[n].sort((a,b)=>a.x-b.x);
            else if(order==="desc")obj[n].sort((a,b)=>b.x-a.x);
            else if(order==="toggle"){
               // console.log(obj[n][0])
                //console.log(obj[n][1])
                if(obj[n][0].x>obj[n][1].x)obj[n].sort((a,b)=>b.x-a.x);
                else obj[n].sort((a,b)=>a.x-b.x);
            }
        }
        else if(type==="alpha"){
            if(order==="asc")obj[n].sort((a,b)=>(""+a.x).localeCompare(""+b.x));
            else if(order==="desc")obj[n].sort((a,b)=>(""+b.x).localeCompare(""+a.x));            
        }
        //var order=obj[n].map(n=>n.y);
        order=obj[n].map(n=>n.y);
        for(let i=0;i<obj.length;i++){
            if(i!==n)obj[i].map((n,j)=>n.y=order[j]);
        }
        for(let i=0;i<obj.length;i++){
            if(i!==n)newObj[i].map((n,j)=>n.x=obj[i][order[j]].x);
        }
        newObj[n]=obj[n];
        var newArr=newObj.map(n=>n.map(m=>m.x));
        return new Matrix(newArr).T;
    }
}

function InverseMatrixe(M) {
    if (M.length !== M[0].length) {
        return;
    }
    var i = 0,
        ii = 0,
        j = 0,
        dim = M.length,
        e = 0;
        //t = 0;
    var I = [],
        C = [];
    for (i = 0; i < dim; i += 1) {
        I[I.length] = [];
        C[C.length] = [];
        for (j = 0; j < dim; j += 1) {
            if (i == j) {
                I[i][j] = 1;
            } else {
                I[i][j] = 0;
            }
            C[i][j] = M[i][j];
        }
    }
    for (i = 0; i < dim; i += 1) {
        e = C[i][i];
        if (e == 0) {
            for (ii = i + 1; ii < dim; ii += 1) {
                if (C[ii][i] != 0) {
                    for (j = 0; j < dim; j++) {
                        e = C[i][j];
                        C[i][j] = C[ii][j];
                        C[ii][j] = e;
                        e = I[i][j];
                        I[i][j] = I[ii][j];
                        I[ii][j] = e;
                    }
                    break;
                }
            }
            e = C[i][i];
            if (e == 0) {
                return;
            }
        }
        for (j = 0; j < dim; j++) {
            C[i][j] = C[i][j] / e;
            I[i][j] = I[i][j] / e;
        }
        for (ii = 0; ii < dim; ii++) {
            if (ii == i) {
                continue;
            }
            e = C[ii][i];
            for (j = 0; j < dim; j++) {
                C[ii][j] -= e * C[i][j];
                I[ii][j] -= e * I[i][j];
            }
        }
    }
    return I;
}

class LinearSystem {
    static resolve(A, B) {
        return A.inv
            .dot(Matrix.fromVector(B))
            .arr.flat(1)
            .map((n) => +n.toFixed(10));
    }
}
var matrix=(r, c, element)=>new Matrix(r, c, element);
var matrix2=(...element)=>new Matrix(2, 2, element);
var matrix3=(...element)=>new Matrix(3, 3, element);
var matrix4=(...element)=>new Matrix(4, 4, element);

const mapFun=(fun,...X)=>{
    const Y=X.map(x=>{
        if(x===null)return fun(null);
        if(["number","string","boolean","bigint","undefined"].includes(typeof x))return fun(x);
        if(x instanceof Array)return x.map(n=>mapFun(fun,n));
        if(ArrayBuffer.isView(x))return x.map(n=>fun(n));
        if(x instanceof Set)return new Set(mapFun(fun,...[...x]));
        if(x instanceof Map)return new Map([...x].map(n=>[n[0],mapFun(fun,n[1])]));
        if(x instanceof Matrix){
            return new Matrix(x.rows,x.cols,mapFun(x.arr.flat(1)))
        }
        if(x instanceof Complex){
            const [a,b,z,phi]=[x.a,x.b,x.z,x.phi];
            switch(fun){
                case Math.log:return complex(ln(z),phi);
                case Math.exp:return complex(e(a)*cos(b),e(a)*sin(b));
                case Math.abs:return z;
                case Math.sqrt:return complex(sqrt(z)*cos(phi/2),sqrt(z)*sin(phi/2));
                case Math.cos:return complex(cos(a)*cosh(b),-(sin(a)*sinh(b)));
                case Math.sin:return complex(sin(a)*cosh(b),cos(a)*sinh(b));
                case Math.tan:{
                    const DEN=cos(2*a)+cosh(2*b);
                    return complex(sin(2*a)/DEN,sinh(2*b)/DEN);
                }
                case Math.cosh:return complex(cosh(a)*cos(b),sinh(a)*sin(b));
                case Math.sinh:return complex(sinh(a)*cos(b),cosh(a)*sin(b));
                case Math.tanh:{
                    const DEN=cosh(2*a)+cos(2*b);
                    return complex(sinh(2*a)/DEN,sin(2*b)/DEN)
                }
                //default : return fun(x)
            }
        }
        if(x instanceof Object)return Object.fromEntries(Object.entries(x).map(n=>n=[n[0],mapFun(fun,n[1])]))

    });
   return Y.length==1?Y[0]:Y; 
};

//import ZikoMath from "./index.js"
//import{Matrix} from "../Matrix/index.js"
//import{complex, Complex} from "./Complex.js"
// var a=complex(1,1)
// console.log(a instanceof Complex)
//mapArgs=(fun,...args1)=>(...args2)=>new Array(args1.length).fill(null).map((n,i)=>fun(args1[i],args2[i]))

function abs(...x){
    return mapFun(Math.abs,...x);
}
function sqrt(...x){
    return mapFun(Math.sqrt,...x);
}
function pow(...x){
    //return n=>mapFun(a=>Math.pow(a,n),...x)
    const n=x.pop();
    return mapFun(a=>Math.pow(a,n),...x)
}
function sqrtn(...x){
    const n=x.pop();
    return mapFun(a=>e(ln(a) / n),...x)
}
function e(...x){
    return mapFun(Math.exp,...x);
}
function ln(...x){
    return mapFun(Math.log,...x);
}
function cos(...x){
    return mapFun(a=>+Math.cos(a).toFixed(15),...x);
}
function sin(...x){
    return mapFun(a=>+Math.sin(a).toFixed(15),...x);
}
function tan(...x){
    return mapFun(a=>+Math.tan(a).toFixed(15),...x);
}
function sec(...x){
    return mapFun(a=>+1/Math.cos(a).toFixed(15),...x);
}
function csc(...x){
    return mapFun(a=>+1/Math.sin(a).toFixed(15),...x);
}
function cot(...x){
    return mapFun(a=>+1/Math.tan(a).toFixed(15),...x);
}
function acos(...x){
    return mapFun(a=>+Math.acos(a).toFixed(15),...x);
}
function asin(...x){
    return mapFun(a=>+Math.asin(a).toFixed(15),...x);
}
function atan(...x){
    return mapFun(a=>+Math.atan(a).toFixed(15),...x);
}
function acot(...x){
    return mapFun(a=>+Math.PI/2-Math.atan(a).toFixed(15),...x);
}
function cosh(...x){
    return mapFun(a=>+Math.cosh(a).toFixed(15),...x);
}
function sinh(...x){
    return mapFun(a=>+Math.sinh(a).toFixed(15),...x);
}
function tanh(...x){
    return mapFun(a=>+Math.tanh(a).toFixed(15),...x);
}
function coth(...x){
    return mapFun(n=>+(1/2*Math.log((1+n)/(1-n))).toFixed(15),...x);
}
function acosh(...x){
    return mapFun(a=>+Math.acosh(a).toFixed(15),...x);
}
function asinh(...x){
    return mapFun(a=>+Math.asinh(a).toFixed(15),...x);
}
function atanh(...x){
    return mapFun(a=>+Math.atanh(a).toFixed(15),...x);
}
function ceil(...x){
    return mapFun(Math.ceil,...x);
}
function floor(...x){
    return mapFun(Math.floor,...x);
}
function round(...x){
    return mapFun(Math.round,...x);
}
function atan2(...x){
    const n=x.pop();
    return mapFun(a=>Math.atan2(a,n),...x)
}
function fact(...x){
    return mapFun(n=> {
        let i,
        y = 1;
        if (n == 0) y = 1;
        else if (n > 0) for (i = 1; i <= n; i++) y *= i;
        else y = NaN;
        return y;
    },...x);
} 
function sign(...x){
    return mapFun(Math.sign,...x);
}
function sig(...x){
    return mapFun(n=>1/(1+e(-n)),...x);
}


var min$1 = (...x) => Math.min(...x);
var max$1 = (...x) => Math.max(...x);
var hypot = Math.hypot;

//import Ziko from "../index.js"
const Math$1={
    PI,
    E,
    EPSILON,
    Random,
    complex,
    Complex,
    Matrix,
    LinearSystem,
    matrix,
    matrix2,
    matrix3,
    matrix4,
    cos,
    sin,
    tan,
    sec,
    csc,
    cot,
    abs,
    sqrt,
    pow,
    sqrtn,
    e,
    ln,
    acos,
    asin,
    atan,
    acot,
    cosh,
    sinh,
    tanh,
    coth,
    acosh,
    asinh,
    atanh,
    min: min$1,
    max: max$1,
    sign,
    floor,
    ceil,
    round,
    fact,
    hypot,
    sig,
    atan2,
   // Derivation,
    Utils,
    numbers,
    zeros,
    ones,
    sum,
    prod,
    add,
    mul,
    div,
    sub,
    modulo,
    rad2deg,
    deg2rad,
    arange,
    linspace,
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    aproximatelyEqual,
    cartesianProduct,
    Discret,
    Logic: Logic$1,
    Base,
    Permutation,
    Combinaison,
    PowerSet,
    subset,
    Signal,
    /*ExtractAll:function(){
            for (let i = 0; i < Object.keys(Ziko.Math).length; i++) {
                globalThis[Object.keys(Ziko.Math)[i]] = Object.values(Ziko.Math)[i];
        }
        return this;
    },
    RemoveAll:function(){
            for (let i = 0; i < Object.keys(Ziko.Math).length; i++) delete globalThis[Object.keys(Ziko.Math)[i]];   
        return this;
    }*/
};

const Ziko={
    Math: Math$1
};
Ziko.Math.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Math).length; i++) {
        globalThis[Object.keys(Ziko.Math)[i]] = Object.values(Ziko.Math)[i];
    }
    return this;
};
Ziko.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Math).length; i++) delete globalThis[Object.keys(Ziko.Math)[i]];   
    return this;
};

module.exports = Ziko;
