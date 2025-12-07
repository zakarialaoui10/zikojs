// Mixed calcul
const sum=(...x)=>{
    if(x.every(n=>typeof n==="number")){
        let s = x[0];
        for (let i = 1; i < x.length; i++) s += x[i];
        return s;
    }
    const Y=[];
    for(let i=0;i<x.length;i++){
        if(x[i] instanceof Array)Y.push(sum(...x[i]));
        else if(x[i] instanceof Object){
            Y.push(sum(...Object.values(x[i])))
        }
    }
    return Y.length===1?Y[0]:Y;
}
const prod=(...x)=>{
    if(x.every(n=>typeof n==="number")){
        let p = x[0];
        for (let i = 1; i < x.length; i++) p *= x[i];
        return p;
    }
    const Y=[];
    for(let i=0;i<x.length;i++){
        if(x[i] instanceof Array)Y.push(prod(...x[i]));
        else if(x[i] instanceof Object){
            Y.push(prod(...Object.values(x[i])))
        }
    }
    return Y.length===1?Y[0]:Y;
}
// const min=(...num)=>{
//     if(num.every(n=>typeof n==="number"))return Math.min(...num);
//     const Y=[];
//     for(let i=0;i<num.length;i++){
//         if(num[i] instanceof Array)Y.push(min(...num[i]));
//         else if(num[i] instanceof Object){
//             Y.push(
//                     Object.fromEntries(
//                         [Object.entries(num[i]).sort((a,b)=>a[1]-b[1])[0]]
//                     )
//                 )
//         }
//     }
//     return Y.length===1?Y[0]:Y;
// }
// const max=(...num)=>{
//     if(num.every(n=>typeof n==="number"))return Math.max(...num);
//     const Y=[];
//     for(let i=0;i<num.length;i++){
//         if(num[i] instanceof Array)Y.push(min(...num[i]));
//         else if(num[i] instanceof Object){
//             Y.push(
//                     Object.fromEntries(
//                         [Object.entries(num[i]).sort((a,b)=>b[1]-a[1])[0]]
//                     )
//                 )
//         }
//     }
//     return Y.length===1?Y[0]:Y;
// }
const accum=(...num)=>{
    if(num.every(n=>typeof n==="number")){
        let acc = num.reduce((x, y) => [...x, x[x.length - 1] + y], [0]);
        acc.shift();
        return acc;
    }
    const Y=[];
    for(let i=0;i<num.length;i++){
        if(num[i] instanceof Array)Y.push(accum(...num[i]));
        else if(num[i] instanceof Object){
            Y.push(null
                    // Object.fromEntries(
                    //     [Object.entries(num[i]).sort((a,b)=>b[1]-a[1])[0]]
                    // )
                )
        }
    }
    return Y.length===1?Y[0]:Y;
}

// sort

export{
    sum,
    prod,
    // min,
    // max,
    accum
}

//moy
//med
//variance
//std
//mode
//acccum
//min2max
//max2min
//percentile