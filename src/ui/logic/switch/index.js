import { UIElement } from "../../constructors/UIElement.js";

class UISwitch{
    constructor(key, cases){
        this.key = key; 
        this.cases = cases;
    }
    current_ui(){
        const matched = Object.keys(this.cases).find(n => n == this.key) ?? 'default'
        return this.cases[matched]()
    }
    updateKey(key){
        this.key
    }
    
}

const Switch=({key, cases})=> new UISwitch(key, cases)

export{
    UISwitch, 
    Switch
}

// export const Switch=({key, cases}) => {
//     const matched = Object.keys(cases).find(n => n == key) ?? 'default';
//     return this.cases[matched]()
// }