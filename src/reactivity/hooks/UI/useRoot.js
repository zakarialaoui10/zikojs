import { camel2hyphencase } from "../../../data/converter/string/index.js";
class ZikoUseRoot{
    constructor(props){
        this.props={};
        props && this.set(props)
    }
    get(prop){
        return this.props[prop]
    }
    // getStaticValue(){
    //     return document.documentElement.style.getPropertyValue("--primary-col")
    // }
    set(props){
        Object.entries(props).forEach(([key,value])=>this.#setOneProp(key, value));
        return this;
    }
    #setOneProp(prop, value){
        const CssProp = `--${camel2hyphencase(prop)}`
        document.documentElement.style.setProperty(CssProp,value);
        Object.assign(this.props, {[prop]: `var(${CssProp})`})
        Object.assign(this, {[prop] : `var(${CssProp})`})
    }
}

const useRootValue=CssVar=>{
    if(!CssVar.startsWith("--")) CssVar = `--${camel2hyphencase(CssVar)}`
    return `var(${CssVar})`
}
// const useRootStaticValue=CssVar=>{
//     if(!CssVar.startsWith("--")) CssVar = `--${Str.camel2hyphencase(CssVar)}`
//     return globalThis.document.documentElement.style.getPropertyValue(CssVar)  
// }
const useRoot=(props)=>new ZikoUseRoot(props)
export{
    ZikoUseRoot,
    useRoot,
    useRootValue,
    // useRootStaticValue
}