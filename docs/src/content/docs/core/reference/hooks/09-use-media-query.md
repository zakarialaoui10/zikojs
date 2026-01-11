---
title: Zikojs | Hooks | useMediaQuery
description: useMediaQuery
sidebar:
    label : useMediaQuery
---

## Definition 

**`useMediaQuery`** is a utility hook for reacting to **CSS media query changes**
directly from JavaScript.

It allows you to execute callbacks when specific media queries match and run a
fallback callback when **no rule matches**


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

## Basic example

```js
import { useMediaQuery } from 'ziko/hooks'

useMediaQuery(
    [
        {
            query: '(min-width: 600px)',
            callback: () => console.log('Desktop')
        },
        {
            query: '(max-width: 599px)',
            callback: () => console.log('Mobile')
        }
    ],
    // () => console.log('No match')
)

```