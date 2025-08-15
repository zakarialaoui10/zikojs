import { ZikoUIInput } from "../input";
class ZikoUIInputCheckbox extends ZikoUIInput {
    constructor() {
      super("checkbox", "inputCheckbox");
      this.cursor("pointer");
    }
    get isInputCheckbox(){
      return true;
    }
    get checked() {
      return this.element.checked;
    }
    check(checked = true) {
      this.element.checked = checked;
      return this;
    }
    color(color) {
      this.element.style.accentColor = color;
      return this;
    }
}
const checkbox = () => new ZikoUIInputCheckbox();
export{
    ZikoUIInputCheckbox,
    checkbox
}