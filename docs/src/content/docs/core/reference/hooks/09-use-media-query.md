---
title: Zikojs | Hooks | useMediaQuery
description: useMediaQuery
sidebar:
    label : useMediaQuery
---

## Signature 


```ts
interface MediaQueryRule {
    query: string;
    callback: () => void;
}
useMediaQuery(
    mediaQueryRules?: MediaQueryRule[],
    fallback?: () : void
): UseMediaQuery
```