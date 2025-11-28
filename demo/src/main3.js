import { tags, Flex , tick, loop} from "ziko";
import { useDerived, useState, useChannel, useThread } from "ziko/hooks";
import { define_wc } from 'ziko/ui/web-component'
console.log(useThread)
globalThis.ch1 = useChannel('state-sync1')
globalThis.ch2 = useChannel('state-sync2')

// Function to run in worker
function heavyComputation() {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
        sum += i;
    }
    return sum;
}

// Using useThread helper
useThread(heavyComputation, (result, error) => {
    if (error) {
        console.error("Worker error:", error);
    } else {
        console.log("Computation result:", result);
    }
});


const {slot, div, p, button, style} = tags

// console.log(import.meta.env)



// ch2.on('value', e=>setValue(e))



// // send to specific rooms
// ch2.emit("message", "Hello rooms 1 & 2!", ["room1", "room2"]);

// div('Value : ', value).mount(document.body)
// tick(()=>setValue(n => n+1), 1000)
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
