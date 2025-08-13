<img src="docs/assets/logo-200.svg" width="100" align="right" alt="zikojs logo">

*💡 **Zikojs** a versatile JavaScript library offering a rich set of UI components, advanced mathematical utilities, interactivity ,animations, client side routing and graphics capabilities* 

## Install 
```bash
npm install ziko
```
## 🎬 Demos 
- ### [  Windows entanglement using zikojs and ziko-three ](https://www.linkedin.com/feed/update/urn:li:activity:7144023650394918913/) 

## Features :

### 🔰 Seamlessly operates in both browser and Node.js environments

### 🔰 Mathematical Utilities & Tips

- ***Flexible Math Functions*** : 

ZikoJS offers flexible math utilities, such as the `mapfun` function, which allows mapping standard mathematical operations to complex and nested data structures. 
For example, the `cos` function in ZikoJS is built on top of mapfun, enabling it to handle multiple arguments with diverse types (numbers, arrays, objects).

```js
import { cos, PI } from "ziko";
const result = cos(PI, PI / 2, PI / 4, [PI / 6, PI / 3], {
  x: PI / 2,
  y: PI / 4,
  z: [0, PI / 12],
}
);
/*
result =>
[
  -1,
  0,
  0.707106781186548,
  [0.866025403784439, 0.5],
  {
    x: 0,
    y: 0.707106781186548,
    z: [1, 0.965925826289068],
  },
];
*/
// console.log(result)

```
You can also built your own flexible Math function using this mapfun util : 
```js
import { mapfun } from "ziko";
const parabolic_func = (a, b, c, x) => a * x ** 2 + b * x + c;
const map_parabolic_func =
  (a, b, c) =>
  (...X) =>
    mapfun((n) => parabolic_func(a, b, c, n), ...X);
const a = -1.5,
  b = 2,
  c = 3;
const X = [0, 1, 2, 3];
console.log(parabolic_func(a, b, c)(X));
// [3,3,1,3]

```

- Built in Matrix, Complex, Random ... classes 

### 🔰 No Template Engines :
zikojs UI module adopts a distinctive approach to building and updating user interfaces. It doesn't rely on predefined markup templates. Instead, it leverages a hyperscript-like syntax to dynamically create and update user interfaces.

### 🔰 Built in File-Based Routing with Single Page Application

ZikoJS provides an intuitive file-based routing mechanism that simplifies the development of single-page applications. By organizing your page components into a directory structure, you can automatically generate routes based on the file paths. This approach enhances the maintainability of your code by allowing you to easily manage and navigate between different views in your application.

To implement file-based routing, simply use the following code:

```js
import { FileBasedRouting } from "ziko";
FileBasedRouting(import.meta.glob("./src/pages/**/*.js"))
```
In this example, the import.meta.glob function dynamically imports all JavaScript files from the specified directory (./src/pages/**). Each file represents a separate route in your application, allowing you to create a clean and organized routing structure without the need for manual route configuration.

### 🔰 Flexible Integration with Popular Frameworks/Libraries

**ZikoJS** is designed to seamlessly integrate into other frameworks and libraries. By installing the [ziko-wrapper](https://github.com/zakarialaoui10/ziko-wrapper) package, you can easily use ZikoJS within your favorite frontend ecosystems.

Currently supported frameworks: 
 - ***REACT***
 - ***Solid***
 - ***Preact***
 - ***Svelte***
 - ***Vue***

### 🔰 Custom Markdown Parser 

[Mdzjs](https://github.com/zakarialaoui10/mdzjs) allowing you to write markdown content alongside Zikojs Elements 

```md
---
 title : Article 1
---

import InteractiveBlock from "./InteractiveBlock";

# Hello World this is markdown heading 

<InteractiveBlock data = "Hello" />
```

### 🔰 Growing Add-On Ecosystem

|Addon|Purpose|Dependencies|Repository|
|-|-|-|-|
|ziko-gl||`threejs`|
|ziko-code||`codeMirror`||
|ziko-chart||`chartjs`||
|ziko-pdf||`jsPdf.js`||
|ziko-xls||`xls.js`||
|ziko-lottie||`Lottie-web`|
|ziko-rough||`rough.js`|
|ziko-icons||`fontawesome`|
|ziko-tippy||`tippy.js`|


### 🔰 Rich UI elements

### 🔰 Reactivity 

### 🔰 Time loop and animations support

## ⭐️ Show your support <a name="support"></a>

If you appreciate the library, kindly demonstrate your support by giving it a star!<br>
[![Star](https://img.shields.io/github/stars/zakarialaoui10/ziko.js?style=social)](https://github.com/zakarialaoui10/ziko.js)
<!--## Financial support-->
# License 
This projet is licensed under the terms of MIT License 
<img src="https://img.shields.io/github/license/zakarialaoui10/zikojs?color=rgb%2820%2C21%2C169%29" width="100" align="right">
