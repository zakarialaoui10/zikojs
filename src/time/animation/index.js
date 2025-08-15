import { Ease } from "../utils";
import { map } from "../../math/utils"
class ZikoTimeAnimation{
    constructor(callback,ease=Ease.Linear,step=50,{t=[0,null],start=true,duration=3000}={}){
        this.cache={
            isRunning:false,
            AnimationId:null,
            startTime:null,
            ease,
            step,
            intervall:t,
            started:start,
            duration
        }
        this.t=0;
        this.tx=0;
        this.ty=0;
        this.i=0;
        this.callback=callback;
    }
    #animation_handler(){
            this.t+=this.cache.step;
            this.i++;
            this.tx=map(this.t,0,this.cache.duration,0,1);
            this.ty=this.cache.ease(this.tx);
            this.callback(this)
            if(this.t>=this.cache.duration){
                clearInterval(this.cache.AnimationId);
                this.cache.isRunning=false;
            }
    }
    reset(restart=true){
        this.t=0
        this.tx=0;
        this.ty=0;
        this.i=0;
        if(restart)this.start();
        return this;
    }
    #animate(reset=true){
        if(!this.cache.isRunning){
            if(reset)this.reset(false);
            this.cache.isRunning=true;
            this.cache.startTime = Date.now();
            this.cache.AnimationId=setInterval(this.#animation_handler.bind(this),this.cache.step);
        }
        return this;
    }
    start(){
        this.#animate(true);
        return this;
    }
    pause(){
        if (this.cache.isRunning) {
            clearTimeout(this.cache.AnimationId);
            this.cache.isRunning = false;
          }
        return this;
    }
    resume(){
        this.#animate(false);
        return this;
    }
    stop(){
        this.pause();
        this.reset(false);
        return this;
    }
    // clear(){
    // }
    // stream(){
    // }
}

const useAnimation=(callback,ease=Ease.Linear,step=50,config)=>new ZikoTimeAnimation(callback,ease=Ease.Linear,step=50,config)
export{useAnimation}