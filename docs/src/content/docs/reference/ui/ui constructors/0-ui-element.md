---
title: Zikojs | UI | UIElement
description: UIElement
sidebar:
    label : UIElement
    order : 0
---

**`UIElement`** is the constructor class of every UI element in zikojs. 
It encapsulates the properties and behaviors of a UI element, including its HTML representation, styling, attributes, and event handling...
You can create a new UI element using the following syntax :

```js
 const UI = new UIElement(element);
 // element can be an HTML tag string or a DOM element.
```
Alternatively, you can simply use the [Built-in UI Elements]() provided by zikojs UI module."

In general, UIElement supports:
 - Nesting UI elements within each other.
 - Applying styling to UI elements using object notation.
 - Event handling 
 - Manipulating the DOM by adding, removing, and modifying child elements.


## UI Composition