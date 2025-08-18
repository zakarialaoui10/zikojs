export default class UINode {
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

globalThis.node = (node) => new UINode(node);