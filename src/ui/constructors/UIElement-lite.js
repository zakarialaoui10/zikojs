import { UIElementCore } from "./UIElementCore";
class UIElement extends UIElementCore{
    constructor({element, name, type, render}){
        super({element, name, type, render})
    }
}

export {
    UIElement
}