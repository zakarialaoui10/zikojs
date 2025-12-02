import { UIElement } from "ziko/ui";

class Ov extends UIElement{
    constructor(items){
        super({element : 'div'})
        this.append(items)
    }
    append(){
        return 1
    }
    show(){
        console.log(1)
    }
}

globalThis.ov = new Ov('jkj')
ov.show()