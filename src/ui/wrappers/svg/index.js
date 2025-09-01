import { UIElement } from "../../constructors/UIElement.js";

class UISVGWrapper extends UIElement {
    constructor(content){
        super({elemnt : 'div', name : 'html_wrappper'})
        this.element.append(svg2dom(content));
        this.style({
            display : 'contents'
        })
    }
}

function svg2dom(svgString) {
    if(globalThis?.DOMParser){
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString.replace(/\s+/g, ' ').trim(), 'image/svg+xml');
        return doc.documentElement; // SVG elements are usually at the root
    }
}

const SVGWrapper = (content) => new UISVGWrapper(content)
export{
    UISVGWrapper,
    SVGWrapper
}