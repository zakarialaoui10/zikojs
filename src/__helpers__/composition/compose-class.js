export function composeClass(Class, mixin) {
  const descriptors = Object.getOwnPropertyDescriptors(mixin);

  class Composed extends Class {
    constructor(...args) {
      super(...args);
      for (const key of Reflect.ownKeys(descriptors)) {
        const desc = descriptors[key];

        if (typeof desc.value === 'function') {
          this[key] = desc.value.bind(this);
        }
      }
    }
  }

  for (const key of Reflect.ownKeys(descriptors)) {
    const desc = descriptors[key];

    if ('get' in desc || 'set' in desc) {
      Object.defineProperty(Composed.prototype, key, desc);
    } else if (typeof desc.value !== 'function') {
      Object.defineProperty(Composed.prototype, key, desc);
    }
  }

  return Composed;
}
