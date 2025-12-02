import { ZikoEvent , EVENT_CONTROLLER } from "./ZikoEvent.js";
function input_controller(e){
    EVENT_CONTROLLER.call(this,e,"input",null,null)
}
function change_controller(e){
    EVENT_CONTROLLER.call(this,e,"change",null,null)
}
class ZikoEventInput extends ZikoEvent{
    constructor(target){
        super(target);
        this.event=null;
        this.cache={
            prefixe:"",
            preventDefault:{
                input:false,
                change:false,
            },
            paused:{
                input:false,
                change:false,      
            },
            stream:{
                enabled:{
                    input:false,
                    change:false,
                },
                clear:{
                    input:false, 
                    change:false,         
                },
                history:{
                    input:[],
                    change:[],
                }
            },
            callbacks:{
                input:[],
                change:[],
            }
        }
        this.__controller={
            input:input_controller.bind(this),
            change:change_controller.bind(this),
        }
    }
    get value(){
        return this.target.value;
    }
    onInput(...callbacks){
        this.__onEvent("input",{},...callbacks)
        return this;
     }
    onChange(...callbacks){
        this.__onEvent("change",{},...callbacks)
        return this;
     }     
}
const useInputEvent=target=>new ZikoEventInput(target);
export{
    useInputEvent,
    ZikoEventInput
}