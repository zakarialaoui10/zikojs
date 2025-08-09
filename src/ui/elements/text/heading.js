import ZikoUIElement from "../../constructors/ziko-ui-element.js";
class ZikoUIHeading extends ZikoUIElement {
    constructor(type = 1, value = "") {
      super(`h${type}`,`h${type}`);
      this.element.textContent = value;
    }
    get isHeading(){
      return true;
    }
    get value() {
      return this.element.innerText;
    }
    setValue(text = "") {
      this.element.innerText = text;
      return;
    }
    addValue(text = "") {
      this.element.innerText += text;
      return this;
    }
  }
const h1=(text="")=>new ZikoUIHeading(1, text);
const h2=(text="")=>new ZikoUIHeading(2, text);
const h3=(text="")=>new ZikoUIHeading(3, text);
const h4=(text="")=>new ZikoUIHeading(4, text);
const h5=(text="")=>new ZikoUIHeading(5, text);
const h6=(text="")=>new ZikoUIHeading(6, text);
export{
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ZikoUIHeading
}