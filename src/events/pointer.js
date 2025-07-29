import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventPointer extends __ZikoEvent__{
    constructor(target, customizer){
        super(target, Events.Pointer, details_setter, customizer);
        this.isDown = false;
    }
}
function details_setter(){
    switch(this.currentEvent){
        case "pointerdown" : {
            this.dx = parseInt(this.event.offsetX);
            this.dy = parseInt(this.event.offsetY);
            this.isDown = true
        }; break;
        case "pointermove" : {
            this.mx = parseInt(this.event.offsetX);
            this.my = parseInt(this.event.offsetY);
            this.isMove = true
        }; break;
        case "pointerup" : {
            this.ux = parseInt(this.event.offsetX);
            this.uy = parseInt(this.event.offsetY);
            this.isDown = false;
            console.log(this.target.width)
            const delta_x=(this.ux-this.dx)/this.target.width;
            const delta_y=(this.dy-this.uy)/this.target.height;
            const HORIZONTAL_SWIPPE=(delta_x<0)?"left":(delta_x>0)?"right":"none";
            const VERTICAL_SWIPPE=(delta_y<0)?"bottom":(delta_y>0)?"top":"none";
            this.swippe={
                h:HORIZONTAL_SWIPPE,
                v:VERTICAL_SWIPPE,
                delta_x,
                delta_y
            }
        }; break;
    }
    // if(this.currentEvent==="click") this.dx = 0
    // else this.dx = 1
    // console.log(this.currentEvent)
}
const __usePointerEvent = (target, customizer) => new ZikoEventPointer(target, customizer)

globalThis.expPointer = __usePointerEvent
export{
    __usePointerEvent,
    ZikoEventPointer
}