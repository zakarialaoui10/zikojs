import { text } from "../elements/text/text.js";
export const DomMethods = {
  append(...ele) {
    __addItem__.call(this, "append", "push", ...ele);
    return this;
  },
  prepend(...ele) {
    this.__addItem__.call(this, "prepend", "unshift", ...ele);
    return this;
  },
  insertAt(index, ...ele) {
    if (index >= this.element.children.length) this.append(...ele);
    else
      for (let i = 0; i < ele.length; i++) {
        if (["number", "string"].includes(typeof ele[i])) ele[i] = text(ele[i]);
        this.element?.insertBefore(ele[i].element, this.items[index].element);
        this.items.splice(index, 0, ele[i]);
      }
    return this;
  },
  remove(...ele) {
    const remove = (ele) => {
      if (typeof ele === "number") ele = this.items[ele];
      if (ele?.isZikoUIElement) this.element?.removeChild(ele.element);
      this.items = this.items.filter((n) => n !== ele);
    };
    for (let i = 0; i < ele.length; i++) remove(ele[i]);
    for (let i = 0; i < this.items.length; i++)
      Object.assign(this, { [[i]]: this.items[i] });
    // Remove from item
    return this;
  },
  clear(){
    this?.items?.forEach(n=>n.unrender());
    this.element.innerHTML = "";
    return this;
  },
  render(target = this.target) {
    if(this.isBody)return ;
    if(target?.isZikoUIElement)target=target.element;
    this.target=target;
    this.target?.appendChild(this.element);
    return this;
  },
  unrender(){
    if(this.cache.parent)this.cache.parent.remove(this);
    else if(this.target?.children?.length && [...this.target?.children].includes(this.element)) this.target.removeChild(this.element);
    return this;
  },
  renderAfter(t = 1) {
    setTimeout(() => this.render(), t);
    return this;
  },
  unrenderAfter(t = 1) {
    setTimeout(() => this.unrender(), t);
    return this;
  },
  after(ui){
    if(ui?.isZikoUIElement) ui=ui.element;
    this.element?.after(ui)
    return this;
  },
  before(ui){
    if(ui?.isZikoUIElement) ui=ui.element;
    this.element?.before(ui)
    return this;
  }

};

function __addItem__(adder, pusher, ...ele) {
  if (this.cache.isFrozzen) {
    console.warn("You can't append new item to frozzen element");
    return this;
  }
  for (let i = 0; i < ele.length; i++) {
    if (["number", "string"].includes(typeof ele[i])) ele[i] = text(ele[i]);
    if (
      typeof globalThis?.Node === "function" &&
      ele[i] instanceof globalThis?.Node
    )
      ele[i] = new this.constructor(ele[i]);
    if (ele[i]?.isZikoUIElement) {
      ele[i].cache.parent = this;
      this.element[adder](ele[i].element);
      ele[i].target = this.element;
      this.items[pusher](ele[i]);
    } else if (ele[i] instanceof Object) {
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
