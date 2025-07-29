import ZikoUIElement from "../elements/ZikoUIElement.js";
const tags = new Proxy({}, {
  get(target, prop) {
    if (typeof prop !== 'string') return undefined;
    let tag = prop.replaceAll("_","-").toLowerCase();
    switch(tag){
      case "html"  : globalThis?.document?.createElement("html")
      case "head"  :
      case "style" :
      case "link"  :
      case "meta"  :
      case "srcipt":
      case "body"  : return null; break;
      default : return new ZikoUIElement(tag);
    }
  }
});

export {
  tags
}