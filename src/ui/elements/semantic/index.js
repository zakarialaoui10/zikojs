import ZikoUIElement from "../../constructors/ziko-ui-element.js";
const elements = ['Main', 'Header', 'Nav', 'Section', 'Article', 'Aside', 'Footer']

// Storage for Classes and component functions
const Classes = {};
const Components = {};

// Auto-generate Classes and factory functions
for (let i=0; i<elements.length; i++) {
  Classes[`ZikoUI${elements[i]}`] = class extends ZikoUIElement {
    constructor() {
      super(elements[i].toLowerCase());
      this.style({ position: "relative" });
    }
    get [`is${elements[i]}`]() {
      return true;
    }
  };

  Components[elements[i]] = (...children) =>
    new Classes[`ZikoUI${elements[i]}`]().append(...children);
}

export const {
  Main,
  Header,
  Nav,
  Section,
  Article,
  Aside,
  Footer
} = Components;

export const {
  ZikoUIMain,
  ZikoUIHeader,
  ZikoUINav,
  ZikoUISection,
  ZikoUIArticle,
  ZikoUIAside,
  ZikoUIFooter
} = Classes;
