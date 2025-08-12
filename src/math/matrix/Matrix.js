import ZikoMath from "../absract.js";
import{
    pow,
    min,
    max,
  } from "../functions/index.js"
import {Utils} from "../utils/index.js";
import {Complex } from "../complex/index.js";
import {Random} from "../random/index.js"
import { arr2str } from "../../data/index.js";
class Matrix extends ZikoMath{
    constructor(rows, cols, element = [] ) {
        super()
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
    this.#maintain();
        //Object.seal(this);
    }
    toString(){
        return arr2str(this.arr,false);
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
                answer=Utils.add(answer,to_be_added)
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
    static nums(rows, cols, number) {
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
        Object.assign(this,M)
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
        Object.assign(this,M)
        return this;
    }
    static vstack(matrix,...matrices) {
        return matrix.clone.vstack(...matrices);
    }
    hqueue(...matrices){
        const M=[this,...matrices].reverse().reduce((a,b)=>a.#hstack(b));
        Object.assign(this,M)
        return this;
    }
    vqueue(...matrices){
        const M=[this,...matrices].reverse().reduce((a,b)=>a.#vstack(b));
        Object.assign(this,M)
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
            for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.add(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    sub(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
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
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
            for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.mul(this.arr[i][j],matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    div(...matr) {
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
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
            if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
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
                    res[i][j] = Utils.add(
                        res[i][j],
                        Utils.mul(this.arr[i][k],matrix.arr[k][j])
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
        for (let i = 0; i < this.rows; i++) minRow.push(min(...this.arr[i]));
        return min(...minRow);
    }
    get max() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) maxRow.push(max(...this.arr[i]));
        return max(...maxRow);
    }
    get minRows() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        let minRow = [];
        for (let i = 0; i < this.rows; i++) minRow.push(min(...this.arr[i]));
        return minRow;
    }
    get maxRows() {
        if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) maxRow.push(max(...this.arr[i]));
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
        var Tr = new Array(this.rows).fill(null).map(() => document?.createElement("tr"));
        var Td = this.arr.map((n) => n.map(() => document?.createElement("td")));
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
            if(i!==n)newObj[i].map((n,j)=>n.x=obj[i][order[j]].x)
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
/**
* @returns {Matrix}
*/
const matrix=(r, c, element)=>new Matrix(r, c, element);
const matrix2=(...element)=>new Matrix(2, 2, element);
const matrix3=(...element)=>new Matrix(3, 3, element);
const matrix4=(...element)=>new Matrix(4, 4, element);
export{Matrix,matrix,matrix2,matrix3,matrix4}