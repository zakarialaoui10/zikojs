class ZikoResizeObserver{
    constructor(UIElement,callback){
        this.target=UIElement;
        this.contentRect=null;
        this.observer=new ResizeObserver(()=>{
           callback(this)
        })
    }
    get BoundingRect(){
        return this.target.element.getBoundingClientRect();
    }
    get width(){
        return this.BoundingRect.width;
    }
    get height(){
        return this.BoundingRect.height;
    }
    get top(){
        return this.BoundingRect.top;
    }
    get bottom(){
        return this.BoundingRect.bottom;
    }
    get right(){
        return this.BoundingRect.right;
    }
    get left(){
        return this.BoundingRect.left;
    }
    get x(){
        return this.BoundingRect.x;
    }
    get y(){
        return this.BoundingRect.y;
    }
    start(){
        this.observer.observe(this.target.element);
        return this;
    }
    stop(){
        this.observer.unobserve(this.target.element);
        return this;
    }
}

const watchSize=(UI,callback)=>new ZikoResizeObserver(UI,callback)
export {watchSize}