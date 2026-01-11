---
title: Zikojs | Hooks | useEventEmitter
description: useEventEmitter
sidebar:
    label : useEventEmitter
---

## Definition

`useEventEmitter` is a lightweight event system hook that allows you to **register**, **emit**, and **manage custom events**.

It provides a familiar EventEmitter-style API with support for:
- Multiple listeners
- One-time listeners
- Listener limits
- Safe emission
- Event cleanup

---


## Signature

```ts
useEventEmitter(maxListeners?: number) : UseEventEmitter
```

## Methods

- `📦 .on(event: string, listener: (...args: any[]) => void): this` : 
- `📦 .once(event: string, listener: (...args: any[]) => void): this` :
- `📦 .off(event: string, listener: (...args: any[]) => void): this` : remove a specific listener.
- `📦 .emit(event: string, data?: any): `
- `📦 .remove(event: string): this`
- `📦 .clear(): this`
- `📦 .setMaxListeners(max: number): this`