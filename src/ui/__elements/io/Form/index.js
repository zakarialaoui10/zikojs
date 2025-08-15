import { ZikoUIFlex } from "../../flex/index.js";
class ZikoUIForm extends ZikoUIFlex{
    constructor(...items){
        super("form", "Form");
        this.append(...items);
        this.setMethod("POST");
        this.setAction("/");
    }
    setAction(action = "/"){
        this.setAttr("action", action);
        return this;
    }
    setMethod(method = "post"){
        this.setAttr("method", method);
        return this;
    }
    get data(){
        let formData = new FormData(this.element);
        this.items.forEach(n=>{
            if(n.isInput||n.isSelect||n.isTextarea)formData.append(n.element.name, n.value)
        })
        return formData;
    }
    sendFormData(){
        fetch(this.element.action, {
            method: this.element.method,
            body: this.data
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
        return this;
    }
    getByName(name){
        return this.data.get(name);
    }
}
const Form = (...items) => new ZikoUIForm(...items);
export{
    Form,
    ZikoUIForm
}