import ZikoUIElement from "../ZikoUIElement";
class ZikoUIXMLWrapper extends ZikoUIElement{
    constructor(XMLContent, type){
        super("div", "")
        this.element.append(type==="svg"?svg2dom(XMLContent):html2dom(XMLContent))
    }
}
function html2dom(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
  }
function svg2dom(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    return doc.documentElement; // SVG elements are usually at the root
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
const SVGWrapper = (SVGContent) => new ZikoUIHTMLWrapper(SVGContent);

export{
    ZikoUIXMLWrapper,
    ZikoUIHTMLWrapper,
    ZikoUISVGWrapper,
    HTMLWrapper,
    SVGWrapper
}