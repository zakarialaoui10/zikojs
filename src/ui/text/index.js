import ZikoUINode from "../constructors/ZikoUINode.js";
class ZikoUIText extends ZikoUINode {
    constructor(...value) {
      super("span", "text", false, ...value);
      this.element = globalThis?.document?.createTextNode(...value)
    }
    isText(){
      return true
    }
}
const text = (...str) => new ZikoUIText(...str);
export{
  ZikoUIText,
  text
}