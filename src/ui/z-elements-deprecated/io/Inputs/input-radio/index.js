import { ZikoUIInput } from "../input";
class ZikoUIInputRadio extends ZikoUIInput {
    constructor() {
      super("radio", "inputRadio");
      this.cursor("pointer");
    }
    get isInputRadio(){
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
const radio = () => new ZikoUIInputRadio();
export{
  ZikoUIInputRadio,
  radio
}