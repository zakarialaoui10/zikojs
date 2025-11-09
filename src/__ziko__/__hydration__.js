export const __HYDRATION__ = {
    store : new Map(),
    index : 0,
    register: function(node, component){
        this.store.set(node, component)
    },
    
}