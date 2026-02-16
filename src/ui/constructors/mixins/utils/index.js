import { isStateGetter } from "../../../../hooks/use-state.js";
import { 
  is_camelcase,
  camel2hyphencase
 } from '../../../../data/string/index.js'

export function _set_attrs_(name, value){
    if(globalThis.SVGAElement && this.element instanceof globalThis.SVGAElement) name = is_camelcase(name) ? camel2hyphencase(name) : name;
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