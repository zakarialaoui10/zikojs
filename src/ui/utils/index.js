import ZikoUIElement from "../constructors/ziko-ui-element.js";
const Id = (a) => document.getElementById(a);
const Class = (a) => [...document.getElementsByClassName(a)];
const $=(...selector)=>{
  var ele=[]
  for(let i=0;i<selector.length;i++){
    if(typeof selector[i]=="string")ele.push(...document.querySelectorAll(selector[i]));
    if(selector[i] instanceof ZikoUIElement)ele.push(selector[i].element)
  }
  return ele.length===1?ele[0]:ele;
}
const addSuffixeToNumber=(value,suffixe="px")=>{
  if(typeof value === "number") value+=suffixe;
  if(value instanceof Array)value=value.map(n=>typeof n==="number"?n+=suffixe:n).join(" ");
  return value;
}
const style = (el, styles) => {if(el)Object.assign(el.style, styles)};

function script(src) {
  const Script = document?.createElement("script");
  Script.setAttribute("src", src);
  document.head.appendChild(Script);
}
function linkStyle(href) {
  const link = document?.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", href);
  document.head.appendChild(link);
}
const CloneElement = (UIElement) => {
  var clone = new UIElement.__proto__.constructor()
  //waitForUIElm(UIElement).then(e=>console.log(e)).then(()=>clone = new UIElement.__proto__.constructor())
  //let a = new UIElement.__proto__.constructor()
  return clone;
};
const cloneUI=UIElement=>{
  return Object.assign(Object.create(Object.getPrototypeOf(UIElement)),UIElement)
}
function isPrimitive(value) {
    return typeof value !== 'object' && typeof value !== 'function' || value === null;
  }
const waitElm=(UIElement)=>{
    return new Promise(resolve => {
        if (UIElement) {
            return resolve(UIElement);
        }
        const observer = new MutationObserver(() => {
            if (UIElement) {
                resolve(UIElement);
                observer.disconnect();
            }
        });
        observer.observe(document?.body, {
            childList: true,
            subtree: true
        });
    });
  }
export{
  Id,
  Class,
  style,
  script,
  linkStyle,
  CloneElement,
  cloneUI,
  isPrimitive,
  addSuffixeToNumber,
  waitElm
}