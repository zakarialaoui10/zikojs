---
title: Zikojs | Hooks | useState
description: useState
sidebar:
    label : useState
---

`useState` is a hook that lets you add a state variable to your component.

```js
const [state, setState, controller] = useState(initialValue)
```

## Usage :

```js
export const Counter=()=>{
    const {div, span, button} = tags
    const [counter, setCounter] = useState(0);
    return div(
        span(counter),
        button('+').onClick(()=> setCounter(n => ++n)),
        button('-').onClick(()=> setCounter(n => --n)),
        button('reset').onClick(()=> setCounter(0))
    )
}
```

<!-- ```js
const [isVisible, toggleVisibility] = useState(true);
const p('Hello world').style({
    visibility : isVisibile
})

btn('Toggle Visibility').onClick(()=> currentValue => toggleVisibility(!currentValue))
``` -->