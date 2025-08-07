import ZikoUIElement from "../../constructors/ziko-ui-element.js";
import {text} from "../text/index.js";
class ZikoUILI extends ZikoUIElement{
  constructor(UI){
    super("li","li");
    this.append(UI);
  }
  get isLi(){
    return true;
  }
}
class ZikoUIList extends ZikoUIElement {
    constructor(element,name) {
      super(element,name);
      delete this.append;
      this.style({ listStylePosition: "inside" });
    }
    get isList(){
      return true;
    }
    append(...arr){
      for (let i = 0; i < arr.length; i++) {
        let li = null;
        if(["string","number"].includes(typeof arr[i]))arr[i]=text(arr[i])
        if (arr[i] instanceof ZikoUIElement)li=new ZikoUILI(arr[i]);
        li.setTarget(this.element)
        this.items.push(li[0]);
        this.maintain();
      }
    }
    remove(...ele) {
      if(ele.length==0){
        if(this.target.children.length) this.target.removeChild(this.element);
      }
      else {
        const remove = (ele) => {
          if(typeof ele === "number") ele=this.items[ele];
          if(ele instanceof ZikoUIElement)this.element?.removeChild(ele.parent.element);
            this.items=this.items.filter(n=>n!==ele);
        };
        for (let i = 0; i < ele.length; i++) remove(ele[i]);
        for (let i = 0; i < this.items.length; i++)
          Object.assign(this, { [[i]]: this.items[i] });
      }
      return this;
    }
    insertAt(index, ...ele) {
      if (index >= this.element.children.length) this.append(...ele);
      else
        for (let i = 0; i < ele.length; i++) {
          let li = null;
          if(["number","string"].includes(typeof ele[i]))ele[i]=text(ele[i]);
          if (ele[i] instanceof ZikoUIElement)li=new ZikoUILI(ele[i]);
          this.element?.insertBefore(li.element, this.items[index].parent.element);
          this.items.splice(index, 0, ele[i][0]);
        }
      return this;
    }
    filterByTextContent(text,exactMatch=false){
      this.items.map(n=>n.parent.render());
      this.items.filter(n=>{
        const content=n.element.textContent
        return !(exactMatch?content===text:content.includes(text))
      }).map(n=>n.parent.render(false));
       return this;
    }
    sortByTextContent(order=1){
      this.items.map(n=>n.parent.render(false));
      // To Fix
      this.sortedItems=this.items.sort((a,b)=>order*a.element.textContent.localeCompare(b.element.textContent))
      this.append(...this.sortedItems);
      return this;
    }
    filterByClass(value) {
      this.items.map(n=>n.parent.render(true));
      this.items.filter(n=>!n.Classes.includes(value)).map(n=>n.parent.render(false));
      return this; 
    }
    delete(value) {
      const valueIndex = [...this.element.children].indexOf(value);
      return valueIndex;
      /*if(valueIndex >= 0) {
        return this.list.splice(valueIndex, 1);
      }*/
    }
    push(){

    }
    pop(){

    }
    unshift(){

    }
    shift(){

    }
    sort(){

    }
    filter(){

    }
    slice(){
      
    }
  }
class ZikoUIOList extends ZikoUIList{
  constructor(...arr){
    super("ol","ol");
    this.append(...arr);
  }
  get isOl(){
    return true;
  }
  type(tp = 1) {
    this.element?.setAttribute("type", tp);
    return this;
  }
  start(st = 1) {
    this.element?.setAttribute("start", st);
    return this;
  }
}
class ZikoUIUList extends ZikoUIList{
  constructor(...arr){
    super("ul","ul");
    this.append(...arr);
  }
  get isUl(){
    return true;
  }
}
const li=UI=>new ZikoUILI(UI)
const ol = (...arr) => new ZikoUIOList(...arr);
const ul = (...arr) => new ZikoUIUList(...arr);

export{ol,ul,li}