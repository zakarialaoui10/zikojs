import UINode from "./UINode.js";
import { register } from "../../__helpers__/register/index.js";
import { 
  AttrsMethods,
  DomMethods,
  IndexingMethods,
  EventsMethodes,
  StyleMethods
} from "../__methods__/index.js";

import { 
  useCustomEvent,
  useSwipeEvent,
  watchIntersection, 
  watchSize,
  watchAttr,
  watchChildren
} from "../../reactivity/index.js"
// import { Random } from "../../math/index.js";
import {__init__global__, UIStore} from '../../__ziko__/index.js';
__init__global__()
class UIElement extends UINode{
  constructor({element, name ='', type="html", render = __Ziko__.__Config__.default.render, useDefaultStyle=false}={}){
    super()
    this.target = globalThis.__Ziko__.__Config__.default.target||globalThis?.document?.body;
    if(typeof element === "string") {
      switch(type){
        case "html" : element = globalThis?.document?.createElement(element); break;
        case "svg" : element = globalThis?.document?.createElementNS("http://www.w3.org/2000/svg", element);
        default : throw Error("Not supported")
      }
    }
    else{
      this.target = element?.parentElement;
    }
    register(
      this, 
      AttrsMethods, 
      DomMethods, 
      StyleMethods,
      IndexingMethods, 
      EventsMethodes
    );
    Object.assign(this.cache, {
      name,
      isInteractive : [true, false][Math.floor(2*Math.random())],
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
    // this.uuid = `${this.cache.name}-${Random.string(16)}`
    this.ui_index = globalThis.__Ziko__.__CACHE__.get_ui_index();
    useDefaultStyle && this.style({ 
      position: "relative",
      boxSizing:"border-box",
      margin:0,
      padding:0,
      width : "auto",
      height : "auto"
     });
    this.items = new UIStore();
    globalThis.__Ziko__.__UI__[this.cache.name]?globalThis.__Ziko__.__UI__[this.cache.name]?.push(this):globalThis.__Ziko__.__UI__[this.cache.name]=[this];
    element && render && this?.render?.()
    if(
      // globalThis.__Ziko__.__Config__.renderingMode !== "spa" 
      // && 
      // !globalThis.__Ziko__.__Config__.isSSC
      // && 
      this.isInteractive()
    ){
      this.setAttr("ziko-hydration-index", globalThis.__Ziko__.__HYDRATION__.index);
      globalThis.__Ziko__.__HYDRATION__.register(() => this)
    }
    globalThis.__Ziko__.__UI__.push(this)
  }
  get element(){
    return this.cache.element;
  }
  isInteractive(){
    return this.cache.isInteractive;
  }
  isZikoUIElement(){
    return true;
  }
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
  clone(render=false) {
    const UI = new this.constructor();
    UI.__proto__=this.__proto__;
    if(this.items.length){
      const items = [...this.items].map(n=>n.clone());
      UI.append(...items);
    }
    else UI.element=this.element.cloneNode(true);
    return UI.render(render);
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
  freeze(freeze){
    this.cache.isFrozzen=freeze;
    return this;
  }
  setTarget(tg) {
    if(this.isBody) return ;
    if (tg?.isZikoUIElement) tg = tg.element;
    this.unrender();
    this.target = tg;
    this.render();
    return this;
  }
  describe(label){
    if(label)this.setAttr("aria-label",label)
  }
  get children() {
    return [...this.element.children];
  }
  get cloneElement() {
    return this.element.cloneNode(true);
  }
  setClasses(...value) {
    this.setAttr("class", value.join(" "));
    return this;
  }
  get classes(){
    const classes=this.element.getAttribute("class");
    return classes===null?[]:classes.split(" ");
  }
  addClass() {
    /*this.setAttr("class", value);
        return this;*/
  }
  setId(id) {
    this.setAttr("id", id);
    return this;
  }
  get id() {
    return this.element.getAttribute("id");
  }
  onSwipe(width_threshold, height_threshold,...callbacks){
    if(!this.events.swipe)this.events.swipe = useSwipeEvent(this, width_threshold, height_threshold);
    this.events.swipe.onSwipe(...callbacks);
    return this;
  }
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
  on(event_name,...callbacks){
    if(!this.events.custom)this.events.custom = useCustomEvent(this);
    this.events.custom.on(event_name,...callbacks);
    return this;
  }
  emit(event_name,detail={}){
    if(!this.events.custom)this.events.custom = useCustomEvent(this);
    this.events.custom.emit(event_name,detail);
    return this;
  }
  watchAttr(callback){
    if(!this.observer.attr)this.observer.attr = watchAttr(this,callback);
    return this;
  }
  watchChildren(callback){
    if(!this.observer.children)this.observer.children = watchChildren(this,callback);
    return this;
  }
  watchSize(callback){
    if(!this.observer.resize)this.observer.resize = watchSize(this,callback);
    this.observer.resize.start();
    return this;
  }
  watchIntersection(callback,config){
    if(!this.observer.intersection)this.observer.intersection = watchIntersection(this,callback,config);
    this.observer.intersection.start();
    return this;
  }

}
export default UIElement;
