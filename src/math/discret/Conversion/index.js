import { Complex } from "../../complex/index.js";
import { Matrix } from "../../matrix/index.js";
const Base={
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
        base<=10?this._mode=Number:this._mode=String
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
        let e=2**(+("0b"+IEEE32.slice(1,9))-127)
        let m=IEEE32.slice(9,32).split("").map(n=>+n)
        let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
        let dec=(-1)**s*(1+M)*e;
        return dec
    },
    IEEE64toDec(Bin){
        let IEEE64=Bin.split(" ").join("").padEnd(64,"0");
        let s=IEEE64[0];
        let e=2**(+("0b"+IEEE64.slice(1,12))-1023)
        let m=IEEE64.slice(13,64).split("").map(n=>+n)
        let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
        let dec=(-1)**s*(1+M)*e;
        return dec;
    }
}

export{Base}