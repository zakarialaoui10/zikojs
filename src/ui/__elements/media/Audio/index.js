import { __ZikoUIDynamicMediaElement__ } from "../__ZikoUIDynamicMediaELement__.js";
class ZikoUIAudio extends __ZikoUIDynamicMediaElement__ {
    constructor(src) {
      super("audio","audio");
      this.element?.setAttribute("src", src);
      this.size("150px","30px")
      // this.useControls();
    }
    get isAudio(){
      return true;
    }
  }
const audio = (src) => new ZikoUIAudio(src);
export {
    audio,
    ZikoUIAudio
}