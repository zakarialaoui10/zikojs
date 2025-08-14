import { Random } from "../math/random/index.js";
class ZikoUseChannel{
    constructor(name = ""){
        this.channel = new BroadcastChannel(name);
        this.EVENTS_DATAS_PAIRS = new Map();
        this.EVENTS_HANDLERS_PAIRS = new Map();
        this.LAST_RECEIVED_EVENT = "";
        this.UUID="ziko-channel"+Random.string(10);
        this.SUBSCRIBERS = new Set([this.UUID]);
    }
    get broadcast(){
        // update receiver
        return this;
    }
    emit(event, data){
        this.EVENTS_DATAS_PAIRS.set(event,data)
        this.#maintainEmit(event);
        return this;
    }
    on(event,handler=console.log){
        this.EVENTS_HANDLERS_PAIRS.set(event,handler);
        this.#maintainOn()
        return this;
    }
    #maintainOn(){
        this.channel.onmessage = (e) => {
            this.LAST_RECEIVED_EVENT=e.data.last_sended_event;
            const USER_ID=e.data.userId;
            this.SUBSCRIBERS.add(USER_ID)
            const Data=e.data.EVENTS_DATAS_PAIRS.get(this.LAST_RECEIVED_EVENT)
            const Handler=this.EVENTS_HANDLERS_PAIRS.get(this.LAST_RECEIVED_EVENT)
            if(Data && Handler)Handler(Data)
          };
          return this;
    }
    #maintainEmit(event){
        this.channel.postMessage({
            EVENTS_DATAS_PAIRS:this.EVENTS_DATAS_PAIRS,
            last_sended_event:event,
            userId:this.UUID
        });
        return this;
    }
    close(){
        this.channel.close();
        return this;
    }
}
const useChannel = name => new ZikoUseChannel(name);
export{ useChannel }