import { ZikoUIInput } from "../input";
class ZikoUIInputSlider extends ZikoUIInput {
    constructor(val = 0, min = 0, max = 10, step = 1) {
      super("range", "inputSlider");
      this.setMin(min).setMax(max).setValue(val).setStep(step);
    }
    get isInputSlider(){
      return true;
    }
    setMin(min) {
      this.element.min = min;
      return this;
    }
    setMax(max) {
      this.element.max = max;
      return this;
    }
    setStep(step) {
      this.element.step = step;
      return this;
    }
}
const slider = (value, min, max, step) =>{
    if(value instanceof Object){
      const {min=0,max=10,step=1}=value;
      value=value?.value??5;
      return new ZikoUIInputSlider(value, min, max, step);
    }
    return new ZikoUIInputSlider(value, min, max, step);
}
export{
    ZikoUIInputSlider,
    slider
}
