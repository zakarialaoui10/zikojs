import {UINode} from "./UINode.js";
import {__init__global__, UIStore} from '../../__ziko__/index.js';
__init__global__()
class UIElementCore extends UINode{
  constructor(){
    super()
  }
  init(element, name, type, render, isInteractive = [true, false][Math.floor(2*Math.random())]){
    this.target = globalThis.__Ziko__.__Config__.default.target||globalThis?.document?.body;
    if(typeof element === "string") {
      switch(type){
        case "html" : {
          element = globalThis?.document?.createElement(element);
          console.log('1')
        }; break;
        case "svg" : {
          element = globalThis?.document?.createElementNS("http://www.w3.org/2000/svg", element); 
          console.log('2')
        }; break;
        default : throw Error("Not supported")
      }
    }
    else this.target = element?.parentElement;
    Object.assign(this.cache, {
      name,
      isInteractive,
      parent:null,
      isBody:false,
      isRoot:false,
      isHidden: false,
      isFrozzen:false,
      legacyParent : null,
      attributes: {},
      filters: {},
      temp:{}
    })
    this.events = {
      ptr:null,
      mouse:null,
      wheel:null,
      key:null,
      drag:null,
      drop:null,
      click:null,
      clipboard:null,
      focus:null,
      swipe:null,
      custom:null,
    }
    this.observer={
      resize:null,
      intersection:null
    }
    if(element) Object.assign(this.cache,{element});
    // useDefaultStyle && this.style({ 
    //   position: "relative",
    //   boxSizing:"border-box",
    //   margin:0,
    //   padding:0,
    //   width : "auto",
    //   height : "auto"
    //  });
    this.items = new UIStore();
    globalThis.__Ziko__.__UI__[this.cache.name]?globalThis.__Ziko__.__UI__[this.cache.name]?.push(this):globalThis.__Ziko__.__UI__[this.cache.name]=[this];
    element && render && this?.render?.()
    if(
      // globalThis.__Ziko__.__Config__.renderingMode !== "spa" 
      // && 
      // !globalThis.__Ziko__.__Config__.isSSC
      // && 
      this.isInteractive()){
      // this.setAttr("ziko-hydration-index", globalThis.__Ziko__.__HYDRATION__.index);
      // this.element.setAttribute('ziko-hydration-index', globalThis.__Ziko__.__HYDRATION__.index)
      globalThis.__Ziko__.__HYDRATION__.register(() => this)
    }
    globalThis.__Ziko__.__UI__.push(this)
  }
  get element(){
    return this.cache.element;
  }
    [Symbol.iterator]() {
    return this.items[Symbol.iterator]();
  }
  maintain() {
    for (let i = 0; i < this.items.length; i++) {
      Object.defineProperty(this, i, {
        value: this.items[i],
        writable: true,
        configurable: true,
        enumerable: false 
        });
    }
  }
  isInteractive(){
    return this.cache.isInteractive;
  }
  isUIElement(){
    return true;
  }
//   get st(){
//     return this.cache.style;
//   }
//   get attr(){
//     return this.cache.attributes;
//   }
//   get evt(){
//     return this.events;
//   }
//   get html(){
//     return this.element.innerHTML;
//   }
//   get text(){
//     return this.element.textContent;
//   }
//   get isBody(){
//     return this.element === globalThis?.document.body;
//   }
//   get parent(){
//     return this.cache.parent;
//   }
//   get width(){
//     return this.element.getBoundingClientRect().width;
//   }
//   get height(){
//     return this.element.getBoundingClientRect().height;
//   }
//   get top(){
//     return this.element.getBoundingClientRect().top;
//   }
//   get right(){
//     return this.element.getBoundingClientRect().right;
//   }
//   get bottom(){
//     return this.element.getBoundingClientRect().bottom;
//   }
//   get left(){
//     return this.element.getBoundingClientRect().left;
//   }
//   clone(render=false) {
//     // UI.__proto__=this.__proto__;
//     // if(this.items.length){
//     //   const items = [...this.items].map(n=>n.clone());
//     //   UI.append(...items);
//     // }
//     // else UI.element=this.element.cloneNode(true);
//     // return UI.render(render);
//   }

//   freeze(freeze){
//     this.cache.isFrozzen=freeze;
//     return this;
//   }
  // setTarget(tg) {
  //   if(this.isBody) return ;
  //   if (tg?.isUIElement) tg = tg.element;
  //   this.unrender();
  //   this.target = tg;
  //   this.render();
  //   return this;
  // }
//   describe(label){
//     if(label)this.setAttr("aria-label",label)
//   }
//   get children() {
//     return [...this.element.children];
//   }
//   get cloneElement() {
//     return this.element.cloneNode(true);
//   }
//   setClasses(...value) {
//     this.setAttr("class", value.join(" "));
//     return this;
//   }
//   get classes(){
//     const classes=this.element.getAttribute("class");
//     return classes===null?[]:classes.split(" ");
//   }
//   addClass() {
//     /*this.setAttr("class", value);
//         return this;*/
//   }
//   setId(id) {
//     this.setAttr("id", id);
//     return this;
//   }
//   get id() {
//     return this.element.getAttribute("id");
//   }
//   onSwipe(width_threshold, height_threshold,...callbacks){
//     if(!this.events.swipe)this.events.swipe = useSwipeEvent(this, width_threshold, height_threshold);
//     this.events.swipe.onSwipe(...callbacks);
//     return this;
//   }
  // To Fix
  // onKeysDown({keys=[],callback}={}){
  //   if(!this.events.key)this.events.key = useKeyEvent(this);
  //   this.events.key.handleSuccessifKeys({keys,callback});
  //   return this;
  // }
  // onSelect(...callbacks){
  //   if(!this.events.clipboard)this.events.clipboard = useClipboardEvent(this);
  //   this.events.clipboard.onSelect(...callbacks);
  //   return this;
  // }
//   on(event_name,...callbacks){
//     if(!this.events.custom)this.events.custom = useCustomEvent(this);
//     this.events.custom.on(event_name,...callbacks);
//     return this;
//   }
//   emit(event_name,detail={}){
//     if(!this.events.custom)this.events.custom = useCustomEvent(this);
//     this.events.custom.emit(event_name,detail);
//     return this;
//   }
//   watchAttr(callback){
//     if(!this.observer.attr)this.observer.attr = watchAttr(this,callback);
//     return this;
//   }
//   watchChildren(callback){
//     if(!this.observer.children)this.observer.children = watchChildren(this,callback);
//     return this;
//   }
//   watchSize(callback){
//     if(!this.observer.resize)this.observer.resize = watchSize(this,callback);
//     this.observer.resize.start();
//     return this;
//   }
//   watchIntersection(callback,config){
//     if(!this.observer.intersection)this.observer.intersection = watchIntersection(this,callback,config);
//     this.observer.intersection.start();
//     return this;
//   }

}
export { UIElementCore }
