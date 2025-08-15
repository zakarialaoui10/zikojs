
import ZikoUINode from "../../constructors/ziko-ui-node.js";
class ZikoUIText extends ZikoUINode {
    constructor(...value) {
      super("span", "text", false, ...value);
      this.element = document.createTextNode(...value)
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