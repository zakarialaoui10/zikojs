import { ZikoUIInput } from "../input";
class ZikoUIInputSearch extends ZikoUIInput {
  constructor() {
    super("search", "inputSearch");
    this.Length = 0;
  }
  get isInputSearch() {
    return true;
  }
  onsearch(callback) {
    this.element?.addEventListener("search", () => callback());
    return this;
  }
  connect(...UIElement) {
    /* 
      let memory = new Array(UIElement.length).fill([]);
      UIElement.map((n, i) => {
        //console.log(n)
        n.items.map((m, j) => {
          memory[i][j] = m.element.style.display;
        });
      });
      UIElement.map((n, i) =>
        this.onInput(() => {
          n.filterByTextContent(this.value, memory[i]);
          this.Length = n.children.filter(
            (n) => n.style.display != "none"
          ).length;
        })
      );
      */
    return this;
  }
  displayLength(UIElement) {
    this.element?.addEventListener("keyup", () =>
      UIElement.setValue(this.Length),
    );
    return this;
  }
}
const search = (...a) => new ZikoUIInputSearch().connect(...a);
export { 
    ZikoUIInputSearch, 
    search 
};
