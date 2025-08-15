import ZikoUIElement from "../../constructors/ziko-ui-element.js";
class ZikoUIHtmlTag extends ZikoUIElement {
  constructor(element) {
    super(element,"html");
  }
}
class ZikoUIBtn extends ZikoUIElement {
  constructor(value = "button") {
    super("button","btn");
    this.setValue(value);
    this.st.cursor("pointer");
    globalThis.__Ziko__.__Config__.default.render && this.render();
  }
  get isBtn(){
    return true
  }
  setValue(value) {
    if (value instanceof ZikoUIElement) value.setTarget(this.element);
    else {
      this.element?.appendChild(document.createTextNode(""));
      this.element.childNodes[0].data = value;
    }
    return this;
  }
  get value() {
    return this.element.innerText;
  }
  toggleValues(...values) {
    values = values.map((n) => "" + n);
    let index = values.indexOf("" + this.value);
    if (index != -1 && index != values.length - 1)
      this.setValue(values[index + 1]);
    else this.setValue(values[0]);
    return this;
  }
}
class ZikoUIBr extends ZikoUIElement {
    constructor() {
      super("br","br");
    }
    get isBr(){
      return true
    }
  }
  class ZikoUIHr extends ZikoUIElement {
    constructor() {
      super("hr","hr");
      this.setAttr("role", "none");
    }
    get isHr(){
      return true
    }
  }
  class ZikoUILink extends ZikoUIElement{
    constructor(href){
      super("a","link");
      Object.assign(this.cache,{
        defaultStyle:{
          color:"#0275d8",
          textDecoration: "none"
        },
        hoverStyle:{
          color:"#01447e",
          textDecoration: "underline"
        },
      })
      this.setHref(href);
      this.style(this.cache.defaultStyle);
      this.onPtrEnter(()=>this.style(this.cache.hoverStyle));
      this.onPtrLeave(()=>this.style(this.cache.defaultStyle));
    }
    setHref(href){
      this.element.href=href;
    }
    get isLink(){
      return true
    }
  }
  const br = () => new ZikoUIBr();
  const hr = () => new ZikoUIHr();
  const brs = (n=1)=> new Array(n).fill(new ZikoUIBr());
  const hrs = (n=1)=> new Array(n).fill(new ZikoUIHr());
  const link=(href,...UIElement)=>new ZikoUILink(href).append(...UIElement);
  const html=(tag,...UIElement)=>new ZikoUIHtmlTag(tag).append(...UIElement);
  const btn = (value) => new ZikoUIBtn(value);
export * from "./xml-wrapper.js";
export * from "./suspense.js"
export * from "./hyperscript.js"
export{
  html,
  btn,
  br,
  hr,
  brs,
  hrs,
  link,
  ZikoUIHtmlTag,
  ZikoUIBr,
  ZikoUIHr,
  ZikoUILink
}
