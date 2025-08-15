import * as Math from './math/index.js';
import * as UI from './ui/index.js';
import * as Time from './time/index.js';
import * as Data from './data/index.js';

import * as Reactivity from './reactivity/index.js'


// import * as Events from "./events/index.js"
// import * as Use from "./use/index.js"

import App,{__UI__,__HYDRATION_MAP__, __Config__, __CACHE__, defineParamsGetter, __HYDRATION__} from "./app/index.js";

export * from "./math/index.js";
export * from "./ui/index.js";
export * from "./time/index.js";
export * from "./data/index.js";
export * from "./reactivity/index.js"
export * from "./app/index.js";

export * from "./events/index.js";
export * from "./use/index.js";



const Ziko={
    App,
    Math,
    UI,
    Time,
    Data,
    Reactivity,
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
            // ExtractAll,
            // RemoveAll
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

export default Ziko;



