import ZikoUIElement from "../../constructors/ziko-ui-element.js";
// function loadComponent() {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(p(1000))
//       }, 500);
//     });
//   }

//   Suspense(p("Loading ..."),()=>fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => h2(json.title)))

 

class ZikoUISuspense extends ZikoUIElement{
    constructor(fallback_ui, callback){
        super("div", "suspense")
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