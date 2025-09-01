import { isStateGetter } from "../../../hooks/use-state.js";
import { 
  is_camelcase,
  camel2hyphencase
 } from '../../../data/string/index.js'
 import { text } from "../../text/index.js";
export async function __addItem__(adder, pusher, ...ele) {
  if (this.cache.isFrozzen) {
    console.warn("You can't append new item to frozzen element");
    return this;
  }
  for (let i = 0; i < ele.length; i++) {
    if (["number", "string"].includes(typeof ele[i])) ele[i] = text(ele[i]);
        // Fix Items Latter
    if (ele[i] instanceof Function) {
     const getter = ele[i]();
      if (getter.isStateGetter) {
        ele[i] = text(getter.value);
        getter._subscribe(
            (newValue) => (ele[i].element.textContent = newValue),
            ele[i] 
        );
        // this.element.appendChild(textNode);
      }
    }
    if (typeof globalThis?.Node === "function" && ele[i] instanceof globalThis?.Node) ele[i] = new this.constructor(ele[i]);
    if (ele[i]?.isZikoUINode) {
        ele[i].cache.parent = this;
        this.element?.[adder](ele[i].element);
        ele[i].target = this.element;
        this.items[pusher](ele[i]);
    } 
    else if(ele[i] instanceof Promise){
      const UIEle = await ele[i]
      UIEle.cache.parent = this;
      this.element?.[adder](UIEle.element);
      UIEle.target = this.element;
      this.items[pusher](UIEle)
    }
    else if (ele[i] instanceof Object) {
      if (ele[i]?.style) this.style(ele[i]?.style);
      if (ele[i]?.attr) {
        Object.entries(ele[i].attr).forEach((n) =>
          this.setAttr("" + n[0], n[1]),
        );
      }
    }
  }
  this.maintain();
  return this;
}
export function _set_attrs_(name, value){
    if(this.element instanceof globalThis?.SVGAElement) name = is_camelcase(name) ? camel2hyphencase(name) : name;
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