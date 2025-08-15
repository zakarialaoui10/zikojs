export * from "./svg"
export * from "./canvas"
import * as SVG from "./svg"
import * as CANVAS from "./canvas"

const Graphics = {
    ...SVG,
    ...CANVAS
}
export default Graphics