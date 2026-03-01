---
title: Zikojs | UI | defineWC
description: defineWC
sidebar:
    label : defineWC
---

`defineWC` is a Zikojs UI utility that allows you to create **reusable Web Components** using Ziko’s declarative UI API.

It provides a simple way to define **custom elements** with isolated logic, styles, and configurable props.

Usage : 

```js
 import { defineWC, tags } from 'ziko/dom' 
 defineWC('hello-world', ({color = 'darkblue', text = 'world'} = {})=>{
    const {p, span} = tags;
    return p(`Hello ${text}`).style({
        color 
    })
 })
```

```html
<hello-world/>
<hello-world color = 'green' />
<hello-world text = 'everyone' />
```

## Features : 
 - Reusability : `defineWC` create reusable web components
 - Portability : Components defined with `defineWC` are standard Web Components and can be used in plain HTML, or alongside frameworks like React, Vue, or Svelte...
 - Isolation : Thanks to **Shadow Dom** each component runs in its own scope, preventing style and logic leakage and ensuring predictable behavior.
 - Control : 
 - Declarative API : 
 - Configurable Props : Attributes passed to the custom element are mapped to function parameters, making components easy to customize


## Advanced

### Slots
### Styling
### States