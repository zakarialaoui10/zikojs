import ZikoUIElement from "../../constructors/ziko-ui-element.js";

class ZikoUIPdf extends ZikoUIElement{
    constructor(src, title = "Pdf Document Embaded in Zikojs App"){
        super("embed","PDFViewer")
        this.setAttr({
            src:src,
            type: "application/pdf",
            ariaLabel: title,
            tabIndex: "0",
        })
    }
}
const PDFViewer=(src, title)=>new ZikoUIPdf(src, title);
export{
    ZikoUIPdf,
    PDFViewer
}