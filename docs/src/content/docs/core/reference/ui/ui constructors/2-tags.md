---
title: Zikojs | UI | tags
description: UI tag factory
sidebar:
    label : tags
---

`tags` acts as a dynamic `UIElement` factory.

Each property access (`tags.div`, `tags.span`, …) is resolved at runtime and returns a function that instantiates a `UIElement` bound to the requested tag name.

A common way to use tags is shown below:
```js
const {a, span, div, img} = tags

// This is equivalent to:
 const a = new UIElement('a')
 const span = new UIElement('span')
 const div = new UIElement('div')
 const img = new UIElement('img')
```

## Features

- **Custom tag support** — property names are automatically normalized, allowing `tags.custom_tag` to map to the `custom-tag` element.
- **HTML and SVG tag support** — HTML and SVG elements are handled differently internally, with automatic namespace resolution and the appropriate creation logic applied at runtime.

## Limitations

`tags` only creates new elements.  
If you want to transform an **existing DOM element** into a `UIElement`, you need to use the `UIElement` constructor.

Example :

```js
 const img1 = document.getElementById('img1')
 const zikojs_img1 = new UIElement(img1) 
```