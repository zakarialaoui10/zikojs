---
title: Zikojs | Math | Mapfun - The core of Extended Array Programming 
description: mapfun
sidebar:
    label : mapfun
    order : 0
---

## Introduction

**Mapfun** is the heart of Zikojs extended array programming.  
It allows applying functions recursively to deeply nested structures — arrays, objects, or mixed types — preserving their shape and type, without manual loops or recursion.


## Javascript Limitation :

While JavaScript offers a built-in `Math` module, it has limitations in flexibility and handling complex data structures:

```js
Math.sqrt(4)        // 2
Math.sqrt(4, 9)     // 2  (ignores extra arguments)
Math.sqrt([4, 9, 16]) // NaN
```
- Cannot handle multiple arguments simultaneously.
- Cannot map functions over arrays or objects automatically
- Lacks support for deeply nested or heterogeneous structures.

## Existing Solutions in Other Languages and Libraries

Array programming libraries in other languages partially solve this problem:

- **NumPy (Python):** Provides efficient vectorized operations on arrays, but primarily works with homogeneous arrays. Nested lists require manual handling.

- **MATLAB:** Supports matrix and array operations natively, excellent for linear algebra and numeric computing, but struggles with nested or mixed-type structures.

- **R Lang:** Vectorized operations are supported and convenient for statistical computing, but deeply nested lists or heterogeneous objects require custom iteration.

Even these solutions do not fully support deeply nested or heterogeneous structures in a clean, recursive, type-preserving way.

## Solution : 
Zikojs introduces mapfun, a functional, type-preserving mapper.
It enables you to apply any function over numbers, arrays, objects, and nested combinations thereof without side effects.

### Features 
- Recursive Processing, Enabling transformations on deeply nested data structures.
- No need for explicit recursions or loops, eliminating the need for manual recursion or loops.
- Preserves Data Type Format.
- Supports Heterogeneous Structures, working with diverse, mixed data types.
- No Side Effect, adopting a functional approach to ensure immutability and avoid unintended
changes.
- works with any unary function, including user-defined functions.
- Ideal for scientific computing where operations must be applied across complex, structured datasets.


### Example 

```js
import { mapfun } from "ziko/math/functions/mapfun";
// or import { mapfun } from "numz/functions/mapfun"  
const sqrt = (...x) => mapfun(Math.sqrt, ...x)
const result = sqrt(1, 4, 9, [16, 25], {
  x: 36,
  y: 49,
  z: [64, 81],
}
);
/*
result =>
[
  1,
  2,
  3,
  [4, 5],
  {
    x: 6,
    y: 7,
    z: [8, 9],
  },
];
*/
```
