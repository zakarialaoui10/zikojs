import ZikoCanvasElement from "./_element.js";
class CanvasCircle extends ZikoCanvasElement{
    constructor(x,y,r){
        super(x,y);
        this.r=r;
    }
    draw(ctx){
        if(this.cache.config.rendered){
            ctx.save();
            this.applyNormalStyle(ctx);
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
            const{strokeEnabled,fillEnabled}=this.cache.style.normal;
            if(strokeEnabled)ctx.stroke();
            if(fillEnabled)ctx.fill();
            ctx.closePath(); 
            ctx.restore();
        }
        return this;   
    }
    radius(r){
        this.r=r;
        if(this.parent)this.parent.draw();
        return this;
    }
    distanceFromCenter(x,y){
        return Math.sqrt(
            (this.position.x-x)**2-(this.position.y-y)**2
        )
    }
    isIn(x,y,strict=false){
        return strict?this.distanceFromCenter(x,y)<this.r:this.distanceFromCenter(x,y)<=this.r;
    }
    isInEdges(x,y){
        return this.distanceFromCenter(x,y)===this.r;
    }
}
const canvasCircle=(x,y,r)=>new CanvasCircle(x,y,r)
// function canvasCircle(x,y,r){
//     return function(){
//         this.ctx.beginPath();
//         this.ctx.arc(x, y, r, 0, Math.PI * 2);
//         this.ctx.fill();
//         this.ctx.closePath(); 
//         return this;
//     }  
// }
export{canvasCircle}