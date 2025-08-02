export function composeInstance(instance, mixin) {
  const descriptors = Object.getOwnPropertyDescriptors(mixin);

  for (const key of Reflect.ownKeys(descriptors)) {
    const desc = descriptors[key];

    if ('get' in desc || 'set' in desc) {
      Object.defineProperty(instance, key, desc);
    } else if (typeof desc.value === 'function') {
      instance[key] = desc.value.bind(instance);
    } else {
      instance[key] = desc.value;
    }
  }
}
