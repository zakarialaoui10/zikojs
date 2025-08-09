import ZikoUIElement from "../../constructors/ziko-ui-element.js";
class __ZikoUIDynamicMediaElement__ extends ZikoUIElement {
    constructor(element, name) {
      super(element, name);
      this.useControls();
    }
    get t(){
      return this.element.currentTime;  
    }
    useControls(enabled = true) {
      this.element.controls = enabled;
      return this;
    }
    enableControls(){
      this.element.controls = true;
      return this;
    }
    disableControls(){
      this.element.controls = true;
      return this;
    }
    toggleControls(){
      this.element.controls = !this.element.controls;
      return this;
    }
    play() {
      this.element.play();
      return this;
    }
    pause() {
      this.element.pause();
      return this;
    }
    seekTo(time) {
      this.element.currentTime = time;
      return this;
    }
    onPlay(){

    }
    onPause(){

    }
  }
export {
  __ZikoUIDynamicMediaElement__
}