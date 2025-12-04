import {UINode} from "./UINode.js";
import {__init__global__} from '../../__ziko__/index.js';
import { UIStore } from "../../__ziko__/__ui__.js";
__init__global__()
class UIElementCore extends UINode{
  constructor(){
    super()
  }
  init(element, name, type, render){
    this.target = globalThis.__Ziko__.__Config__.default.target||globalThis?.document?.body;
    if(typeof element === "string") {
      switch(type){
        case "html" : {
          element = globalThis?.document?.createElement(element);
          // console.log('1')
        }; break;
        case "svg" : {
          element = globalThis?.document?.createElementNS("http://www.w3.org/2000/svg", element); 
          // console.log('2')
        }; break;
        default : throw Error("Not supported")
      }
    }
    else this.target = element?.parentElement;
    Object.assign(this.cache, {
      name,
      isInteractive : false,
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
}
export { UIElementCore }
