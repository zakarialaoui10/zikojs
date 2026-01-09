---
title: Zikojs | Hooks | useEventEmitter
description: useEventEmitter
sidebar:
    label : useEventEmitter
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