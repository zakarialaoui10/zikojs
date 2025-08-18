import { Str } from "../../data";
import { isStateGetter } from "../../hooks/use-state.js";

// To Do add getter, watchAttr
export const AttrsMethods = {
  setAttr(name, value) {
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
  },
  removeAttr(...names) {
    for(let i=0;i<names.length;i++)this.element?.removeAttribute(names[i]);
    return this;
  },
  getAttr(name){
    name = Str.isCamelCase(name) ? Str.camel2hyphencase(name) : name;
    return this.element.attributes[name].value;
  }
};

function _set_attrs_(name, value){
    if(this.element?.tagName !== "svg") name = Str.isCamelCase(name) ? Str.camel2hyphencase(name) : name;
    if(this?.attr[name] && this?.attr[name]===value) return;
    if(isStateGetter(value)){
        const getter = value()
        getter._subscribe(
            (newValue) => this.element?.setAttribute(name, newValue),
            this 
        );
    }
    else this.element?.setAttribute(name, value)
    Object.assign(this.cache.attributes, {[name]:value});   
}