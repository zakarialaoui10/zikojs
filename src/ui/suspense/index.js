import UIElement from "../constructors/UIElement";
class ZikoUISuspense extends UIElement{
    constructor(fallback_ui, callback){
        super({element : "div", name : "suspense"})
        this.setAttr({
            dataTemp : "suspense"
        })
        this.fallback_ui = fallback_ui
        this.append(fallback_ui);
        (async ()=>{
            try{
                const ui = await callback()
                fallback_ui.unrender()
                this.append(ui)
                // console.log(content)
            }
            catch(error){
                console.log({error})
            }
        })()
    }
}

const Suspense = (fallback_ui, callback) => new ZikoUISuspense(fallback_ui, callback);
export{
    ZikoUISuspense,
    Suspense
}