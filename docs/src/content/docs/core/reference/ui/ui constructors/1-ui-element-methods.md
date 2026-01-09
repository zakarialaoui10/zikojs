---
title: Zikojs | UI | UIElement
description: UIElement Methods & Getters 
sidebar:
    label : UIElement Methods & Getters
    order : 0
---

## Lifecycle 

- `📦 .mount() : this` : Mount the UI element to the DOM
- `📦 .unmount() : this` : Remove the UI element from the DOM.
- `📦 .onMounted() : this` : Not Implemented Yet
- `📦 .onUnmounted() : this` : Not Implemented Yet

## Indexing

- `📦 .at(index : number) : UIElement` : Get a child UIElement at a specific index.
- `📦 [Symbol.iterator] : UIElement` : 

## Content 
- `🧩 .html` : Get the HTML content of the UI element
- `🧩 .text : string`:  Get the Text content of the UI element

## DOM manipulation
- `🧩 .element : Element` : Get the underlying DOM element.
- `📦 .append(...items) : this` : Append child elements to the UI element
- `📦 .remove(...items) : this` : Remove child elements from the UI element
- `📦 .insertAt(index,...items) : this` : Insert child elements at a specified index within the UI element.
- `📦 .append(...items) : this` :
- `📦 .replaceElementWith(...items) : this` 

## Attribute manipulation
- `📦 .setAttr(name, values) : this` : Set attribute(s) on the UI element.
- `📦 .removeAttr(...names) : this` : Remove attribute(s) from the UI element.
- `🧩 .attr : this` : Get the attributes of the UI element.

## Styling 
- `📦 .style(styleObject) : this` : Set the Style of the UI element.
- `📦 .size(width, height) : this` : Set the size of the UI element by specifying its width and height.
- `📦 .show() : this` : Make the UI element visible.
- `📦 .hide() : this` : Hide the UI element.

## Layout Getters

- `🧩 .height : number` : Get the computed width of the UI element.
- `🧩 .width : number` : Get the computed height of the UI element.
- `🧩 .top : number`    : Get the distance from the top of the viewport.
- `🧩 .right : number`  : Get the distance from the right of the viewport.
- `🧩 .bottom : number` : Get the distance from the bottom of the viewport.
- `🧩 .left : number`   : Get the distance from the left of the viewport.


## Events handling 

- *Click* : 
  - `📦 .onClick() : this` : 
  - `📦 .onDblClick() : this` : 
  - `📦 .onClickAway() : this` : 
- *Ptr* : 
  - `📦 .onPtrDown() : this` : 
  - `📦 .onPtrUp()` :
  - `📦 .onPtrMove() : this` : 
  - `📦 .onPtrLeave() : this` : 
  - `📦 .onPtrEnter()` :
  - `📦 .onPtrCancel() : this` : 
  - `📦 .onPtrOut() : this` :  
- *Mouse*
  - `📦 .onMouseDown() : this` : 
  - `📦 .onMouseUp()` :
  - `📦 .onMouseMove() : this` : 
  - `📦 .onMouseLeave() : this` : 
  - `📦 .onMouseEnter()` :
  - `📦 .onMouseOut() : this` : 
- *Key* : 
  - `📦 .onKeyDown() : this` : 
  - `📦 .onKeyUp()` :
- *Drag* :
  - `📦 .onDrag()` :
  - `📦 .onDragStart()` :
  - `📦 .onDragEnd() : this` : 
  - `📦 .onDrop() : this` :   
- *Clipboard* : 
  - `📦 .onCopy() : this` : 
  - `📦 .onCut() : this` : 
  - `📦 .onPaste()` :
- *Focus* : 
  - `📦 .onFocus() : this` :  
  - `📦 .onBlur() : this` : 
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
  - `📦 .emit(event, detail) : this` : Emit a custom event from the UI element, optionally providing additional details in the detail parameter. This allows for flexible communication between elements.
  - `📦 .on(event, callback : function) : this` : Register and listen to custom events. The specified callbacks will be executed whenever the event is emitted.