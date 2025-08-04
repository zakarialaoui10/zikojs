export const useDebounce=(fn,delay=1000)=>{
    let id;
    return(...args)=> id ? clearTimeout(id) : setTimeout(()=>fn(...args),delay)
}