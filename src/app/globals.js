const __UI__={
    __all__(){
        return Object.values(this)
          .filter(Array.isArray)
          .flat();
    },
    querySelectorAll(){
        return this.__all__().filter(n=>n)
    },
    getElementByIndex(index){
        return this.__all__().find(n=>n.ui_index===index);
    },
    getElementById(id){
        return null;
    },
    getElementsByClass(){

    },
    getElementsByTagName(){
        
    }
}
const __HYDRATION__ = {
    map : new Map(),
    index : 0,
    increment : function(){
        return this.index ++
    }
}
const __HYDRATION_MAP__ = new Map()
const __Config__={
    default:{
        target:null,
        render:true,
        math:{
            mode:"deg"
        }
    },
    setDefault:function(pairs){
        const keys=Object.keys(pairs);
        const values=Object.values(pairs);
        for(let i=0; i<keys.length; i++) this.default[keys[i]]=values[i];
    },
    init:()=>{
        // document.documentElement.setAttribute("data-engine","zikojs")
    },
    renderingMode :"spa",
    isSSC : false,
}
const __CACHE__ = {
    ui_index : 0,
    get_ui_index:function(){
        return this.ui_index ++
    }
}
export {
    __UI__,
    __HYDRATION_MAP__,
    __Config__,
    __CACHE__,
    __HYDRATION__
}
