import ZikoUIElement from "../../../../constructors/ziko-ui-element.js";
import { btn } from "../../../misc";
class ZikoUIInputImage extends ZikoUIElement {
    constructor(text = "File") {
      super("inputImage");
      this._aux_element = btn(text).setTarget(this.target);
      this.element = document?.createElement("input");
      this.element?.setAttribute("type", "file");
      this.element?.setAttribute("accept", "image");
      this._aux_element.onClick(() => this.element.click());
      this.element.onChange = this.handleImage.bind(this);
    }
    get isInputImage(){
      return true;
    }
    handleImage(e) {
      const reader = new FileReader();
      const img = new Image();
      reader.onload = function (event) {
        img.src = event.target.result;
        console.log(img.src);
      };
      reader.readAsDataURL(e.target.files[0]);
      this.img = img;
    }
    get value() {
      return this.img;
    }
    render(bool = true) {
      if (bool) this.target.appendChild(this._aux_element.element);
      else this.remove();
      return this;
    }
    remove() {
      if (this.target.children.length) this.target.removeChild(this._aux_element.element);
      return this;
    }
}
const inputImage = (text) => new ZikoUIInputImage(text);
export{
    ZikoUIInputImage,
    inputImage
}