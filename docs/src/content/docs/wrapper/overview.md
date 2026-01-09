---
title: Zikojs | Wrapper
description: Wrapper
sidebar:
    label : overview
    order : 0
---

**`ziko-wrapper`** lets render zikojs elements within other framerworks and there is three levels 

## Integration levels

### One-way integration : 

Designed for **rendering frameworks**, this mode allows Zikojs elements to be rendered inside the host framework, but not the other way around.

**Examples:** Astro, Next.js ..

### Two-way integration

This mode targets *interactive frameworks* where both sides can fully participate in the render and update lifecycle.

It allows *Zikojs elements to be rendered inside the host framework*, and also enables *host framework components to be rendered inside Zikojs*.

In this setup, rendering, state updates, and events can flow **in both directions**, with neither side being strictly dominant.

**Examples:** React, Vue, Svelte

### Interleaving

Interleaving is the most advanced integration mode.  
It allows *deep, bidirectional nesting* between Zikojs and the host framework.

In this approach, Zikojs and the host framework can *nest into each other at any depth*, forming mixed render trees

For now it supports **Vanjs**


## Supports

|One-way integration|Two-way integration|Interleaving|
|-|-|-|
| `Astro`| `Preact` | `Van`|
| `Next`| `React`||
| `Nuxt`| `Vue`||
| `SvleteKit` | `Svelte` ||
| `SolidStart` | `Solid` ||
|`Remix`||

