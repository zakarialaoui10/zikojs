import { UIElement } from "ziko/ui";

class Ov extends UIElement{
    constructor(items){
        super({element : 'div'})
        this.append(items)
    }
    show(){
        console.log(1)
    }
}

const ov = new Ov('jkj')
ov.show()