import ZikoUIElement from "../../../constructors/ziko-ui-element.js";
import { ZikoUIInputOption } from "../Inputs/__helpers__";
class ZikoUISelect extends ZikoUIElement {
    constructor(){
      super();
      this.element=document?.createElement("select");
    }
    addOptions(...options) {
      options.map(n => this.append(new ZikoUIInputOption(n)));
      return this;
    }
    get isSelect(){
      return true;
    }
  }
const select=()=>new ZikoUISelect()
export{
    select,
    ZikoUISelect
}