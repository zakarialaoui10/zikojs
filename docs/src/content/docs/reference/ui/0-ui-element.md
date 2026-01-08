---
title: Zikojs | UI | UIElement
description: UIElement
sidebar:
    label : UIElement
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


## Methods

### Lifecycle 

- `📦 .mount()` : Mount the UI element to the DOM
- `📦 .unmount()` : Remove the UI element from the DOM.

### Indexing

### Content 
- `🧩 .html` : Get the HTML content of the UI element
- `🧩 .text`:  Get the Text content of the UI element

### DOM manipulation
- `📦 .append(...items)` : Append child elements to the UI element
- `📦 .remove(...items)` : Remove child elements from the UI element
- `📦 .inserAt(index,...items)` : Insert child elements at a specified index within the UI element.
- `📦 .append(...items)` :
- `📦 .replaceElementWith(...items)` 

### Attributs manipulation
- `📦 .setAttr(name, values)` : Set attribute(s) on the UI element.
- `📦 .removeveAttr(...names)` : Remove attribute(s) from the UI element.
- `🧩 .attr` : Get the attributes of the UI element.

### Styling 
- `📦 .style(styleObject)` : Set the Style of the UI element.
- `📦 .size(width,height)` : Set the size of the UI element by specifying its width and height.
- `📦 .show()` : Make the UI element visible.
- `📦 .hide()` : Hide the UI elemnt.


### Events handling 

- *Click* : 
  - `📦 .onClick()` : 
  - `📦 .onDblClick()` : 
  - `📦 .onClickAway()` : 
- *Ptr* : 
  - `📦 .onPtrDown()` : 
  - `📦 .onPtrUp()` :
  - `📦 .onPtrMove()` : 
  - `📦 .onPtrLeave()` : 
  - `📦 .onPtrEnter()` :
  - `📦 .onPtrCanncel()` : 
  - `📦 .onPtrOut()` :  
- *Mouse*
- *Key* : 
  - `📦 .onKeyDown()` : 
  - `📦 .onKeyUp()` :
- *Drag* :
  - `📦 .onDrag()` :
  - `📦 .onDragStart()` :
  - `📦 .onDragEnd()` : 
  - `📦 .onDrop()` :   
- *Clipboard* : 
  - `📦 .onCopy()` : 
  - `📦 .onCut()` : 
  - `📦 .onPaste()` :
- *Focus* : 
  - `📦 .onFocus()` :  
  - `📦 .onBlur()` : 
- *View* : 
  - `📦 .onEnterView()` :
  - `📦 .onExitView()` :
  - `📦 .onResizeView()` :
- *Swipe* : 
  - `📦 .onSwipeDown()` :
  - `📦 .onSwipeRight()` :
  - `📦 .onSwipeUp()` :
  - `📦 .onSwipeLeft()` :
- *Custom Events :*
  - `📦 .emit(event, detail)` : Emit a custom event from the UI element, optionally providing additional details in the detail parameter. This allows for flexible communication between elements.
  - `📦 .on(event, callback : function)` : Register and listen to custom events. The specified callbacks will be executed whenever the event is emitted.