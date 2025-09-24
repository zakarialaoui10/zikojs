// import {text, p} from "ziko/src"
// import { bindPointerEvent, bindClipboardEvent} from "ziko/events"
// import { bindCustomEvent } from "../../src/events/custom-event"
import {  tags, text, Flex, HTMLWrapper, complex } from "ziko"
import { ZikoUIElement } from "ziko"

class UI2 extends ZikoUIElement{
  constructor(...args){
    super(...args)
  }
  at(){
    return 1
  }
}
globalThis.aa = new UI2('div').append('kkd ')
import 'ziko/math/functions/proxy.js'
globalThis.a = complex(1, 1)
globalThis.tags = tags
// import { Matrix } from "ziko/math"

globalThis.text = text

import { useRoot } from "ziko/use/use-root.js"

globalThis.list = tags.ul(
  tags.li('kkk'),
  tags.li('jjj')
)
// import { useState, useDerived } from "ziko/hooks"

// const [getA, setA] = useState(1);
// const [getB, setB] = useState(2);



// const [count, setCount, controller] = useState(0)
// globalThis.controller = controller;

// // Derived state: sum of A and B
// // const getSum = useDerived(
// //     () => getA().value + getB().value +count().value,
// //     [getA, getB, count]
// // );

// const [sum] = useDerived(
//   (a,b,c) => `${a+b+c + Math.random()}`,
//   [getA, getB, count]
// )

// globalThis.sum = sum
import { mapfun } from "ziko";
globalThis.mapfun = mapfun
import {useState, useDerived, useReactive} from 'ziko/hooks'
const [timer, setTimer] = useState(0);
const convertSeconds = seconds => `${Math.floor(seconds / 3600)} : ${Math.floor((seconds % 3600) / 60)} : ${seconds % 60} `
const [time] = useDerived(t => convertSeconds(t) , [timer] ) 

globalThis.TT = tags.p('Elapsed Time : ', time)
// let i = 1;
// setInterval(()=>{
//   setTimer(i);
//   i++
// }, 100)

Flex(
  TT
)

globalThis.R = useReactive({ fName : 'zakaria', lName: 'elalaoui'})
// globalThis.setCount = setCount
// import { useRoot } from "ziko/use"
// console.log(useRoot)

globalThis.Styles = {
   s1 : {
    color : 'darkblue',
    background : 'white',
    border : '2px solid darkblue'
   },
   s2 : {
    color : 'white',
    background : 'darkblue',
    border : '2px solid gold'
   }
}

globalThis.A = useRoot(Styles.s1, {namespace : ''})
const {border, color, background} = A

tags.p("Test useRoot ").style({
  border,
  color,
  background,
  padding : '10px'
})

const {span, p, section, code} = tags

globalThis.s = section(
  p(
    span("hello"),
    code("world")
  )
)

// mapfun( n=>{
//   // console.log(n)
//   return n
// }, s.items)

// globalThis.m = new Matrix(3,3,[1,2,3,4,5,6,7,8,9])
// // import { watch } from "ziko/observer"
// // import { compose } from "../../src/__helpers__"

// globalThis.ZikoUIElement = ZikoUIElement
// globalThis.ss = Section()


// globalThis.tags = tags
// globalThis.t = text("red").setAttr("contenteditable", true)
// // globalThis.w = watch(t,{}, e=>console.log(e))

// globalThis.ev = bindPointerEvent(t)
// // globalThis.ev2 = bindClipboardEvent(t)

// ev.onPtrDown(e=>console.log(e))
// // ev2.onCopy(e=>console.log(e))

// // import {tags} from "ziko/ui"
// // console.log(tags["div"])

// // globalThis.h = tags.head

// // // ev2.on

// globalThis.cev = bindCustomEvent(t)


// globalThis.t1 = p("t1")
// globalThis.t2 = p("t2")
// globalThis.t3 = p("t3")
// globalThis.t4 = p("t4")
// globalThis.t5 = p("t5")
// globalThis.t6 = p("t6")

// globalThis.con = tags.div(t1, t2, t3, t4, t5, t6)


// // <h1 x-data="{ message: 'I ❤️ Alpine' }" x-text="message"></h1>

// tags.h1({
//     xData:"{ message: 'I ❤️ Alpine' }",
//     xText:"message"
// })

// // tags.p({"@ll":"10"})


// globalThis.mo = new MutationObserver(mutations => {
//   console.log(mutations);
// });
// mo.observe(document.body, { childList: true, subtree: true });