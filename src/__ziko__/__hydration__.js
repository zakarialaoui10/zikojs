export const __HYDRATION__ = {
    store : new Map(),
    index : 0,
    register: function(component){
        this.store.set(this.index++, component)
    }
}
export const __HYDRATION_MAP__ = new Map()