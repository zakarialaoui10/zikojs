import ZikoUIElement from "../../../constructors/ziko-ui-element.js";
class ZikoUITextArea extends ZikoUIElement {
    constructor() {
      super();
      this.element = document?.createElement("textarea");
    }
    get value(){
      return this.element.textContent;
    }
    get isTextArea(){
      return true;
    }
}
const textarea =()=> new ZikoUITextArea();
export {
    ZikoUITextArea,
    textarea
}