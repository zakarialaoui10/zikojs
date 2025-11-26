class UseStyle {
  constructor(style = {}, use = style.hasOwnProperty("default")? "default" : Object.keys(style)[0], id = 0) {
    this.id = "Ziko-Style-" + id;
    this.keys = new Set();
    this.styles = {
      default: {
        fontSize: "1em",
        color : "green"
      },
      other: {
        fontSize : "2em",
        color : "cyan" 
      }
    };
    style && this.add(style);
    use && this.use(use);
  }

  get current() {
    return [...this.keys].reduce((key, value) => {
      key[value] = `var(--${value}-${this.id})`;
      return key;
    }, {});
  }

  add(name, style = {}) {
    if (name && typeof name === 'object' && !Array.isArray(name)) {
      Object.assign(this.styles, name);
    } else if (typeof name === 'string') {
      Object.assign(this.styles, { [name]: style });
    }
    return this;
  }

  #useStyleIndex(index) {
    const keys = Object.keys(this.styles);
    for (let a in this.styles[keys[index]]) {
      if (Object.prototype.hasOwnProperty.call(this.styles[keys[index]], a)) {
        document.documentElement.style.setProperty(`--${a}-${this.id}`, this.styles[keys[index]][a]);
        this.keys.add(a);
      }
    }
    return this;
  }

  #useStyleName(name) {
    if (!this.styles[name]) return this;
    for (let a in this.styles[name]) {
      if (Object.prototype.hasOwnProperty.call(this.styles[name], a)) {
        document.documentElement.style.setProperty(`--${a}-${this.id}`, this.styles[name][a]);
        this.keys.add(a);
      }
    }
    return this;
  }

  #useStyleObject(style) {
    for (let a in style) {
      if (Object.prototype.hasOwnProperty.call(style, a)) {
        document.documentElement.style.setProperty(`--${a}-${this.id}`, style[a]);
        this.keys.add(a);
      }
    }
    return this;
  }

  use(style) {
    if (typeof style === "number") return this.#useStyleIndex(style);
    if (typeof style === "string") return this.#useStyleName(style);
    if (style && typeof style === "object") return this.#useStyleObject(style);
    return this;
  }
}

const useStyle = (styles, use, id) => new UseStyle(styles, use, id)
export { 
  useStyle,
  UseStyle
 };
