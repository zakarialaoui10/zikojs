const CATEGORY = 'click';
import {register_click_away_event} from '../../../../events/custom-events-registry/click-away.js'
export const ClickListeners = {
    onClick(callback){
        this.on(
            'click', callback, 
            { category : CATEGORY })
    },
    onDblClick(callback){
        this.on(
            'dblclick', callback, 
            { category : CATEGORY})
    },
    onClickAway(callback){
        register_click_away_event(this.element)
        this.on(
            'clickaway', callback, 
            { category : CATEGORY})
    },
}


