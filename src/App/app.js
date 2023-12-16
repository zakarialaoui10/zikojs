import ZikoUIElement from "../UI/ZikoUIElement";
import { Seo } from "./Seo/index.js";
import { useTheme } from "./Apparence/Theme/index.js";
import { useStyle } from "./Apparence/index.js";
class ZikoUIApp extends ZikoUIElement{
    constructor(){
        super();
        this.root=document.documentElement;
        this.element=document.createElement("main");
        this.head=null;
        this.#init();
        this.seo=Seo(this);
        Object.assign(this.cache,{theme:null});
        this.render();
    }
    #init(){
        this.root.setAttribute("data-engine","zikojs");
        const head=this.root.getElementsByTagName("head")[0];
        this.head=head?head:this.head=document.createElement("head");
        if(!head)this.root.insertBefore(this.head,document.body);
        const title=this.head.getElementsByTagName("title")[0];
        this.Title=title?title:this.head=document.createElement("title");
        if(!title)this.head.append(this.Title);
    }
    title(title=this.title.textContent){
        this.Title.textContent=title;
        return this;
    }
    prefetch(){

    }
    description(){

    }
    get Theme(){
        return this._theme?.Theme;
    }
    get Style(){
        return this._style?.Style;
    }
    useTheme(theme){
        if(!this._theme)this._theme=useTheme(theme);
        this._theme.use(theme);
        return this;
    }
    useStyle(style){
        if(!this._style)this._style=useStyle();
        this._style.use(style);
        return this;
    }
}
const App=()=>new ZikoUIApp()
export default App;