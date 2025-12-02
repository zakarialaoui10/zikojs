import { useTitle } from "./useTitle.js";
import { useFavIcon } from "./useFavIcon.js";
import {useMeta} from "./useMeta.js";
// import {useLink} from "./";
class ZikoHead{
    constructor({title,lang,icon,meta,noscript}){
        this.html = globalThis?.document?.documentElement;
        this.head = globalThis?.document?.head;

        title && useTitle(title);
        lang && this.setLang(lang)
        icon && useFavIcon(icon);
        meta && useMeta(meta);
        noscript && this.setNoScript()
    }
    setLang(lang){
        this.html.setAttribute("lang",lang)
    }
    setNoScript(content){

    }
}

const useHead=({ title, lang, icon, meta, noscript })=>new ZikoHead({ title, lang, icon, meta, noscript });
export{
    useHead,
    ZikoHead
}