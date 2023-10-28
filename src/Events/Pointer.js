import Garbage from "./Garbage.js"
class ZikoEventPointer{
        #downController
        #moveController
        #upController
        #enterController
        #outController
        #leaveController
        #dispose
    constructor(target){
        this._Target=window;
        this.event=null;
        this.dx=0;
        this.dy=0;
        this.dt=0;
        this.mx=0;
        this.my=0;
        this.mt=0;
        this.ux=0;
        this.uy=0;      
        this.ut=0;
        this.isMoving=false;
        this.isDown=false;
        this.cache={
            preventDefault:{
                down:false,
                move:false,
                up:false,
                enter:false,
                out:false,
                leave:false,
            },
            Enabled:{
                down:false,
                move:false,
                up:false,
                enter:false,
                out:false,
                leave:false,
            },
            callback:{
                down:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                move:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                up:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})],
                enter:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                out:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                leave:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})]
            },
            down:[],
            move:[],
            up:[],
            enter:[],
            out:[],
            leave:[]
        }
        this.#downController=this.#updateDown.bind(this);
        this.#moveController=this.#updateMove.bind(this);
        this.#upController=this.#updateUp.bind(this);
        this.#enterController=this.#updateEnter.bind(this);
        this.#outController=this.#updateOut.bind(this);
        this.#leaveController=this.#updateLeave.bind(this);
        this.#dispose=this.dispose.bind(this);
        this.EventIndex=Garbage.Pointer.data.length;
        Garbage.Pointer.data.push({event:this,index:this.EventIndex});
        this.target(target);
    }
    target(UI){
        this._Target=UI?.element||document.querySelector(UI);
        return this;
    }
    #updateDown(e){
        this.event=e
        if(this.cache.preventDefault.down)e.preventDefault();
        this.dx=parseInt(e.offsetX);
        this.dy=parseInt(e.offsetY);
        this.isDown=true;
        if(this.cache.Enabled.down)this.cache.down.push({x:this.dx,y:this.dy});
        this.cache.callback.down.map(n=>n(this));
        return this;
    }
    handleDown(){
       this._Target.addEventListener("pointerdown",this.#downController);
       return this;
    }
    #updateMove(e){
        this.event=e;
        if(this.cache.preventDefault.move)e.preventDefault();
        this.mx=parseInt(e.offsetX);
        this.my=parseInt(e.offsetY);
        this.isMoving=true;
        if(this.cache.Enabled.move)this.cache.move.push({x:this.mx,y:this.my,down:this.isDown,t:this.mt});
        this.cache.callback.move.map(n=>n(this)); 
        return this;
        
    }
    handleMove(){
       this._Target.addEventListener("pointermove",this.#moveController);
       return this;
    }
    #updateUp(e){
        this.event=e;
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.up)this.cache.up.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callback.up.map(n=>n(this)); 
        return Pointer;
    }
    handleUp(){
       this._Target.addEventListener("pointerup",this.#upController);
       return this;
    }
    #updateEnter(e){
        this.event=e;
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.enter)this.cache.enter.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callback.enter.map(n=>n(this)); 
        return Pointer;
    }
    handleEnter(){
       this._Target.addEventListener("pointerenter",this.#enterController);
       return this;
    }
    #updateOut(e){
        this.event=e;
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.out)this.cache.out.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callback.out.map(n=>n(this)); 
        return Pointer;
    }
    handleOut(){
       this._Target.addEventListener("pointerout",this.#outController);
       return this;
    }
    #updateLeave(e){
        this.event=e;
        if(this.cache.preventDefault.up)e.preventDefault();
        this.ux=parseInt(e.offsetX);
        this.uy=parseInt(e.offsetY);
        this.isDown=false;
        if(this.cache.Enabled.leave)this.cache.leave.push({x:this.ux,y:this.uy,t:this.ut});
        this.cache.callback.leave.map(n=>n(this)); 
        return Pointer;
    }
    handleLeave(){
       this._Target.addEventListener("pointerleave",this.#leaveController);
       return this;
    }
    handle({down=false,move=false,up=false}={}){
        if(down)this.handleDown();
        if(move)this.handleMove();
        if(up)this.handleUp()
    }
    dispose({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        if(down)this._Target.removeEventListener("pointerdown",this.#downController);
        if(move)this._Target.removeEventListener("pointermove",this.#moveController);
        if(up)this._Target.removeEventListener("pointerup",this.#upController);
        if(enter)this._Target.removeEventListener("pointerenter",this.#enterController);
        if(out)this._Target.removeEventListener("pointerout",this.#outController);
        if(leave)this._Target.removeEventListener("pointerleave",this.#leaveController);
        return this;
     }
    stream({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        Object.assign(this.cache.Enabled,{down,move,up,enter,out,leave});
        return this;
     }
    clear({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        if(down)this.cache.down=[];
        if(move)this.cache.move=[];
        if(up)this.cache.up=[];
        if(enter)this.cache.enter=[];
        if(out)this.cache.out=[];
        if(leave)this.cache.leave=[];
        return this;
    }
     preventDefault({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
        Object.assign(this.cache.preventDefault,{down,move,up,enter,out,leave});
        return this;
     }
     onDown(...callback){
        if(callback.length===0)return this;
        this.cache.callback.down=callback.map(n=>e=>n.call(this,e));
        return this;
     }
     onMove(...callback){
        if(callback.length===0)return this;
        this.cache.callback.move=callback.map(n=>e=>n.call(this,e));
        return this;
     }
     onUp(...callback){
        if(callback.length===0)return this;
        this.cache.callback.up=callback.map(n=>e=>n.call(this,e));
        return this;
     }
     onEnter(...callback){
        if(callback.length===0)return this;
        this.cache.callback.enter=callback.map(n=>e=>n.call(this,e));
        return this;
     }
     onOut(...callback){
        if(callback.length===0)return this;
        this.cache.callback.out=callback.map(n=>e=>n.call(this,e));
        return this;
     }
     onLeave(...callback){
        if(callback.length===0)return this;
        this.cache.callback.leave=callback.map(n=>e=>n.call(this,e));
        return this;
     }
}
var Pointer=target=>new ZikoEventPointer(target)
export default Pointer

/*
Pointer._Target=document.querySelector(".input")
Pointer.handleDown()
Pointer.handleMove()
Pointer.handleUp()
*/