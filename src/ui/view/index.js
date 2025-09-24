import { UIElement } from "../constructors/UIElement.js";
class UIView extends UIElement{
    constructor(...items){
        super({element : 'div', name : 'view'})
        this.append(...items)
    }
}

const View = (...items) => new UIView(...items);
export{
    View,
    UIView
} 