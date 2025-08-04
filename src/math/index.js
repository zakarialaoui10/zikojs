import * as __Const__ from "./const.js"
import * as __Functions__ from "./functions/index.js"
import * as __Random__ from "./random"
import * as __Complex__ from "./complex"
import * as __Matrix__ from "./matrix"
import * as __Discrect__ from "./discret"
import * as __Utils__ from "./utils"
const Math = {
    ...__Const__,
    ...__Functions__,
    ...__Complex__,
    ...__Matrix__,
    ...__Random__,
    ...__Utils__,
    ...__Discrect__,
}
export * from "./const.js"
export * from "./functions/index.js"
export * from "./complex"
export * from "./matrix"
export * from "./discret"
export * from "./random"
export * from "./utils"
export * from "./statistics"
export default Math;

