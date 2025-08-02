import { composeClass } from "./compose-class.js";
import { composeInstance } from "./compose-instance.js";
export function compose(target, ...mixin) {
  if (typeof target === 'function') {
    return mixin.forEach(item =>composeClass(target, item));
  } else if (typeof target === 'object') {
    mixin.forEach(item =>composeInstance(target, item));
  } else {
    throw new TypeError("compose: target must be a class or instance");
  }
}
