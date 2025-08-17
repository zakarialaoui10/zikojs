import ZikoUIElement from "../constructors/ZikoUIElement.js";
import { HTMLTags, SVGTags } from "./tags-list.js";
const _h=(tag, type, attributes, ...children)=>{
    const { name, style, ...attrs } = attributes;
    let element = new ZikoUIElement(tag, name, type);
    style && element.style(style);
    attrs && element.setAttr(attrs);
    children && element.append(...children);
    return element; 
}
const h=(tag, attributes = {}, ...children)=> _h(tag, "html", attributes, ...children);
const s=(tag, attributes = {}, ...children)=> _h(tag, "svg", attributes, ...children);

const tags = new Proxy({}, {
  get(target, prop) {
    if (typeof prop !== 'string') return undefined;
    let tag = prop.replaceAll("_","-").toLowerCase();
    let type ;
    if(HTMLTags.includes(tag)) type = 'html'
    if(SVGTags.includes(tag)) type = 'svg'
    if(HTMLTags.includes(tag)) return (...args)=>{
      if(args[0] instanceof ZikoUIElement || (typeof args[0] === 'function' && args[0]().isStateGetter())) return new ZikoUIElement(tag, tag, {el_type : type}).append(...args);
      return new ZikoUIElement(tag).setAttr(args.shift()).append(...args)
    }
    // if(SVGTags.includes(tag)) return (...args) => new ZikoUIElement(tag,"",{el_type : "svg"}).append(...args);
    // return (...args)=>{
    //   if(!(args[0] instanceof ZikoUIElement) && args[0] instanceof Object){
    //     let attributes = args.shift()
    //     return new ZikoUIElement(tag).setAttr(attributes).append(...args)
    //   }
    //   return new ZikoUIElement(tag).append(...args);
    // }
    // // switch(tag){
    //   case "html"  : globalThis?.document?.createElement("html")
    //   case "head"  :
    //   case "style" :
    //   case "link"  :
    //   case "meta"  :
    //   case "srcipt":
    //   case "body"  : return null; break;
    //   default : return new ZikoUIElement(tag);
    // }
  }
});

export {
  tags
}