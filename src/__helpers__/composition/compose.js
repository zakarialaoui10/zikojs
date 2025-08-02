import { composeClass } from "./compose-class.js";
import { composeInstance } from "./compose-instance.js";
export function compose(target, mixin) {
  if (typeof target === 'function') {
    return composeClass(target, mixin);
  } else if (typeof target === 'object') {
    composeInstance(target, mixin);
  } else {
    throw new TypeError("compose: target must be a class or instance");
  }
}
