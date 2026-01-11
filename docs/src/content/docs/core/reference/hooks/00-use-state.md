---
title: Zikojs | Hooks | useState
description: useState
sidebar:
    label : useState
---

## Definition 

`useState` is a hook that lets you add **reactive state** to your component.

When the state value changes, any UI that depends on it updates automatically.

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

## Reactivity Model

`useState` in **Zikojs** is conceptually closer to **`createSignal` in SolidJS** than to **`useState` in React**.

- It updates **only the affected DOM node**
- It does **not re-render the entire component**
- State changes are applied **at node level**, not component level

This makes Zikojs state updates more **granular**, **efficient**, and **predictable**, especially for frequently changing values.

<!-- ```js
const [isVisible, toggleVisibility] = useState(true);
const p('Hello world').style({
    visibility : isVisibile
})

btn('Toggle Visibility').onClick(()=> currentValue => toggleVisibility(!currentValue))
``` -->