import { tags, Flex , tick} from "ziko";
import { useDerived, useState } from "ziko/hooks";
import { define_wc } from 'ziko/ui/web-component/index.js'
const {slot, div, p, button} = tags
// globalThis.asComp = async () => tags.span("async comp")
// div().style({
//     color : 'red'
// }).append("Before ..",asComp(),".. After")

// define_wc(
//   "ziko-counter",
//   ({ start = 10, color } = {}) => {
//     const [value, setValue] = useState(start);
//     const UI = p(
//       slot({ name: "s1" }),
//       "count : ",
//       slot({ name: "s2" }),
//       button(value).onClick(() => setValue((n) => n + 1)),
//     ).style({color});
//     return UI;
//   },
//   {
//     start: { type: Number },
//     color: { type : String }
//   },
// );

define_wc("ziko-span", ()=> tags.span("ziko-span"))
define_wc("ziko-span", ()=> tags.span("ziko-span"))
define_wc("ll", ()=> tags.span("ziko-span"))

define_wc(
  "ziko-counter",
  ({ start = 10, color } = {}) => {
    const [value, setValue] = useState(start);
    const msg = useDerived(n=> `..${n}..`, [value])
    const UI = Flex(
      slot({ name: "s1" }),
      "count : ",
      msg,
      slot({ name: "s2" }),
      button("+").onClick(() => setValue((n) => n + 1)),
      button("-").onClick(() => setValue((n) => n - 1)),
    ).vertical('space-around', 'space-around').style({
        width : '100px',
        height : '100px',
        border : '1px darkblue solid',
        padding : '10px',
        textAlign : 'center',
        forntSize : '2em'
    });
    return UI;
  },
  {
    start: { type: Number },
    color: { type : String }
  },
);
