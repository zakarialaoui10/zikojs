import { UIElementCore } from "./UIElementCore.js";
import { register_to_class } from "../../helpers/register/register-to-class.js";
import { 
  LifecycleMethods,
  AttrsMethods,
  DomMethods,
  IndexingMethods,
  EventsMethodes,
  StyleMethods
} from "../__methods__/index.js";
// import { 
//   // useCustomEvent,
//   // useSwipeEvent,
//   // watchIntersection, 
//   // watchSize,
//   // watchAttr,
//   // watchChildren
// } from "../../--reactivity-deprecated/events/custom-event.js"
class UIElement extends UIElementCore{
  constructor({element, name ='', type='html', render = __Ziko__.__Config__.default.render}={}){
    super()
    // console.log({type})
    // console.log(this)
    register_to_class(
      this, 
      LifecycleMethods,
      AttrsMethods, 
      DomMethods, 
      StyleMethods,
      IndexingMethods, 
      EventsMethodes
    );

    // console.log(EventsMethodes)
    if(element)this.init(element, name, type, render)
  }
  get element(){
    return this.cache.element;
  }
  isInteractive(){
    return this.cache.isInteractive;
  }
  useClient(directive){
    if(!this.cache.isInteractive){
      this.element.setAttribute('data-hydration-index', globalThis.__Ziko__.__HYDRATION__.index);
      globalThis.__Ziko__.__HYDRATION__.register(() => this);
      this.cache.isInteractive = true;
    }
    if(directive)this.element.setAttribute('data-hydration-directive', directive);
    return this;
  }
  // isUIElement(){
  //   return true;
  // }
  get st(){
    return this.cache.style;
  }
  get attr(){
    return this.cache.attributes;
  }
  get evt(){
    return this.events;
  }
  get html(){
    return this.element.innerHTML;
  }
  get text(){
    return this.element.textContent;
  }
  get isBody(){
    return this.element === globalThis?.document.body;
  }
  get parent(){
    return this.cache.parent;
  }
  get width(){
    return this.element.getBoundingClientRect().width;
  }
  get height(){
    return this.element.getBoundingClientRect().height;
  }
  get top(){
    return this.element.getBoundingClientRect().top;
  }
  get right(){
    return this.element.getBoundingClientRect().right;
  }
  get bottom(){
    return this.element.getBoundingClientRect().bottom;
  }
  get left(){
    return this.element.getBoundingClientRect().left;
  }
  // clone(render=false) {
  //   // UI.__proto__=this.__proto__;
  //   // if(this.items.length){
  //   //   const items = [...this.items].map(n=>n.clone());
  //   //   UI.append(...items);
  //   // }
  //   // else UI.element=this.element.cloneNode(true);
  //   // return UI.mount(render);
  // }
  // [Symbol.iterator]() {
  //   return this.items[Symbol.iterator]();
  // }
  // maintain() {
  //   for (let i = 0; i < this.items.length; i++) {
  //     Object.defineProperty(this, i, {
  //       value: this.items[i],
  //       writable: true,
  //       configurable: true,
  //       enumerable: false 
  //       });
  //   }
  // }
  // freeze(freeze){
  //   this.cache.isFrozzen=freeze;
  //   return this;
  // }
  // setTarget(tg) {
  //   if(this.isBody) return ;
  //   if (tg?.isUIElement) tg = tg.element;
  //   this.unmount();
  //   this.target = tg;
  //   this.mount();
  //   return this;
  // }
  // describe(label){
  //   if(label)this.setAttr("aria-label",label)
  // }
  // get children() {
  //   return [...this.element.children];
  // }
  // get cloneElement() {
  //   return this.element.cloneNode(true);
  // }
  // setClasses(...value) {
  //   this.setAttr("class", value.join(" "));
  //   return this;
  // }
  // get classes(){
  //   const classes=this.element.getAttribute("class");
  //   return classes===null?[]:classes.split(" ");
  // }
  // addClass() {
  //   /*this.setAttr("class", value);
  //       return this;*/
  // }
  // setId(id) {
  //   this.setAttr("id", id);
  //   return this;
  // }
  // get id() {
  //   return this.element.getAttribute("id");
  // }
  // To Fix
  // onKeysDown({keys=[],callback}={}){
  //   if(!this.events.key)this.events.key = useKeyEvent(this);
  //   this.events.key.handleSuccessifKeys({keys,callback});
  //   return this;
  // }
  // watchAttr(callback){
  //   if(!this.observer.attr)this.observer.attr = watchAttr(this,callback);
  //   return this;
  // }
  // watchChildren(callback){
  //   if(!this.observer.children)this.observer.children = watchChildren(this,callback);
  //   return this;
  // }
  // watchSize(callback)Remplaced By on onViewResize
  // watchIntersection(callback,config) Remplaced By onViewEnter and onViewExit

}
export { UIElement }
