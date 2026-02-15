import { _set_attrs_ } from "./utils/index.js";
// import { 
//   is_camelcase,
//   camel2hyphencase
//  } from '../../data/string/index.js'

export function setAttr(name, value) {
  if(name instanceof Object){
    const [names,values]=[Object.keys(name),Object.values(name)];
    for(let i=0;i<names.length;i++){
      if(values[i] instanceof Array)value[i] = values[i].join(" ");
      _set_attrs_.call(this, names[i], values[i])
    }
  }
  else{
    if(value instanceof Array) value = value.join(" ");
    _set_attrs_.call(this, name, value)
  }
  return this;
}
export function removeAttr(...names) {
  for(let i=0;i<names.length;i++)this.element?.removeAttribute(names[i]);
  return this;
}
export function getAttr(name){
  name = is_camelcase(name) ? camel2hyphencase(name) : name;
  return this.element.attributes[name].value;
}
export function setContentEditable(bool = true) {
  this.setAttr("contenteditable", bool);
  return this;
}

