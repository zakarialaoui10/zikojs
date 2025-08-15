import ZikoUIElement from "../../../../constructors/ziko-ui-element.js";
import { useInputEvent } from "../../../../../reactivity/index.js";
class ZikoUIInput extends ZikoUIElement {
  constructor(type, name , value = "", datalist) {
    super("input", "input");
    Object.assign(this.events, { input: null });
    this.setValue(value);
    this.setAttr("type", type);
    this.setAttr("name", name);
    // this.setAttr("tab-index","0")
    if (datalist) this.linkDatalist(datalist);
  }
  get isInput() {
    return true;
  }
  setName(name){
    this.setAttr("name", name);
    return this;
  }
  onInput(...callbacks) {
    if (!this.events.input) this.events.input = useInputEvent(this);
    this.events.input.onInput(...callbacks);
    return this;
  }
  onChange(...callbacks) {
    if (!this.events.input) this.events.input = useInputEvent(this);
    this.events.input.onChange(...callbacks);
    return this;
  }
  linkDatalist(datalist) {
    let id;
    if (datalist instanceof ZikoUIInputDatalist) id = datalist.Id;
    else if (datalist instanceof Array) {
      const Datalist = new ZikoUIInputDatalist(...datalist);
      id = Datalist.Id;
      console.log(Datalist);
    } else id = datalist;
    this.element?.setAttribute("list", id);
    return this;
  }
  get value() {
    return this.element.value;
  }
  // _setType(type) {
  //   this.element.type = type;
  //   return this;
  // }
  setValue(value = "") {
    this.element.value = value;
    return this;
  }
  useState(state) {
    this.setValue(state);
    return [{ value: this.value }, (e) => this.setValue(e)];
  }
  setPlaceholder(value) {
    if (value) this.element.placeholder = value;
    return this;
  }
  get isValide() {
    return this.element.checkValidity();
  }
  setRequired(required = true) {
    this.element.required = required;
    return this;
  }
  select() {
    this.element.select();
    return this;
  }
  copy() {
    this.element.select();
    document.execCommand("copy");
    return this;
  }
  cut() {
    this.element.select();
    document.execCommand("cut");
    return this;
  }
  accept(value) {
    this.element.accept = value;
    return this;
  }
}

const input = (value, datalist) => {
  if (value instanceof Object) {
    const { datalist, placeholder } = value;
    value = value.value ?? "";
    return new ZikoUIInput("text", "input", value, datalist).setPlaceholder(placeholder);
  }
  return new ZikoUIInput("text", "input", value, datalist);
};

export{
    ZikoUIInput,
    input
}