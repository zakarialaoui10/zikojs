const useDebounce=(fn,delay=1000)=>{
    let id;
    return(...args)=> id ? clearTimeout(id) : setTimeout(()=>fn(...args),delay)
}
const useThrottle=(fn,delay)=>{
    let lastTime=0;
    return (...args)=>{
        const now=new Date().getTime()
        if(now-lastTime<delay)return;
        lastTime=now;
        fn(...args); 
    }
}
export{
    useDebounce,
    useThrottle
}