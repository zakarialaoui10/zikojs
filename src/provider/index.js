export class ZikoProvider {
    constructor(component){
        if(component) this.init(component)
    }
    init(component){
        this.component = component instanceof ZikoProvider ? component.component : component
    }
    get element(){
        return this.component.element;
    }
    mount(target){
        this.component.mount(target);
        return this;
    }
    unmount(){
        this.component.unmount()
    }
}