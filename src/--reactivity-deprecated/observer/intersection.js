class ZikoIntersectionObserver{
    constructor(UIElement,callback,{threshold=0,margin=0}={}){
        this.target=UIElement;
        this.config={
            threshold,
            margin
        }
        if(!globalThis.IntersectionObserver){
            console.log("IntersectionObserver Not Supported")
            return;
        }
        this.observer=new IntersectionObserver((entries)=>{
            this.entrie=entries[0];
            callback(this)
        },{
            threshold:this.threshold,
        })
    }
    get ratio(){
        return this.entrie.intersectionRatio;
    }
    get isIntersecting(){
        return this.entrie.isIntersecting;
    }
    setThreshould(threshold){
        this.config.threshold=threshold;
        return this;
    }
    setMargin(margin){
        margin=(typeof margin === "number")?margin+"px":margin;
        this.config.margin=margin;
        return this;
    }
    start(){
        this.observer.observe(this.target.element);
        return this;
    }
    stop(){
        return this;
    }
}

const watchIntersection=(UI,callback,config)=>new ZikoIntersectionObserver(UI,callback,config);
export {watchIntersection}