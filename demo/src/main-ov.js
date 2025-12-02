import { UIElement, tags } from "ziko";

globalThis.a = tags.p('Test')
a.mount(document.body)
a.style({
    // position : 'absolute',
    // top : '1000px',
    width : '60vw',
    height : '400px',
    border : '1px red dotted',
    userSelect: 'none',
    touchAction: 'none',
})

a.onClick(()=>console.log('1'))
a.onSwipeRight(e=>console.log(1111))

a.onResizeView(e=> console.log('resized'))

// a.element.addEventListener('swiperight', ()=> console.log('swipe r'))
// a.element.addEventListener('enterView', ()=> console.log('enter'))
// a.element.addEventListener('enterView', ()=> console.log('enter'))

a.on('ev', e => console.log(e.event))
a.emit('ev', { a : 1})

a.onEnterView(e=>console.log(e))


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