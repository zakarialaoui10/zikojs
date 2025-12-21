import {
    add,
    sub, 
    mul, 
    div,
    modulo
} from '../functions/arithmetic/index.js'
import {
    map,
    lerp, 
    clamp, 
    norm 
} from '../functions/utils/index.js'
import { Complex } from "../complex/index.js";
import { arr2str } from "../../data/index.js";
import { 
    matrix_inverse,
    matrix_det,
    hstack,
    vstack
} from "./helpers/index.js";
import { mapfun } from '../functions/index.js';
import { Random } from '../random/index.js';
class Matrix{
    constructor(rows, cols, element = [] ) {
        if(rows instanceof Matrix){
            this.arr=rows.arr;
            this.rows=rows.rows;
            this.cols=rows.cols;
        }
        else {
        let arr = [], i, j;
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
    this.#maintain();
    }
    isMatrix(){
        return true
    }
    clone() {
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    toComplex(){
        this.arr = mapfun(
            x => x?.isComplex?.() ? x : new Complex(x, 0),
            ...this.arr
        )
        this.#maintain()
        return this;
    }
    [Symbol.iterator]() {
      return this.arr[Symbol.iterator]();
    }
    #maintain() {
        for (let i = 0; i < this.arr.length; i++) {
            Object.defineProperty(this, i, {
                value: this.arr[i],
                writable: true,
                configurable: true,
                enumerable: false 
            });
        }
    }
    get size() {
        return this.rows * this.cols;
    } 
    get shape() {
        return [this.rows, this.cols];
    }
    toString(){
        return arr2str(this.arr,false);
    }
    at(i = 0, j = undefined) {
        if (i < 0) i += this.rows;
        if (i < 0 || i >= this.rows) throw new Error('Row index out of bounds');
        if (j === undefined) return this.arr[i];
        if (j < 0) j += this.cols;
        if (j < 0 || j >= this.cols) throw new Error('Column index out of bounds');
        return this.arr[i][j];
    }
    slice(r0=0, c0=0, r1 = this.rows-1, c1 = this.cols-1) {
        if(r1 < 0) r1 = this.rows + r1
        if(c1 < 0 ) c1 = this.cols + c1
        let newRow = r1 - r0,
            newCol = c1 - c0;
        let newArr = new Array(newCol);
        for (let i = 0; i < newRow; i++) {
            newArr[i] = [];
            for (let j = 0; j < newCol; j++) 
                newArr[i][j] = this.arr[i + r0][j + c0];
        }
        return new Matrix(newRow, newCol, newArr.flat(1));
    }
    static slice(m1,r0=0, c0=0, r1=this.rows-1, c1=this.cols-1) {
        return m1.slice(r0, c0, r1, c1);
    }
    reshape(newRows, newCols) {
        if(!(newRows * newCols === this.rows * this.cols)) throw Error('size not matched')
        return new Matrix(newRows, newCols, this.arr.flat(1));
    }
    get T() {
        let transpose = [];
        for (let i = 0; i < this.arr[0].length; i++) {
            transpose[i] = [];
            for (let j = 0; j < this.arr.length; j++) 
                transpose[i][j] = this.arr[j][i];
        }
        return new Matrix(this.cols, this.rows, transpose.flat(1));
    }
    get det() {
        return matrix_det(this)
    }
    get inv() {
        return matrix_inverse(this)
    }
    // normalize names
    static eye(size) {
        let result = new Matrix(size, size);
        for (let i = 0; i < size; i++) 
            for (let j = 0; j < size; j++) i === j ? (result.arr[i][j] = 1) : (result.arr[i][j] = 0);
        return result;
    }
    static zeros(rows, cols) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) 
            for (var j = 0; j < cols; j++) result.arr[i][j] = 0;
        return result;
    }
    static ones(rows, cols) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) 
            for (let j = 0; j < cols; j++) result.arr[i][j] = 1;
        return result;
    }
    static nums(rows, cols, number) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) 
            for (let j = 0; j < cols; j++) result.arr[i][j] = number;
        return result;
    }
    static get random(){
        return {
            int : (r, c, a, b)=> new Matrix(
                r,
                c,
                Random.sample.int(r*c, a, b)
            ),
            float : (r, c, a,)=> new Matrix(
                r,
                c,
                Random.sample.float(r*c, a, b)
            ),
        }
    }
    hstack(...matrices) {
        const M=[this, ...matrices].reduce((a,b)=>hstack(a, b));
        Object.assign(this, M);
        this.#maintain();
        return this;
    }
    static hstack(matrix,...matrices) {
        return matrix.clone().hstack(...matrices);
    }
    vstack(...matrices){
        const M=[this, ...matrices].reduce((a,b)=>vstack(a, b));
        Object.assign(this, M);
        this.#maintain();
        return this;
    }
    static vstack(matrix,...matrices) {
        return matrix.clone().vstack(...matrices);
    }
    hqueue(...matrices){
        const M=[this, ...matrices].reverse().reduce((a,b)=>hstack(a, b));
        Object.assign(this, M)
        return this;
    }
    static hqueue(matrix,...matrices) {
        return matrix.clone().hqueue(...matrices);
    }
    vqueue(...matrices){
        const M=[this,...matrices].reverse().reduce((a, b)=>vstack(a, b));
        Object.assign(this, M)
        return this;
    }
    static vqueue(matrix,...matrices) {
        return matrix.clone().vqueue(...matrices);
    }
    shuffle(){
        const arr = this.arr.flat(1).sort(() => 0.5-Math.random())
        return new Matrix(
            this.rows, 
            this.cols,
            arr
        )
    }
    static shuffle(M){
        return M.clone().shuffle()
    }
    shuffleRows(){
        this.arr = this.arr.sort(() => 0.5-Math.random());
        return this;
    }
    static shuffleRows(M){
        return M.clone().shuffleRows()
    }
    
    shuffleCols(){
        this.arr = this.clone().T.arr.sort(() => 0.5-Math.random());
        return this.T
    }
    static shuffleCols(M){
        return M.clone().shuffleCols()
    }
    // Checkers
    get isSquare() {
        return this.rows === this.cols;
    }
    get isSym() {
        if (!this.isSquare) return false;
        for (let i = 0; i < this.rows; i++) {
            for (let j = i + 1; j < this.cols; j++) {
                if (this.arr[i][j] !== this.arr[j][i]) return false;
            }
        }
        return true;
    }
    get isAntiSym() {
        if (!this.isSquare) return false;
        const n = this.rows;
        for (let i = 0; i < n; i++) {
            if (this.arr[i][i] !== 0) return false;
            for (let j = i + 1; j < n; j++) {
                if (this.arr[i][j] !== -this.arr[j][i]) return false;
            }
        }
        return true;
    }
    get isDiag() {
        if (!this.isSquare) return false;
        const n = this.rows;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (this.arr[i][j] !== 0 || this.arr[j][i] !== 0) return false;
            }
        }
        return true;
    }
    get isOrtho() {
        if (!this.isSquare) return false;
        return this.isDiag && (this.det == 1 || this.det == -1);
    }
    get isIdemp() {
        if (!this.isSquare) return false;
        const n = this.rows;
        const A = this.arr;
        // Compute A * A
        const MM = [];
        for (let i = 0; i < n; i++) {
            MM[i] = [];
            for (let j = 0; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < n; k++) {
                    sum += A[i][k] * A[k][j];
                }
                MM[i][j] = sum;
            }
        }
        // Check if A * A == A
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (MM[i][j] !== A[i][j]) return false;
            }
        }
        return true;
    }

    get isUpperTri() {
        if (!this.isSquare) return false;
        const n = this.rows;
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (this.arr[i][j] !== 0) return false;
            }
        }
        return true;
    }
    get isLowerTri() {
        if (!this.isSquare) return false;
        const n = this.rows;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (this.arr[i][j] !== 0) return false;
            }
        }
        return true;
    }
    
    // static get rand(){
    //     return {
    //         int:(rows, cols, a, b)=>{
    //             let result = new Matrix(rows, cols);
    //             for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randInt(a, b);
    //             return result;
    //         },
    //         bin:(rows,cols)=>{
    //             let result = new Matrix(rows, cols);
    //             for (let i = 0; i < rows; i++) {
    //                 for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randBin;
    //             }
    //             return result;       
    //         },
    //         hex:(rows,cols)=>{
    //             let result = new Matrix(rows, cols);
    //             for (let i = 0; i < rows; i++) {
    //                 for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randHex;
    //             }
    //             return result;       
    //         },
    //         choices:(rows, cols, choices, p)=>{
    //             let result = new Matrix(rows, cols);
    //             for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.choice(choices, p);
    //             return result
    //         },
    //         permutation:(rows,cols,arr)=>{
    //             //return new Matrix(rows, cols, Random.permutation(...arr))
    //         }
    //     }
    // }
    // static rands(rows, cols, a = 1, b) {
    //     let result = new Matrix(rows, cols);
    //     for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.rand(a, b);
    //     return result;
    // }
    map(Imin, Imax, Fmin, Fmax) {
        this.arr = map(this.arr, Imin, Imax, Fmin, Fmax)
        return this;
    }
    lerp(min, max) {
        this.arr = lerp(this.arr, min, max)
        return this;
    }
    norm(min, max) {
        this.arr = norm(this.arr, min, max)
        return this;
    }
    clamp(min, max) {
        this.arr = clamp(this.arr, min, max)
        return this;
    }
    static map(M, Imin, Imax, Fmin, Fmax) {
        return M.clone().map(Imin, Imax, Fmin, Fmax)
    }
    static lerp(M, min, max) {
        return M.clone().lerp(min, max)
    }
    static norm(M, min, max) {
        return M.clone().norm(min, max)
    }
    static clamp(M, min, max) {
        return M.clone().clamp(min, max)
    }
    toPrecision(p) {
        for (let i = 0; i < this.cols; i++) 
            for (let j = 0; j < this.rows; j++) 
                this.arr[i][j] = +this.arr[i][j].toPrecision(p);
        return this;
    }
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
        var truth=this.arr.map(n=>n.map(m=>+(""+m).includes(item)))
        var mask=truth.map(n=>!!Logic.or(...n))
        var filtredArray=this.arr.filter((n,i)=>mask[i]===true)
        if(filtredArray.length===0)filtredArray.push([])
        console.log(filtredArray)
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
    // toBase(n) {
    //     let newArr = this.arr.flat(1).toBase(n);
    //     return new Matrix(this.rows, this.cols, newArr);
    // }
    
    splice(r0,c0,deleteCount,...items){
        
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
            if (typeof matr[k] == "number"||matr[k] instanceof Complex) matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = add(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    sub(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = sub(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    static add(m1, ...m2) {
        return m1.clone().add(...m2);
    }
    static sub(m1, ...m2) {
        return m1.clone().sub(...m2);
    }
    mul(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
            for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = mul(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    div(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = div(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    static div(m1, ...m2) {
        return m1.clone().div(...m2);
    }
    static mul(m1, ...m2) {
        return m1.clone().mul(...m2);
    }
    modulo(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) 
                for (var j = 0; j < this.cols; j++)
                    this.arr[i][j]=modulo(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    static modulo(m1, ...m2) {
        return m1.clone().modulo(...m2);
    }
    dot(matrix) {
        var res = [];
        for (var i = 0; i < this.arr.length; i++) {
            res[i] = [];
            for (var j = 0; j < matrix.arr[0].length; j++) {
                res[i][j] = 0;
                for (var k = 0; k < this.arr[0].length; k++) {
                    res[i][j] = add(
                        res[i][j],
                        mul(this.arr[i][k],matrix.arr[k][j])
                        )
                }
            }
        }
        return new Matrix(this.arr.length, matrix.arr[0].length, res.flat(1));
    }
    static dot(matrix1, matrix2) {
        return matrix1.dot(matrix2);
    }
    pow(n) {
        let a = this.clone(),
            p = this.clone();
        for (let i = 0; i < n - 1; i++) p = p.dot(a);
        return p;
    }
    static pow(m, n) {
        return m.clone().pow(n);
    }
    get somme() {
        let S = 0;
        for (let i = 0; i < this.rows; i++) 
            for (let j = 0; j < this.cols; j++) 
                S += this.arr[i][j];
        return S;
    }
    hasComplex(){
        return this.arr.flat(Infinity).some((n) => n instanceof Complex);
    }
    get min() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let minRow = [];
        for (let i = 0; i < this.rows; i++) minRow.push(min(...this.arr[i]));
        return min(...minRow);
    }
    get max() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) maxRow.push(max(...this.arr[i]));
        return max(...maxRow);
    }
    get minRows() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let minRow = [];
        for (let i = 0; i < this.rows; i++) minRow.push(min(...this.arr[i]));
        return minRow;
    }
    get maxRows() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) maxRow.push(max(...this.arr[i]));
        return maxRow;
    }
    get minCols() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        return this.T.minRows;
    }
    get maxCols() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
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
    get serialize() {
        return JSON.stringify(this);
    }
    static deserialize(data) {
        if (typeof data == "string") data = JSON.parse(data);
        let matrix = new Matrix(data.rows, data.cols);
        matrix.arr = data.arr;
        return matrix;
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
            if(i!==n)newObj[i].map((n,j)=>n.x=obj[i][order[j]].x)
        }
        newObj[n]=obj[n];
        var newArr=newObj.map(n=>n.map(m=>m.x));
        return new Matrix(newArr).T;
    }
}


/**
* @returns {Matrix}
*/
const matrix=(r, c, element)=>new Matrix(r, c, element);
const matrix2=(...element)=>new Matrix(2, 2, element);
const matrix3=(...element)=>new Matrix(3, 3, element);
const matrix4=(...element)=>new Matrix(4, 4, element);
export{Matrix,matrix,matrix2,matrix3,matrix4}