import ZikoUIElement from "../ZikoUIElement.js";

class ZikoUIHtmlViewer extends ZikoUIElement{
    constructor(src, title){
        super("iframe", "HTMLViewer")
        this.setAttr({
            src,
            title,
            // ariaLabel : "Interactive YouTube video player for zikojs apps",
            role:"application",
            loading:"lazy" 
        })
    }
}

const HTMLViewer = (src, title) => new ZikoUIHtmlViewer(src, title);
export{
    HTMLViewer,
    ZikoUIHtmlViewer
}