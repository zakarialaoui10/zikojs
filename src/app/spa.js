import { text } from "../ui/index.js";
import { dynamicRoutesParser,routesMatcher,isDynamic } from "./routes.js";
import { ZikoApp } from "./ziko-app.js";
class ZikoSPA extends ZikoApp{
    constructor({head, wrapper, target, routes}){
        super({head, wrapper, target})
        this.routes=new Map([
            ["404",text("Error 404")],
            ...Object.entries(routes)
        ]);
        this.clear();
        globalThis.onpopstate = this.render(location.pathname);
    }
    clear(){
        [...this.routes].forEach(n=>{
            !isDynamic(n[0]) && n[1]?.isZikoUIElement && n[1].unrender()
        })   
        // this.wrapper.clear();
        return this;
    }
    render(path){
        const [mask, callback] = [...this.routes].find(route=>routesMatcher(route[0],path));
        let element ;
        if(isDynamic(mask)){
            const params = dynamicRoutesParser(mask, path)
            element = callback.call(this,params)
        }
        else {
            callback?.isZikoUIElement && callback.render(this.wrapper); 
            if(typeof callback === "function") element = callback();  
        }
        if(element?.isZikoUIElement) element.render(this.wrapper);
        // if(element?.isZikoApp) element.render(this.wrapper);
        if(element instanceof Promise){
            element.then(e=>e.render(this.wrapper))
        }
        globalThis.history.pushState({}, "", path);
        return this;
    }
}
const SPA=({head, wrapper, target, routes})=>new ZikoSPA({head, wrapper, target, routes});

export {
    ZikoSPA,
    SPA
}


/*
 // Static 
  S.get("/url",wrapper)
// Dynamique 
 s.get("/url/name/:name/id/:id",(path,name,id)=>handler())
// regEx
*/