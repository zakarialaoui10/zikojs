export * from "./elements/text/index.js";
export * from "./elements/list/index.js";
export * from "./elements/io/index.js";
export * from "./elements/media/index.js";
export * from "./elements/table/index.js";
export * from "./elements/semantic/index.js";
export * from "./elements/misc/index.js";
export * from "./elements/flex/index.js";
export * from "./elements/grid/index.js";
export * from "./tags/index.js"

import * as Text from "./elements/text/index.js";
import * as List from "./elements/list/index.js";
import * as Io from "./elements/io/index.js";
import * as Media from "./elements/media/index.js";
import * as Table from "./elements/table/index.js";
import * as Semantic from "./elements/semantic/index.js";
import * as Misc from "./elements/misc/index.js";
import * as Flex from "./elements/flex/index.js";
import * as Grid from "./elements/grid/index.js";


import ZikoUIElement from "./constructors/ziko-ui-element.js";

export{
    ZikoUIElement
}
const UI = {
    ...Text,
    ...List,
    ...Io,
    ...Media,
    ...Table,
    ...Semantic,
    ...Misc,
    ...Flex,
    ...Grid,
    ZikoUIElement,
}
export default UI;