---
title: Zikojs Overview
description: Zikojs Overview
sidebar:
    label : overview
---

ZikoJS is a modular JavaScript ecosystem designed to provide powerful, low-level building blocks for mathematical computing, UI composition, and advanced data manipulation.

The [ziko](https://www.npmjs.com/package/ziko) package is the core of the **ZikoJS** ecosystem.
It has no dependencies, while **ZikoJS** represents the complete ecosystem of related packages and tools.

The core ziko package is organized into the following foundational modules:

- **Math** : Numerical utilities, and mathematical primitives
- **UI** : Hypercsript based low-level UI composition primitives and DOM abstractions
- **Time** : time-based utilities, scheduling, and temporal helpers
- **Router** : lightweight routing primitives for navigation and state transitions
- **Hooks** : reactive and composable logic primitives
- **Events** : unified event handling abstractions

These modules form the stable, minimal kernel upon which the rest of the ecosystem is built.

## Ecosystem Components
Beyond the core, ZikoJS includes additional packages and tools that extend functionality while remaining aligned with the core design principles:

- **ziko-server** : server-side utilities and abstractions built on top of the ziko core
- **ziko-wrapper** : integration and wrapper utilities for connecting ZikoJS with external environments or frameworks
- **mdzjs** : Markdown-driven tooling and content processing within the ZikoJS ecosystem
- **zextra** : a collection of additional UI components