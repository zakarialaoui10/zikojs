function composeInstance(instance, mixin) {
  const descriptors = Object.getOwnPropertyDescriptors(mixin);

  for (const key of Reflect.ownKeys(descriptors)) {
    const desc = descriptors[key];

    if ('get' in desc || 'set' in desc) {
      Object.defineProperty(instance, key, desc);
    } else if (typeof desc.value === 'function') {
      instance[key] = desc.value.bind(instance); // override-safe
    } else {
      instance[key] = desc.value;
    }
  }
}

function composeClass(Base, mixin) {
  const descriptors = Object.getOwnPropertyDescriptors(mixin);

  return class extends Base {
    constructor(...args) {
      super(...args);
      for (const key of Reflect.ownKeys(descriptors)) {
        const desc = descriptors[key];
        if (typeof desc.value === 'function') {
          this[key] = desc.value.bind(this); // override-safe
        }
      }
    }
  };
}


function defineAccessorsAndData(proto, mixin) {
  const descriptors = Object.getOwnPropertyDescriptors(mixin);
  for (const key of Reflect.ownKeys(descriptors)) {
    const desc = descriptors[key];
    if ('get' in desc || 'set' in desc || typeof desc.value !== 'function') {
      Object.defineProperty(proto, key, desc);
    }
  }
}


function compose(target, mixin) {
  if (typeof target === 'function') {
    const Composed = composeClass(target, mixin);
    defineAccessorsAndData(Composed.prototype, mixin); // this order ensures overriding
    return Composed;
  } else if (typeof target === 'object' && target !== null) {
    composeInstance(target, mixin);
  } else {
    throw new TypeError("compose: target must be a class or instance");
  }
}
const mixin = {
  greet() { return `Hello from mixin, ${this.name}`; },
  get upperName() { return this.name.toUpperCase(); }
};

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello from class, ${this.name}`;
  }
}

// CLASS MODE
const ComposedPerson = compose(Person, mixin);
const p1 = new ComposedPerson("Zak");
console.log(p1.greet());       // Hello from mixin, Zak
console.log(p1.upperName);     // ZAK

// INSTANCE MODE
class Animal {
  constructor(name) {
    this.name = name;
    compose(this, mixin);
  }

  greet() {
    return `Animal says hi, ${this.name}`;
  }
}
const a = new Animal("Milo");
console.log(a.greet());        // Hello from mixin, Milo
console.log(a.upperName);      // MILO
