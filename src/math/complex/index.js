import{
    cos,
    sin,
    tan,
    pow,
    floor,
    hypot,
    cosh,
    sinh,
    sqrtn,
    atan2,
    sqrt,
    ln
  }from "../functions/index.js"
import { Matrix } from "../matrix/index.js";
import {sum,prod,deg2rad} from "../utils/index.js";
class Complex{
    constructor(a = 0, b = 0) {
        if(a instanceof Complex){
            this.a=a.a;
            this.b=a.b;
        }
        else if(typeof(a)==="object"){
            if(("a" in a && "b" in a)){
                this.a=a.a;
                this.b=a.b;
            }
            else if(("a" in a && "z" in a)){
                this.a=a.a;
                this.b=sqrt((a.z**2)-(a.a**2));
            }
            else if(("a" in a && "phi" in a)){
                this.a=a.a;
                this.b=a.a*tan(a.phi);
            }
            else if(("b" in a && "z" in a)){
                this.b=a.b;
                this.a=sqrt((a.z**2)-(a.b**2));
            }
            else if(("b" in a && "phi" in a)){
                this.b=b;
                this.a=a.b/tan(a.phi);
            }
            else if(("z" in a && "phi" in a)){
                this.a=a.z*cos(a.phi);
                this.a=a.z*sin(a.phi);
            }
        }
        else if(typeof(a)==="number"&&typeof(b)==="number"){
            this.a = +a.toFixed(32);
            this.b = +b.toFixed(32);
        }
    }
    isComplex(){
        return true
    }
    toString(){
        let str = "";
        if (this.a !== 0)
          this.b >= 0
            ? (str = `${this.a}+${this.b}*i`)
            : (str = `${this.a}-${Math.abs(this.b)}*i`);
        else
          this.b >= 0
            ? (str = `${this.b}*i`)
            : (str = `-${Math.abs(this.b)}*i`);
        return str;
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
    static Zero() {
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
        return new Complex(
            +(z * cos(phi)).toFixed(13), 
            +(z * sin(phi)).toFixed(13)
            );
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
}
const complex=(a,b)=>{
    if((a instanceof Array||ArrayBuffer.isView(a)) && (b instanceof Array||ArrayBuffer.isView(a)))return a.map((n,i)=>complex(a[i],b[i]));
    if(a instanceof Matrix && b instanceof Matrix){
        if((a.shape[0]!==b.shape[0])||(a.shape[1]!==b.shape[1]))return Error(0)
        const arr=a.arr.map((n,i)=>complex(a.arr[i],b.arr[i]))
        return new Matrix(a.rows,a.cols,...arr)
    }
    return new Complex(a,b)
}
export{complex,Complex}