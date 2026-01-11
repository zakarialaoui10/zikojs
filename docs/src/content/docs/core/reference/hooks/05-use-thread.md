---
title: Zikojs | Hooks | useThread
description: useThread
sidebar:
    label : useThread
---

## Definition

**`useThread`** is a lightweight utility for executing **pure functions in a separate thread**
using the browser’s **Web Worker** API.

It allows you to offload heavy or blocking computations without freezing the UI.

## Signature 

```ts
    useThread(
        fn : Function, 
        callback : (result, error) : void
        args? : any[],
        close? : boolean
    ) : UseThread
```

## Methods

- `📦 .call() : this`
- `📦 .terminate() : this`