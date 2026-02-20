const CATEGORY = 'key'
export const KeyListeners = {
    onKeyDown(callback){
        this._on(
            'keydown', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.kd = ctx.event.key }
        })
    },
    onKeyPress(callback){
        this._on(
            'keypress', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.kp = ctx.event.key }
        })
    },
    onKeyUp(callback){
        this._on(
            'keydown', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.ku = ctx.event.key }
        })
    },
    
}


