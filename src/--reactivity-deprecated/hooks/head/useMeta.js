class ZikoMeta{
    constructor({viewport,charset,description,author,keywords}){
        this.document = globalThis?.document 
        this.meta={};
        this.init({viewport,charset,description,author,keywords})
    }
    init({viewport,charset,description,author,keywords}){
        viewport && this.setViewport(viewport);
        charset && this.setCharset(charset);
        description && this.describe(description);
        author && this.setAuthor(author);
        keywords && this.setKeywords(keywords);
    }
    set(key,value){
        key = key.toLowerCase();
        const isCharset = (key === "charset")
        const meta = isCharset ? document.querySelector("meta[charset]"):document.querySelector(`meta[name=${key}]`);
        this.meta=meta?? document?.createElement("meta");
        if(isCharset) this.meta.setAttribute("charset",value);
        else{
            this.meta.setAttribute("name",key);
            this.meta.setAttribute("content",value);
        }
        if(!meta)this.document.head.append(this.meta);
        return this;     
    }
    setCharset(charset="utf-8"){
        this.set("charset",charset)
        return this;
    }
    describe(description){
        this.set("description",description);
        return this;    
    }
    setViewport(viewport="width=device-width, initial-scale=1.0"){
        this.set("viewport",viewport);
        return this;    
    }
    setKeywords(...keywords){
        // keywords.push("zikojs");
        keywords=[...new Set(keywords)].join(", ");
        this.set("keywords",keywords);
        return this;
    }
    setAuthor(author){
        this.set("author",author);
        return this;
    }
}
const useMeta=({viewport,charset,description,author,keywords})=>new ZikoMeta({viewport,charset,description,author,keywords});
export{useMeta}

