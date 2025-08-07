import ZikoUIElement from "../../../constructors/ziko-ui-element.js";
import { Random } from "../../../../math/index.js";
class ZikoUILabel extends ZikoUIElement{
    constructor(){
      super();
      this.element=document?.createElement("label");
    }
    get isLabel(){
      return true;
  }
  }
class ZikoUIInputOption extends ZikoUIElement {
    constructor(value = "") {
      super();
      this.element = document?.createElement("option");
      if(value instanceof Object&&"value" in value){
        this.setValue(value.value);
        this.setText(value?.text??value.value)
      }
      else this.setValue(value);
    }
    setValue(str = "") {
      this.element.value = str;
      return this;
    }
    setText(text=""){
      if(text)this.element.textContent=text;
      return this;
    }
}
class ZikoUIInputDatalist extends ZikoUIElement {
  constructor(...options){
    super();
    this.element = document?.createElement("datalist");
    this.addOptions(...options).setId("ziko-datalist-id"+Random.string(10));
  }
  get isDatalist(){
    return true;
  }
  addOptions(...options) {
    options.map((n) => this.append(new ZikoUIInputOption(n)));
    return this;
  }
}

const datalist = (...options) => new ZikoUIInputDatalist(...options);
export{
  datalist,
  ZikoUIInputDatalist,
  ZikoUILabel,
  ZikoUIInputOption
}