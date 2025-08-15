import { ZikoUIInput } from "../input";
class ZikoUIInputColor extends ZikoUIInput {
    constructor() {
      super("color", "inputColor");
      this.background(this.value);
      this.onInput(() => this.background(this.value));
    }
    get isInputColor(){
      return true;
    }
}
const inputColor = () => new ZikoUIInputColor();
export{
    ZikoUIInputColor,
    inputColor
}