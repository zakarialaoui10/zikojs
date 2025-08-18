import { isStateGetter } from '../../hooks/use-state.js'
export const StyleMethods = {
    style(styles){
        for(let key in styles){
            const value = styles[key];
            if(isStateGetter(value)){
                const getter = value()
                Object.assign(this.element.style, {[key] : getter.value})
                getter._subscribe(
                    (newValue) => {
                        console.log({newValue})
                        Object.assign(this.element.style, {[key] : newValue})
                    },
                    this 
                );
            }
            else Object.assign(this.element.style, {[key] : value})
        }
        return this;
    },
    size(width, height){
        return this.style({width, height})
    },
    animate(keyframe, {duration=1000, iterations=1, easing="ease"}={}){
        this.element?.animate(keyframe,{duration, iterations, easing});
        return this;
  }
}