---
title: Zikojs | Hooks | useDerived
description: useDerived
sidebar:
    label : useDerived
---
## Definition 

`useDerived` is a reactive hook used to **derive a value from one or more reactive sources**.

It automatically recomputes its result whenever one of its dependencies changes, without mutating the original state.  
This makes it ideal for **computed values**, **formatting**, and **state transformations**.

> Think of `useDerived` as a *computed state* that always stays in sync.

## Usage

```js
import { tags } from 'ziko/ui'
import {useState, useDerived} from 'ziko/hooks'
export const Timer=()=>{
    const {floor} = Math
    const [timer, setTimer] = useState(0);
    const converToHMS = seconds => `${floor(seconds / 3600)} : ${floor((seconds % 3600) / 60)} : ${seconds % 60} `
    const formated_time = useDerived(t => converToHMS(t) , [timer] )
    let i = 1;
    setInterval(()=>{
        setTimer(i);
        i++
    }, 1000)
    return tags.p('Elapsed Time ==> ', formated_time)
}
```