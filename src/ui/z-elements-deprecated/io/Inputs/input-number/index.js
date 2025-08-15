import { ZikoUIInput } from "../input";
class ZikoUIInputNumber extends ZikoUIInput {
    constructor(min, max, step = 1) {
      super("number", "inpuNumber");
      this.setMin(min).setMax(max).setStep(step);
    }
    get isInputNumber() {
      return true;
    }
    get value() {
      return +this.element.value;
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
  const inputNumber = (min, max, step) => {
    if (min instanceof Object) {
      const { value, max = 10, step = 1, placeholder = "" } = min;
      min = min?.min ?? 0;
      return new ZikoUIInputSlider(min, max, step)
        .setValue(value)
        .setPlaceholder(placeholder);
    }
    return new ZikoUIInputNumber(min, max, step);
  };
  export { inputNumber, ZikoUIInputNumber };
  