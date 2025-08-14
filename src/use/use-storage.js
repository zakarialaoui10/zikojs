// To do : remove old items
import { useChannel } from "./use-channel.js";
class ZikoUseStorage{
    constructor(storage, globalKey, initialValue){
        this.cache={
            storage,
            globalKey,
            channel:useChannel(`Ziko:useStorage-${globalKey}`),
            oldItemKeys:new Set()
        }
        this.#init(initialValue);
        this.#maintain();
    }
    get items(){
        return JSON.parse(this.cache.storage[this.cache.globalKey]??null);
    }
    #maintain() {
        for(let i in this.items)Object.assign(this, { [[i]]: this.items[i] });
    }
    #init(initialValue){
        this.cache.channel=useChannel(`Ziko:useStorage-${this.cache.globalKey}`);
        this.cache.channel.on("Ziko-Storage-Updated",()=>this.#maintain());
        if(!initialValue)return;
        if(this.cache.storage[this.cache.globalKey]){
            Object.keys(this.items).forEach(key=>this.cache.oldItemKeys.add(key));
            console.group("Ziko:useStorage")
            console.warn(`Storage key '${this.cache.globalKey}' already exists. we will not overwrite it.`);
            console.info(`%cWe'll keep the existing data.`,"background-color:#2222dd; color:gold;");
            console.group("")
        }
        else this.set(initialValue);
    }
    set(data){
        this.cache.storage.setItem(this.cache.globalKey,JSON.stringify(data));
        this.cache.channel.emit("Ziko-Storage-Updated",{});
        Object.keys(data).forEach(key=>this.cache.oldItemKeys.add(key));
        this.#maintain();
        return this
    }
    add(data){
        const db={
            ...this.items,
            ...data
        }
        this.cache.storage.setItem(this.cache.globalKey,JSON.stringify(db));
        this.#maintain();
        return this;
    }
    remove(...keys){
        const db={...this.items};
        for(let i=0;i<keys.length;i++){
            delete db[keys[i]];
            delete this[keys[i]];
        }
        this.set(db);
        return this;
    }
    get(key){
        return this.items[key];
    }
    clear(){
        this.cache.storage.removeItem(this.cache.globalKey);
        this.#maintain();
        return this;
    }

}
const useLocaleStorage=(key,initialValue)=>new ZikoUseStorage(localStorage,key,initialValue);
const useSessionStorage=(key,initialValue)=>new ZikoUseStorage(sessionStorage,key,initialValue);
export{
    useLocaleStorage,
    useSessionStorage
}