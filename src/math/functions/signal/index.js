import { mapfun } from "../mapfun/index.js";

export const zeros = n => new Array(n).fill(0);
export const ones = n => new Array(n).fill(1);
export const nums = (n, num) => new Array(n).fill(num);


export const arange = (a, b, step, include = false) => {  
    if(a instanceof Array && typeof b === 'number') return mapfun(x => arange(x, b, step, include), ...a);
    if(b instanceof Array && typeof a === 'number') return mapfun(x => arange(a, x, step, include), ...b);
    if(a instanceof Array && b instanceof Array){
        if(a.length !== b.length) return TypeError('');
        let res = new Array(a.length).fill(null)
        return res.map((_, i) => arange(a[i], b[i], step, include))
    }
    if(typeof a === 'number' && typeof b === 'number'){
        const values = [];
         let i;
        if(a<b){
            for (i = a; include ? i<=b : i<b ; i += step) 
                values.push((i * 10) / 10);
        }
        else{
            for(i = a; include ? i>=b: i>b ; i -= step) 
                values.push((i * 10) / 10);
        }
        return values
    }
}

export const linspace = (a, b, n = Math.abs(b-a) + 1, endpoint = true) =>{
    if(Math.floor(n) !== n) return TypeError('');
    let c = [a, b].find(n => n.isComplex?.())
    if(c){
        let z1 = new c.constructor(a);
        let z2 = new c.constructor(b)
        n = n || Math.abs(z1.a - z2.a) + 1;
        const X = linspace(z1.a, z2.a, n, endpoint);
        const Y = linspace(z1.a, z2.a, n, endpoint);
        let Z = new Array(n).fill(null);
        Z = Z.map((_, i) => new z1.constructor(X[i], Y[i]));
        return Z;
    }
    if(a instanceof Array && typeof b === 'number') return mapfun(x => linspace(x, b, step, include), ...a);
    if(b instanceof Array && typeof a === 'number') return mapfun(x => linspace(a, x, step, include), ...b);
    if(a instanceof Array && b instanceof Array){
        if(a.length !== b.length) return TypeError('');
        let res = new Array(a.length).fill(null)
        return res.map((_, i) => linspace(a[i], b[i], step, include))
    }
    if(typeof a === 'number' && typeof b === 'number'){
        const [max, min] = [a, b].sort((a, b) => b-a);
        let Y = [], step, i;
        endpoint ? step = (max - min) / (n - 1) : step = (max - min) / n;
        if(a < b)
            for(i = 0; i < n; i++)
                Y.push(+(min + step * i).toPrecision(8))
        else
            for(i = 0; i < n; i++)
                Y.push(+(max - step * i).toPrecision(8))
        return Y
    }
}

// linspace
// logspace
// timespace
// geomspace
// 