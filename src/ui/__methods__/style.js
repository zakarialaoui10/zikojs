// Process width and height
export const StyleMethods = {
    style(styles){
        Object.assign(this.element.style, styles)
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