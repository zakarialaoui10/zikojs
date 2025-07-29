import ZikoUIElement from "../ZikoUIElement.js";
import { Str } from "../../../../data.js";
class ZikoUIYoutubePlayer extends ZikoUIElement{
    constructor(src, title){
        super("iframe", "YoutubePlayer");
        const id = Str.isUrl(src)?getYouTubeVideoId(src):src
        this.setAttr({
            src:`https://www.youtube.com/embed/${id}`,
            title,
            ariaLabel : title ?? "Interactive YouTube video player for zikojs apps",
            role:"application"
        })
    }
}
function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
const YoutubePlayer = (id, title) => new ZikoUIYoutubePlayer(id, title);
export{
    YoutubePlayer,
    ZikoUIYoutubePlayer
}