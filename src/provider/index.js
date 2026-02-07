export class ZikoProvider {
    init(component){
        if(component instanceof ZikoProvider) this.component = component.component; 
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