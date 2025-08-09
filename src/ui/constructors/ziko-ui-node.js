export default class ZikoUINode {
    constructor(node){
        this.cache = {
            node
        }
    }
    isZikoUINode(){
        return true
    }
    get node(){
        return this.cache.node;
    } 
}

globalThis.node = (node) => new ZikoUINode(node);