import {Math} from "./Math/index.js";
import UI from "./UI/index.js";
import Time from "./Time/index.js";
import Events from "./Events/index.js";
import Graphics from "./Graphics/index.js";
import Multi from "./Worker/index.js";
import {Watch} from "./Reactivity/index.js"
import {SPA} from "./Router/index.js";
const Ziko={
    Math,
    UI,
    Time,
    Graphics,
    Events,
    Multi,
    SPA,
    Watch
}
Ziko.Math.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Math).length; i++) {
        globalThis[Object.keys(Ziko.Math)[i]] = Object.values(Ziko.Math)[i];
    }
    return this;
}
Ziko.Math.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Math).length; i++) delete globalThis[Object.keys(Ziko.Math)[i]];   
    return this;
}
Ziko.UI.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.UI).length; i++) {
        globalThis[Object.keys(Ziko.UI)[i]] = Object.values(Ziko.UI)[i];
    }
    return this;
}
Ziko.UI.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.UI).length; i++) delete globalThis[Object.keys(Ziko.UI)[i]];   
    return this;
}
Ziko.Time.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Time).length; i++) {
        globalThis[Object.keys(Ziko.Time)[i]] = Object.values(Ziko.Time)[i];
    }
    return this;
}
Ziko.Time.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Time).length; i++) delete globalThis[Object.keys(Ziko.Time)[i]];   
    return this;
}
Ziko.Graphics.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Graphics).length; i++) {
        globalThis[Object.keys(Ziko.Graphics)[i]] = Object.values(Ziko.Graphics)[i];
    }
    return this;
}
Ziko.Graphics.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Graphics).length; i++) delete globalThis[Object.keys(Ziko.Graphics)[i]];   
    return this;
}
Ziko.Events.ExtractAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Events).length; i++) {
        globalThis[Object.keys(Ziko.Events)[i]] = Object.values(Ziko.Events)[i];
    }
    return this;
}
Ziko.Events.RemoveAll=function(){
    for (let i = 0; i < Object.keys(Ziko.Events).length; i++) delete globalThis[Object.keys(Ziko.Events)[i]];   
    return this;
}
Ziko.ExtractAll=function(){
    Ziko.UI.ExtractAll();
    Ziko.Math.ExtractAll();
    Ziko.Time.ExtractAll();
    Ziko.Events.ExtractAll();
    Ziko.Graphics.ExtractAll();
    return this;
}
Ziko.RemoveAll=function(){
    Ziko.UI.RemoveAll();
    Ziko.Math.RemoveAll();
    Ziko.Time.ExtractAll();
    Ziko.Events.RemoveAll();
    Ziko.Graphics.RemoveAll();
}
export default Ziko
