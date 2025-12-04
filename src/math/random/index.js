
import { Utils } from "../utils/index.js";
import{ Base } from "../discret/index.js"
class Random {
    static float(a = 1, b) {
        return b ? Math.random() * (b - a) + a : a * Math.random();
    }
    static int(a, b) {
        return Math.floor(this.float(a, b));
    }
    static char(upperCase){
        upperCase=upperCase??this.bool();
        const Char=String.fromCharCode(this.int(97,120));
        return upperCase?Char.toUpperCase():Char;
    }
    static bool(){
        return [false,true][Math.floor(Math.random()*2)];
    }
    static string(length,upperCase){
        return length instanceof Array?
            new Array(this.int(...length)).fill(0).map(() => this.char(upperCase)).join(""):
            new Array(length).fill(0).map(() => this.char(upperCase)).join("");
    }
    static bin() {
        return this.int(2);
    }
    static oct() {
        return this.int(8);
    }
    static dec() {
        return this.int(8);
    }
    static hex() {
        return this.int(16);
    }
    static choice(choices = [1, 2, 3], p = new Array(choices.length).fill(1 / choices.length)) {
        let newchoice = new Array(100);
        p=Utils.accum(...p).map(n=>n*100)
        newchoice.fill(choices[0], 0, p[0]);
        for (let i = 1; i < choices.length; i++) newchoice.fill(choices[i], p[i - 1], p[i]);
        return newchoice[this.int(newchoice.length - 1)];
    }
    static shuffleArr(arr){
        return arr.sort(()=>0.5-Math.random())    
    }
    static floats(n, a, b) {
        return new Array(n).fill(0).map(() => this.float(a, b));
    }
    static ints(n, a, b) {
        return new Array(n).fill(0).map(() => this.int(a, b));
    }
    static bools(n){
        return  new Array(n).fill(0).map(() => this.bool());
    }
    static bins(n) {
        return new Array(n).fill(0).map(() => this.int(2));
    }
    static octs(n) {
        return new Array(n).fill(0).map(() => this.int(8));
    }
    static decs(n) {
        return new Array(n).fill(0).map(() => this.int(10));
    }
    static hexs(n) {
        return new Array(n).fill(0).map(() => this.int(16));
    }
    static choices(n, choices, p) {
        return new Array(n).fill(0).map(() => this.choice(choices, p));
    }
    static perm(...arr) {
        // permutation
        return arr.permS[this.int(arr.length)];
    }
    static color() {
        return "#" + Base.dec2hex(this.float(16777216)).padStart(6,0);
    }
    static colors(n) {
        return new Array(n).fill(null).map(()=>this.color());
    }

    // Should be Moved to Matrix and Complex to avoid Circular dependencies
    // static complex(a = [0,1], b = [0,1]) {
    //     return a instanceof Array?
    //     new Complex(
    //         this.float(a[0], a[1]),
    //         this.float(b[0], b[1])
    //     ):
    //     new Complex(
    //         ...this.floats(2,a,b)
    //     )
        
    // }
    // static complexInt(a = [0,1], b = [0,1]) {
    //     return new Complex(
    //         this.int(a[0], a[1]),
    //         this.int(b[0], b[1])
    //         );
    // }
    // static complexBin() {
    //     return new Complex(...this.bins(2));
    // }
    // static complexOct() {
    //     return new Complex(...this.octs(2));
    // }
    // static complexDec() {
    //     return new Complex(...this.decs(10));
    // }
    // static complexHex() {
    //     return new Complex(...this.octs(2));
    // }
    // static complexes(n, a = 0, b = 1) {
    //     return new Array(n).fill(0).map(() => this.complex(a, b));
    // }
    // static complexesInt(n, a = 0, b = 1) {
    //     return new Array(n).fill(0).map(() => this.complexInt(a, b));
    // }
    // static complexesBin(n) {
    //     return new Array(n).fill(0).map(() => this.complexBin());
    // }
    // static complexesOct(n) {
    //     return new Array(n).fill(0).map(() => this.complexOct());
    // }
    // static complexesDec(n) {
    //     return new Array(n).fill(0).map(() => this.complexDec());
    // }
    // static complexesHex(n) {
    //     return new Array(n).fill(0).map(() => this.complexHex());
    // }
    // static matrix(r,c,min,max){
    //     return matrix(r,c,this.floats(r*c,min,max))
    // }
    // static matrixInt(r,c,min,max){
    //     return matrix(r,c,this.ints(r*c,min,max))
    // }
    // static matrixBin(r,c){
    //     return matrix(r,c,this.bins(r*c))
    // }
    // static matrixOct(r,c){
    //     return matrix(r,c,this.octs(r*c))
    // }
    // static matrixDec(r,c){
    //     return matrix(r,c,this.decs(r*c))
    // }
    // static matrixHex(r,c){
    //     return matrix(r,c,this.hex(r*c))
    // }
    // static matrixColor(r,c){
    //     return matrix(r,c,this.colors(r*c))
    // }
    // static matrixComplex(r,c,a,b){
    //     return matrix(r,c,this.complexes(r*c,a,b))
    // }
    // static matrixComplexInt(r,c,a,b){
    //     return matrix(r,c,this.complexesInt(r*c,a,b))
    // }
    // static matrixComplexBin(r,c){
    //     return matrix(r,c,this.complexesBin(r*c))
    // }
    // static matrixComplexOct(r,c){
    //     return matrix(r,c,this.complexesBin(r*c))
    // }
    // static matrixComplexDec(r,c){
    //     return matrix(r,c,this.complexesBin(r*c))
    // }
    // static matrixComplexHex(r,c){
    //     return matrix(r,c,this.complexesBin(r*c))
    // }
}
export{Random}