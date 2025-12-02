import { UIElement, tags } from "ziko";

globalThis.a = tags.p('Test')
a.mount(document.body)

a.on('ev', e => console.log(e.event))
a.emit('ev', { a : 1})

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