import { ZikoUIInput } from "../input";
class ZikoUIInputPassword extends ZikoUIInput {
    constructor() {
      super("password", "inputPassword");
    }
    get isInputPassword(){
      return true;
    }
  }
  const inputPassword = () => new ZikoUIInputPassword();
export{
    ZikoUIInputPassword,
    inputPassword
}