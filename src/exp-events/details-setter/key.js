export function key_details_setter(){
    switch(this.currentEvent){
        case "keydown" : {
            this.kd = this.event.key
        }; break;
        case "keypress" : {
            this.kp = this.event.key
        }; break;
        case "keyup" : {
            this.ku = this.event.key
        }; break;

    }
}