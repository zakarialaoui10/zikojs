export * from "./ziko-app.js";
export * from "./json-style-sheet.js";
export * from "./spa.js"
export * from "./params.js"
export * from "./globals.js"
export * from "./spa-file-based-routing.js"

import * as __App__ from "./ziko-app.js"
import * as JsonStyleSheet from "./json-style-sheet.js"
import * as Spa from "./spa.js"
import * as Global from "./globals.js"
// import * as Params from "./params"

const App={
    ...__App__,
    ...JsonStyleSheet,
    ...Spa,
    ...Global,
    // ...Params
}
export default App