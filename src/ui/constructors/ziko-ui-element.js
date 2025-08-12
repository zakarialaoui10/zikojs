import ZikoUINode from "./ziko-ui-node.js";
import { compose } from "../../__helpers__/index.js";
import { DomMethods } from "../methods/dom.js";
import { IndexingMethods } from "../methods/indexing.js";
import { EventsMethodes } from "../methods/events.js";
import { ZikoUseStyle } from "../../reactivity/hooks/UI/useStyle.js";
import { ZikoUIElementStyle } from "../style/index.js";
import { 
  useCustomEvent,
  useSwipeEvent,
  watchIntersection, 
  watchSize,
  watchAttr,
  watchChildren
} from "../../reactivity/index.js"
import { Random } from "../../math/index.js";
import { Str } from "../../data/index.js";
class ZikoUIElement extends ZikoUINode{
  constructor(element, name="", {el_type="html", useDefaultStyle=false}={}){
    super()
    this.target = globalThis.__Ziko__.__Config__.default.target||globalThis?.document?.body;
    if(typeof element === "string") {
      switch(el_type){
        case "html" : element = globalThis?.document?.createElement(element); break;
        case "svg" : element = globalThis?.document?.createElementNS("http://www.w3.org/2000/svg", element);
        default : throw Error("Not supported")
      }
    }
    else{
      this.target = element.parentElement;
    }
    // if(element)this.__ele__ = element;
    compose(
      this, 
      DomMethods,
      IndexingMethods,
      EventsMethodes
    )
    // if(false){
    //   import("../methods/tree.js").then(({ default: ExternalMethods }) => {
    //     compose(this, ExternalMethods);
    //   });
    // }
    Object.assign(this.cache, {
      name,
      isInteractive : [true, false][Math.floor(2*Math.random())],
      parent:null,
      isBody:false,
      isRoot:false,
      isHidden: false,
      isFrozzen:false,
      legacyParent : null,
      style: new ZikoUIElementStyle({}),
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
    if(element)Object.assign(this.cache,{element});
    this.uuid = `${this.cache.name}-${Random.string(16)}`
    this.ui_index = globalThis.__Ziko__.__CACHE__.get_ui_index();
    this.cache.style.linkTo(this);
    useDefaultStyle && this.style({ 
      position: "relative",
      boxSizing:"border-box",
      margin:0,
      padding:0,
      width : "auto",
      height : "auto"
     });
    this.items = [];
    globalThis.__Ziko__.__UI__[this.cache.name]?globalThis.__Ziko__.__UI__[this.cache.name]?.push(this):globalThis.__Ziko__.__UI__[this.cache.name]=[this];
    element && globalThis.__Ziko__.__Config__.default.render && this?.render?.()
    if(
      // globalThis.__Ziko__.__Config__.renderingMode !== "spa" 
      // && 
      // !globalThis.__Ziko__.__Config__.isSSC
      // && 
      this.isInteractive()
    ){
      this.setAttr("ziko-hydration-index", globalThis.__Ziko__.__HYDRATION__.index);
      globalThis.__Ziko__.__HYDRATION__.map.set(globalThis.__Ziko__.__HYDRATION__.index, ()=>this);
      globalThis.__Ziko__.__HYDRATION__.increment()
    }
  }
  get element(){
    return this.cache.element;
  }
  isInteractive(){
    return this.cache.isInteractive;
  }
  // Remove get
  isZikoUIElement(){
    return true;
  }
  register(){

    return this;
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
  style(styles){
    styles instanceof ZikoUseStyle ? this.st.style(styles.current): this.st.style(styles);
    return this;
  }
  size(width,height){
    this.st.size(width,height);
    return this; 
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
  filter(condition_callback, if_callback = () => {}, else_callback = () => {}) {
    const FilterItems = this.items.filter(condition_callback);
    FilterItems.forEach(if_callback);
    this.items
      .filter((item) => !FilterItems.includes(item))
      .forEach(else_callback);
    return this;
  }
  filterByTextContent(text, exactMatch = false) {
    this.items.forEach((n) => n.render());
    this.filter(
      (n) => !(exactMatch ? n.text === text : n.text.includes(text)),
      (e) => e.unrender(),
    );
    // this.items.filter(n=>{
    //   const content=n.element.textContent;
    //   return !(exactMatch?content===text:content.includes(text))
    // }).map(n=>n.unrender());
    //  return this;
  }
  filterByClass(value) {
    this.items.map((n) => n.render());
    this.items
      .filter((n) => !n.classes.includes(value))
      .map((n) => n.unrender());
    return this;
  }
  sortByTextContent(value, displays) {
    let item = this.children;
    item
      .filter((n) => !n.textContent.toLowerCase().includes(value.toLowerCase()))
      .map((n) => {
        n.style.display = "none";
      });
    item
      .filter((n) => n.textContent.toLowerCase().includes(value.toLowerCase()))
      .map((n, i) => (n.style.display = displays[i]));
    //return item.filter(n=>n.style.display!="none")
    item.filter((n) => n.style.display != "none");
    return this;
  }
  get #SwitchedStyleRTL_LTR(){
    const CalculedStyle = globalThis.getComputedStyle(this.element); 
    const SwitchedStyle = {}
    if(CalculedStyle.marginRight!=="0px")Object.assign(SwitchedStyle, {marginLeft: CalculedStyle.marginRight});
    if(CalculedStyle.marginLeft!=="0px")Object.assign(SwitchedStyle, {marginRight: CalculedStyle.marginLeft});
    if(CalculedStyle.paddingRight!=="0px")Object.assign(SwitchedStyle, {paddingLeft: CalculedStyle.paddingRight});
    if(CalculedStyle.paddingLeft!=="0px")Object.assign(SwitchedStyle, {paddingRight: CalculedStyle.paddingLeft});
    if(CalculedStyle.left!=="0px")Object.assign(SwitchedStyle, {right: CalculedStyle.left});
    if(CalculedStyle.right!=="0px")Object.assign(SwitchedStyle, {left: CalculedStyle.right});
    if(CalculedStyle.textAlign === "right")Object.assign(SwitchedStyle, {textAlign: "left"});
    if(CalculedStyle.textAlign === "left")Object.assign(SwitchedStyle, {textAlign: "right"});
    if(CalculedStyle.float === "right")Object.assign(SwitchedStyle, {float: "left"});
    if(CalculedStyle.float === "left")Object.assign(SwitchedStyle, {float: "right"});
    if(CalculedStyle.borderRadiusLeft!=="0px")Object.assign(SwitchedStyle, {right: CalculedStyle.borderRadiusRight});
    if(CalculedStyle.borderRadiusRight!=="0px")Object.assign(SwitchedStyle, {right: CalculedStyle.borderRadiusLeft});
    if(["flex","inline-flex"].includes(CalculedStyle.display)){
      if(CalculedStyle.justifyContent === "flex-end")Object.assign(SwitchedStyle, {justifyContent: "flex-start"});
      if(CalculedStyle.justifyContent === "flex-start")Object.assign(SwitchedStyle, {justifyContent: "flex-end"});
    }
    return SwitchedStyle;
  }
  useRtl(switchAll = false){
    switchAll ? this.style({
      ...this.#SwitchedStyleRTL_LTR,
      direction : "rtl"
    }) : this.style({direction : "rtl"}); 
    return this;
  }
  useLtr(switchAll = false){
    switchAll ? this.style({
      ...this.#SwitchedStyleRTL_LTR,
      direction : "ltr"
    }) : this.style({direction : "ltr"}); 
    return this;
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
  animate(keyframe, {duration=1000, iterations=1, easing="ease"}={}){
    this.element?.animate(keyframe,{duration, iterations, easing});
    return this;
  }
    // Attributes
  #setAttr(name, value){
    if(this.element.tagName !== "svg") name = Str.isCamelCase(name) ? Str.camel2hyphencase(name) : name;
    if(this?.attr[name] && this?.attr[name]===value) return;
    this.element.setAttribute(name, value)
    Object.assign(this.cache.attributes, {[name]:value});
  }
  setAttr(name, value) {
    if(name instanceof Object){
      const [names,values]=[Object.keys(name),Object.values(name)];
      for(let i=0;i<names.length;i++){
        if(values[i] instanceof Array)value[i] = values[i].join(" ");
        this.#setAttr(names[i], values[i])
      }
    }
    else{
      if(value instanceof Array)value = value.join(" ");
      this.#setAttr(name, value)
    }
    return this;
  }
  removeAttr(...names) {
    for(let i=0;i<names.length;i++)this.element?.removeAttribute(names[i]);
    return this;
  }
  getAttr(name){
    name = Str.isCamelCase(name) ? Str.camel2hyphencase(name) : name;
    return this.element.attributes[name].value;
  }
  setContentEditable(bool = true) {
    this.setAttr("contenteditable", bool);
    return this;
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
  // setFullScreen(set = true, e) {
  //   if(!this.element.requestFullscreen){
  //     console.error("Fullscreen API is not supported in this browser.");
  //     return this;
  //   }
  //   if (set) this.element.requestFullscreen(e);
  //   else globalThis.document.exitFullscreen();
  //   return this;
  // }
  // toggleFullScreen(e) {
  //   if (!globalThis.document.fullscreenElement) this.element.requestFullscreen(e);
  //   else globalThis.document.exitFullscreen();
  //   return this;
  // }
}
export default ZikoUIElement;
