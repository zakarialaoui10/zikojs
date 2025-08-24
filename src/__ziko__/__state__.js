export const __State__ = {
    store : new Map(),
    index : import.meta.hot?.data?.__Ziko__?.__State__?.index ?? 0,
    register: function(state){
        console.log({
            hmr : import.meta.hot?.data.__Ziko__.__State__.index,
            index : this.index
        })
        this.store.set(this.index++, state)
    }
    
}
