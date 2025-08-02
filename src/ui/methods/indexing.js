export const IndexingMethods = {
  at(index) {
    return this.items.at(index);
  },
  forEach(callback) {
    this.items.forEach(callback);
    return this;
  },
  map(callback) {
    return this.items.map(callback);
  },
  find(condition) {
    return this.items.filter(condition);
  },
};
