import { ZikoUIInput } from "../input";
class ZikoUIInputDateTime extends ZikoUIInput {
    constructor() {
      super("datetime-local", "inputDateTime");
    }
    get isInputDateTime(){
      return true;
    }
}
const inputDateTime = () => new ZikoUIInputDateTime();
export{
    ZikoUIInputDateTime,
    inputDateTime
}