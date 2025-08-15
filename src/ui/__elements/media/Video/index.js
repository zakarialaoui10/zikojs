import { __ZikoUIDynamicMediaElement__ } from "../__ZikoUIDynamicMediaELement__.js";
class ZikoUIVideo extends __ZikoUIDynamicMediaElement__ {
    constructor(src="", w = "100%", h = "50vh") {
      super("video","video");
      if (src.nodeName === "VIDEO") this.element?.setAttribute("src", src.src);
      else this.element?.setAttribute("src", src);
      if (typeof w == "number") w += "%";
      if (typeof h == "number") h += "%";
      this.style({ width: w, height: h });
    }
    get isVideo(){
      return true;
    }
    usePoster(src=""){
      this.element.poster=src;
      return this;
    }
    usePIP(e){
      this.element.requestPictureInPicture(e);
      return this;
    }
  }
const video = (src, width, height) => new ZikoUIVideo(src, width, height);
export {
  video,
  ZikoUIVideo
}