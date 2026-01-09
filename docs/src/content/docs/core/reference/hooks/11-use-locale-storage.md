---
title: Zikojs | Hooks | useLocaleStorage
description: useLocaleStorage
sidebar:
    label : useLocaleStorage
---

## Signature 

```ts
    useLocaleStorage(
        key: string,
        initialValue?: Record<string, any>,
        use_channel?: boolean
    ) : UseStorage
```

## Methods

- `.set(data: Record<string, any>) : this` : Set entire storage
- `.add(data: Record<string, any) : this` : Merge new data into existing storage
- `.remove(...keys: string[]) : this` : remove keys from storage
- `.get(key: string) : any` : 
- `.clear() : this` : Clear storage completely
- `.onStorageUpdated(callback: (data: Record<string, any> : void) : this` : Listen for any storage updates.