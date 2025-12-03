import { ZikoEvent } from "../ziko-event.js";

export class CoordinatesBasedEvent extends ZikoEvent{
    constructor(signature, target = null, Events = [], details_setter, customizer){
        super(signature, target, Events, details_setter, customizer)
        Object.assign(this.cache,{
            useNormalisedCoordinates : false
        })
        this.isDown = false;
        this.isMoving = false;
        this.dx = 0;
        this.dy = 0;
        this.mx = 0;
        this.my = 0;
        this.ux = 0;
        this.uy = 0;
    }
    get isDragging(){
        return this.isDown && this.isMoving
    }
    useNormalisedCoordinates(enable = true){
        this.cache.useNormalisedCoordinates = enable;
        return this;
    }
}