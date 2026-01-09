---
title: Zikojs | Hooks | useIPC
description: useIPC
sidebar:
    label : useIPC
---

## Signature 

```ts
    useIPC(name : string) : UseIPC
```

## Methods

- `📦 .emit(event: string, data: any, rooms?: string[]) : this`
- `📦 .on(event: string, handler: (data: any) => void, rooms?: string | string[]) : this`
- `📦 .off(event: string, handler: (data: any) => void) : this`
- `📦 .once(event: string, handler: (data: any) => void, rooms?: string | string[]): this`
- `📦 .join(...rooms: string[]) : this`
- `📦 .leave(...rooms: string[]) : this`
- `📦 .close() : this`