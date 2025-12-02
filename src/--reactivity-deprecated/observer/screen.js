import { map } from "../../math/utils/index.js"
class ZikoScreenObserver {
    constructor(callback=e=>console.log({x:e.x,y:e.y})) {
      this.cache={};
      this.previousX = globalThis?.screenX;
      this.previousY = globalThis?.screenY;
    }
    update(){
        Object.assign(this.cache,{
            screenXLeft : globalThis?.screenX, // CORRECT
            screenXRight : globalThis?.screen.availWidth - globalThis?.screenX, // CORRECT
            screenYTop : globalThis?.screenY, // CORRECT
            screenYBottom : globalThis?.screen.availHeight - globalThis?.screenY - globalThis?.outerHeight, // TO TEST
            screenCenterX : globalThis?.screen.availWidth/2, // CORRECT
            screenCenterY : globalThis?.screen.availHeight/2,// CORRECT
            windowCenterX : globalThis?.outerWidth/2+globalThis?.screenX, // CORRECT
            windowCenterY : globalThis?.outerHeight/2+ globalThis?.screenY, // FALSE
            deltaCenterX : globalThis?.screen.availWidth/2-globalThis?.outerWidth/2+globalThis?.screenX, // CORRECT
            deltaCenterY : null //
        })
    }
    get x0(){
        return map(globalThis?.screenX, 0, globalThis.screen.availWidth, -1, 1);
    }
    get y0(){
        return - map(globalThis?.screenY, 0, globalThis.screen.availHeight, -1, 1);
    }
    get x1(){
        return map(globalThis?.screenX + globalThis?.outerWidth, 0, globalThis.screen.availWidth, -1, 1);
    }
    get y1(){
        return - map(globalThis?.screenY + globalThis?.outerHeight, 0, globalThis.screen.availHeight, -1, 1);
    }
    get cx(){
        return map(globalThis?.outerWidth/2+globalThis?.screenX, 0, globalThis.screen.availWidth, -1, 1);
    }
    get cy(){
        return - map(globalThis?.outerHeight/2+ globalThis?.screenY, 0, globalThis.screen.availHeight, -1, 1);
    }
}

const watchScreen=(callback)=>new ZikoScreenObserver(callback);
export{
    watchScreen
}