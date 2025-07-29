import ZikoUIElement from "../elements/ZikoUIElement.js";
interface HtmlTags {
    a: ZikoUIElement;
    abbr: ZikoUIElement;
    address: ZikoUIElement;
    area: ZikoUIElement;
    article: ZikoUIElement;
    aside: ZikoUIElement;
    audio: ZikoUIElement;
    b: ZikoUIElement;
    base: ZikoUIElement;
    bdi: ZikoUIElement;
    bdo: ZikoUIElement;
    blockquote: ZikoUIElement;
    body: ZikoUIElement;
    br: ZikoUIElement;
    button: ZikoUIElement;
    canvas: ZikoUIElement;
    caption: ZikoUIElement;
    cite: ZikoUIElement;
    code: ZikoUIElement;
    col: ZikoUIElement;
    colgroup: ZikoUIElement;
    data: ZikoUIElement;
    datalist: ZikoUIElement;
    dd: ZikoUIElement;
    del: ZikoUIElement;
    details: ZikoUIElement;
    dfn: ZikoUIElement;
    dialog: ZikoUIElement;
    div: ZikoUIElement;
    dl: ZikoUIElement;
    dt: ZikoUIElement;
    em: ZikoUIElement;
    embed: ZikoUIElement;
    fieldset: ZikoUIElement;
    figcaption: ZikoUIElement;
    figure: ZikoUIElement;
    footer: ZikoUIElement;
    form: ZikoUIElement;
    h1: ZikoUIElement;
    h2: ZikoUIElement;
    h3: ZikoUIElement;
    h4: ZikoUIElement;
    h5: ZikoUIElement;
    h6: ZikoUIElement;
    head: ZikoUIElement;
    header: ZikoUIElement;
    hgroup: ZikoUIElement;
    hr: ZikoUIElement;
    html: ZikoUIElement;
    i: ZikoUIElement;
    iframe: ZikoUIElement;
    img: ZikoUIElement;
    input: ZikoUIElement;
    ins: ZikoUIElement;
    kbd: ZikoUIElement;
    label: ZikoUIElement;
    legend: ZikoUIElement;
    li: ZikoUIElement;
    link: ZikoUIElement;
    main: ZikoUIElement;
    map: ZikoUIElement;
    mark: ZikoUIElement;
    meta: ZikoUIElement;
    meter: ZikoUIElement;
    nav: ZikoUIElement;
    noscript: ZikoUIElement;
    object: ZikoUIElement;
    ol: ZikoUIElement;
    optgroup: ZikoUIElement;
    option: ZikoUIElement;
    output: ZikoUIElement;
    p: ZikoUIElement;
    param: ZikoUIElement;
    picture: ZikoUIElement;
    pre: ZikoUIElement;
    progress: ZikoUIElement;
    q: ZikoUIElement;
    rp: ZikoUIElement;
    rt: ZikoUIElement;
    ruby: ZikoUIElement;
    s: ZikoUIElement;
    samp: ZikoUIElement;
    script: ZikoUIElement;
    section: ZikoUIElement;
    select: ZikoUIElement;
    small: ZikoUIElement;
    source: ZikoUIElement;
    span: ZikoUIElement;
    strong: ZikoUIElement;
    style: ZikoUIElement;
    sub: ZikoUIElement;
    summary: ZikoUIElement;
    sup: ZikoUIElement;
    table: ZikoUIElement;
    tbody: ZikoUIElement;
    td: ZikoUIElement;
    template: ZikoUIElement;
    textarea: ZikoUIElement;
    tfoot: ZikoUIElement;
    th: ZikoUIElement;
    thead: ZikoUIElement;
    time: ZikoUIElement;
    title: ZikoUIElement;
    tr: ZikoUIElement;
    track: ZikoUIElement;
    u: ZikoUIElement;
    ul: ZikoUIElement;
    var: ZikoUIElement;
    video: ZikoUIElement;
    wbr: ZikoUIElement;
}

interface SvgTags {
    svg: ZikoUIElement;
    circle: ZikoUIElement;
    rect: ZikoUIElement;
    line: ZikoUIElement;
    path: ZikoUIElement;
    g: ZikoUIElement;
    text: ZikoUIElement;
    //...
}

interface MathTags {
    math: ZikoUIElement;
    mrow: ZikoUIElement;
    mi: ZikoUIElement;
    mo: ZikoUIElement;
    mn: ZikoUIElement;
    ms: ZikoUIElement;
    //...
}

export type Tags = HtmlTags & SvgTags & MathTags & {
  [key: string]: ZikoUIElement;
};

declare const tags: Tags;

export {
    tags
};