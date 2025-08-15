export const __UI__={
    __all__(){
        return Object.values(this)
          .filter(Array.isArray)
          .flat();
    },
    querySelectorAll(){
        return this.__all__().filter(n=>n)
    },
    getElementByIndex(index){
        return this.__all__().find(n=>n.ui_index===index);
    },
    getElementById(id){
        return null;
    },
    getElementsByClass(){

    },
    getElementsByTagName(){
        
    }
}