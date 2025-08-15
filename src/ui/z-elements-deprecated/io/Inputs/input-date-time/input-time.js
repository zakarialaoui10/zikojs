import { ZikoUIInput } from "../input";
class ZikoUIInputTime extends ZikoUIInput {
    constructor() {
      super("time", "inputTime");
    }
    get isInputTime(){
      return true;
    }
}
const inputTime = () => new ZikoUIInputTime();
export{
    ZikoUIInputTime,
    inputTime
}