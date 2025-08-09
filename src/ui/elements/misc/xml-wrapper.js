import ZikoUIElement from "../../constructors/ziko-ui-element.js";
class ZikoUIXMLWrapper extends ZikoUIElement{
    constructor(XMLContent, type){
        super("div", "")
        this.element.append(type==="svg"?svg2dom(XMLContent):html2dom(XMLContent))
    }
}
function html2dom(htmlString) {
    if(globalThis?.DOMParser){
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${htmlString}</div>`, 'text/html');
        doc.body.firstChild.style.display = "contents"
        return doc.body.firstChild;
    }
  }
function svg2dom(svgString) {
    if(globalThis?.DOMParser){
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString.replace(/\s+/g, ' ').trim(), 'image/svg+xml');
        return doc.documentElement; // SVG elements are usually at the root
    }
}
class ZikoUIHTMLWrapper extends ZikoUIXMLWrapper{
    constructor(HTMLContent){
        super(HTMLContent, "html")
    }
}
class ZikoUISVGWrapper extends ZikoUIXMLWrapper{
    constructor(SVGContent){
        super(SVGContent, "svg")
    }
}
const HTMLWrapper = (HTMLContent) => new ZikoUIHTMLWrapper(HTMLContent);
const SVGWrapper = (SVGContent) => new ZikoUISVGWrapper(SVGContent);

export{
    ZikoUIXMLWrapper,
    ZikoUIHTMLWrapper,
    ZikoUISVGWrapper,
    HTMLWrapper,
    SVGWrapper
}