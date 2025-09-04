import { text } from "../text/index.js";
import { __addItem__ } from "./utils/index.js";
export function append(...ele) {
  __addItem__.call(this, "append", "push", ...ele);
  return this;
}
export function prepend(...ele) {
  this.__addItem__.call(this, "prepend", "unshift", ...ele);
  return this;
}
export function insertAt(index, ...ele) {
  if (index >= this.element.children.length) this.append(...ele);
  else
    for (let i = 0; i < ele.length; i++) {
      if (["number", "string"].includes(typeof ele[i])) ele[i] = text(ele[i]);
      this.element?.insertBefore(ele[i].element, this.items[index].element);
      this.items.splice(index, 0, ele[i]);
    }
  return this;
}
export function remove(...ele) {
  const remove = (ele) => {
    if (typeof ele === "number") ele = this.items[ele];
    if (ele?.isUIElement) this.element?.removeChild(ele.element);
    this.items = this.items.filter((n) => n !== ele);
  };
  for (let i = 0; i < ele.length; i++) remove(ele[i]);
  for (let i = 0; i < this.items.length; i++)
    Object.assign(this, { [[i]]: this.items[i] });
  // Remove from item
  return this;
}
export function clear(){
  this?.items?.forEach(n=>n.unrender());
  this.element.innerHTML = "";
  return this;
}
export function render(target = this.target) {
  if(this.isBody)return ;
  if(target?.isUIElement)target=target.element;
  this.target=target;
  this.target?.appendChild(this.element);
  return this;
}
export function unrender(){
  if(this.cache.parent)this.cache.parent.remove(this);
  else if(this.target?.children?.length && [...this.target?.children].includes(this.element)) this.target.removeChild(this.element);
  return this;
}
export function replaceElementWith(new_element){
    this.cache.element.replaceWith(new_element)
    this.cache.element = new_element;

    // To do : Dispose Events and States 
    return this
}
export function renderAfter(t = 1) {
  setTimeout(() => this.render(), t);
  return this;
}
export function unrenderAfter(t = 1) {
  setTimeout(() => this.unrender(), t);
  return this;
}
export function after(ui){
  if(ui?.isUIElement) ui=ui.element;
  this.element?.after(ui)
  return this;
}
export function before(ui){
  if(ui?.isUIElement) ui=ui.element;
  this.element?.before(ui)
  return this;
}


