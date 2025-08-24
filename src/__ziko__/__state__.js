export const __State__ = {
    store : new Map(),
    index : 0,
    register: function(state){
        this.store.set(this.index++, state)
    }
}
