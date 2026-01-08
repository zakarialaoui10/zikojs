---
title: Zikojs | Router | SPA File Based Router
description: SPA File Based Router
sidebar:
    label : SPA File Based Router
---

## Usage

```js
import { createSPAFileBasedRouter } from "ziko/router"
const routes = await createSPAFileBasedRouter(
    import.meta.glob('./pages/**/*.js')
)
```