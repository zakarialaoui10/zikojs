import * as Events from "./events";
import * as Observer from "./observer"
import * as Hooks from "./hooks"
const Reactivity={
    ...Events,
    ...Observer,
    ...Hooks,
}
export * from "./events";
export * from "./observer";
export * from "./hooks";
export default Reactivity;