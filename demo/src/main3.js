import { tags, Flex , tick, loop} from "ziko";
import { useDerived, useState, useChannel } from "ziko/hooks";
import { define_wc } from 'ziko/ui/web-component'

globalThis.ch1 = useChannel('state-sync1')
globalThis.ch2 = useChannel('state-sync2')


const {slot, div, p, button, style} = tags

// console.log(import.meta.env)

const [value, setValue, controller] = useState('1')

ch2.on('value', e=>setValue(e))



// send to specific rooms
chat.emit("message", "Hello rooms 1 & 2!", ["room1", "room2"]);

div('Value : ', value).mount(document.body)
tick(()=>setValue(n => n+1), 1000)
// tick(e => n => setValue(n), 1000)
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
// define_wc("ziko-span", ()=> tags.span("ziko-span"))
// define_wc("ll", ()=> tags.span("ziko-span"))

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
    return [
      style(`
        button{ color : red; }
      `),
      UI
    ];
  },
  {
    start: { type: Number },
    color: { type : String }
  },
);
