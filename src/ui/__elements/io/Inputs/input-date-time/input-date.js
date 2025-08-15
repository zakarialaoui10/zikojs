import { ZikoUIInput } from "../input";
class ZikoUIInputDate extends ZikoUIInput {
    constructor() {
      super("date", "inputDate");
    }
    get isInputDate(){
      return true;
    }
}
const inputDate = () => new ZikoUIInputDate();
export{
    ZikoUIInputDate,
    inputDate
}