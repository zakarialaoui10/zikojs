
import { ZikoUIInput } from "../input";
class ZikoUIInputEmail extends ZikoUIInput {
    constructor() {
      super("email", "inputEmail");
    }
    get isInputEmail(){
      return true;
    }
  }
const inputEmail = () => new ZikoUIInputEmail();
export{
    ZikoUIInputEmail,
    inputEmail
}