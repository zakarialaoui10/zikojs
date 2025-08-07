import ZikoUIElement from "../../constructors/ziko-ui-element.js"
import { text } from "../text/text.js";
class ZikoUITh extends ZikoUIElement{
    constructor(...ZikoUIElement){
        super()
        this.element=document?.createElement("Th");
        this.append(...ZikoUIElement)
    }
}
class ZikoUITr extends ZikoUIElement{
    constructor(...ZikoUIElement){
        super()
        this.element=document?.createElement("Tr");
        this.append(...ZikoUIElement)
    }
}
class ZikoUITd extends ZikoUIElement{
    constructor(...ZikoUIElement){
        super()
        this.element=document?.createElement("Td");
        this.append(...ZikoUIElement)
    }
}
class ZikoUIThead extends ZikoUIElement{
    constructor(...ZikoUITr){
        super()
        this.element=document?.createElement("Thead");
        this.append(...ZikoUITr)
    }
}
class ZikoUITbody extends ZikoUIElement{
    constructor(...ZikoUITr){
        super()
        this.element=document?.createElement("Tbody");
        this.append(...ZikoUITr)
    }
}
class ZikoUITfoot extends ZikoUIElement{
    constructor(...ZikoUITr){
        super()
        this.element=document?.createElement("Tfoot");
        this.append(...ZikoUITr)
    }
}
export class ZikoUICaption extends ZikoUIElement{
    constructor(ZikoUIElement){
        super()
        this.element=document?.createElement("Caption");
        this.append(ZikoUIElement)
    }
}
class ZikoUICol extends ZikoUIElement{
    constructor(...ZikoUIElement){
        super()
        this.element=document?.createElement("Col");
        this.append(...ZikoUIElement)
    }
}
class ZikoUIColgroup extends ZikoUIElement{
    constructor(...ZikoUIElement){
        super()
        this.element=document?.createElement("Colgroup");
        this.append(...ZikoUIElement)
    }
}

const tr=(...ZikoUIElement)=>new ZikoUITr(...ZikoUIElement)
const th=(...UI)=>{
    UI=UI.map(n=>{
        if(!(n instanceof ZikoUIElement))n=text(n)
        return n
    })
    return new ZikoUITh(...UI)
}
const td=(...UI)=>{
    UI=UI.map(n=>{
        if(!(n instanceof ZikoUIElement))n=text(n)
        return n
    })
    return new ZikoUITd(...UI)
}
const thead=(...ZikoUITd)=>{
    ZikoUITd=ZikoUITd.map(n=>{
        if(!(n instanceof ZikoUIElement))n=td(n)
        return n
    })
    return new ZikoUIThead(...UI)
}
const tbody=(...ZikoUITr)=>new ZikoUITbody(...ZikoUITr)
const tfoot=(...ZikoUITr)=>new ZikoUITfoot(...ZikoUITr)
const caption=(ZikoUITr)=>new ZikoUICaption(ZikoUITr)


export {th,tr,td,thead,tbody,tfoot,caption}