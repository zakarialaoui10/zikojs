import { __ExtractAll__,__RemoveAll__ } from "./__helpers__/index.js";
import Math from "./math/index.js";
import UI from "./ui/index.js";
import Time from "./time/index.js";
import Data from "./data/index.js";
import Reactivity from "./reactivity/index.js";
import Graphics from "./graphics/index.js";

// import * as Events from "./events/index.js"
// import * as Use from "./use/index.js"

import App,{__UI__,__HYDRATION_MAP__, __Config__, __CACHE__, defineParamsGetter, __HYDRATION__} from "./app";

export * from "./math/index.js";
export * from "./ui/index.js";
export * from "./time/index.js";
export * from "./data/index.js";
export * from "./reactivity/index.js"
export * from "./graphics/index.js";
export * from "./app/index.js";

export * from "./events/index.js";
export * from "./use/index.js";

[
    App,
    Math,
    UI,
    Time,
    Data,
    Reactivity,
    Graphics,
].forEach(n=>Object.assign(n,{
    ExtractAll:()=>__ExtractAll__(n),
    RemoveAll:()=>__RemoveAll__(n)
}))

const Ziko={
    App,
    Math,
    UI,
    Time,
    Data,
    Reactivity,
    Graphics
}

if ( globalThis.__Ziko__ ) {
    console.warn( 'WARNING: Multiple instances of Ziko.js being imported.' );
	} else {
		globalThis.__Ziko__={
            ...Ziko,
            __UI__,
            __HYDRATION__,
            __HYDRATION_MAP__,
            __Config__,
            __CACHE__,
            ExtractAll,
            RemoveAll
        };
        defineParamsGetter(__Ziko__)
	}
// globalThis.__Ziko__={
//     ...Ziko,
//     __UI__,
//     __Config__,
//     ExtractAll,
//     RemoveAll
// };
if(globalThis?.document){
    document?.addEventListener("DOMContentLoaded", __Ziko__.__Config__.init());
}
function ExtractAll(){
    UI.ExtractAll();
    Math.ExtractAll();
    Time.ExtractAll();
    Reactivity.ExtractAll();
    Graphics.ExtractAll();
    Data.ExtractAll()
    return this;
}
function RemoveAll(){
    UI.RemoveAll();
    Math.RemoveAll();
    Time.RemoveAll();
    Reactivity.RemoveAll();
    Graphics.RemoveAll();
    Data.RemoveAll()
}

export default Ziko;



