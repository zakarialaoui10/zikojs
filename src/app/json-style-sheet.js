import { json2css } from "../data/index.js";
class ZikoJsonStyleSheet{
    constructor(JsonStyle={}){
        this.cache={
            JsonStyle,
            isRenderd : false
        }
        this.target = globalThis?.document?.head;
        this.element =  document.createElement("style");
        this.element.setAttribute("data-generator","zikojs");
        this.write();
        this.render()
    }
    get CssText(){
        return json2css(this.cache.JsonStyle);
    }
    render(){
        this.target.append(this.element);
        this.cache.isRenderd = true;
        return this;
    }
    unrender(){
        if(this.target?.children?.length && [...this.target?.children].includes(this.element)) this.target.removeChild(this.element);
        this.cache.isRenderd = false;
        return this;
    }
    write(){
        this.element.textContent = this.CssText;
        return this;
    }
    style(styles, overwrite = false){
        if(overwrite) this.clear();
        Object.assign(this.cache.JsonStyle,styles);
        this.write();
        return this;
    }
    clear(){
        this.cache.JsonStyle = {}
        this.write();
        return this;
    }
    // overrideGlobal(style){
    //     if(this.cache.JsonStyle["*"]){
    //         Object.assign(this.cache.JsonStyle["*"],style);
    //     }
    //     else Object.assign();
    //     this.write();
    //     return this;
    // }
}

const jsonStyleSheet = JsonStyle =>new ZikoJsonStyleSheet(JsonStyle);
export {
    jsonStyleSheet,
    ZikoJsonStyleSheet
}


//  p().style({color:"red"})
//  jsonStyleSheet({
//    p:{
//     color : "green !important"
//    }
//  })
