import ZikoUIElement from '../../constructors/ziko-ui-element.js';
const _h=(tag, type, attributes, ...children)=>{
    const { name, style, ...attrs } = attributes;
    let element = new ZikoUIElement(tag, name, type);
    style && element.style(style);
    attrs && element.setAttr(attrs);
    children && element.append(...children);
    return element; 
}
const h=(tag, attributes = {}, ...children)=> _h(tag, "html", attributes, ...children);
const s=(tag, attributes = {}, ...children)=> _h(tag, "svg", attributes, ...children);

const HTMLTags = [
  'a',
  'abb',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'i',
  'iframe',
  'img',
  'ipnut',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'map',
  'mark',
  'menu',
  'meter',
  'nav',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'search',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
];

const SVGTags = [
    "svg", "g", "defs", "symbol", "use", "image", "switch",
    "rect", "circle", "ellipse", "line", "polyline", "polygon", "path",
    "text", "tspan", "textPath", "altGlyph", "altGlyphDef", "altGlyphItem", "glyph", "glyphRef",
    "linearGradient", "radialGradient", "pattern", "solidColor",
    "filter", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix",
    "feDiffuseLighting", "feDisplacementMap", "feDropShadow", "feFlood", "feFuncA", "feFuncR", "feFuncG", "feFuncB",
    "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "feSpecularLighting",
    "feTile", "feTurbulence",
    "animate", "animateMotion", "animateTransform", "set",
    "script",
    "desc", "title", "metadata", "foreignObject"
  ];
  
const hTags = HTMLTags.reduce((acc, key) => {
  acc[key] = (attr, ...children) => h(key, attr, ...children);
  return acc;
}, {});
const sTags = SVGTags.reduce((acc, key) => {
    acc[key] = (attr, ...children) => h(key, attr, ...children);
    return acc;
  }, {});

export { h, s, hTags, sTags };
