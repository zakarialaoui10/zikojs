const CATEGORY = 'key'
export const KeyListeners = {
    _onKeyDown(callback){
        this._on(
            'keydown', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.kd = ctx.event.key }
        })
    },
    _onKeyPress(callback){
        this._on(
            'keypress', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.kp = ctx.event.key }
        })
    },
    _onKeyUp(callback){
        this._on(
            'keydown', callback, 
            { category : CATEGORY, details_setter : ctx=> { ctx.ku = ctx.event.key }
        })
    },
    
}


