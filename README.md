# LogTint 🌈

<div align="center">

[![npm version](https://img.shields.io/npm/v/logtint.svg)](https://www.npmjs.com/package/logtint)
[![bundle size](https://img.shields.io/bundlephobia/min/logtint)](https://bundlephobia.com/result?p=logtint)
[![license](https://img.shields.io/npm/l/logtint.svg)](https://github.com/mzpkdev/logtint/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mzpk/logtint/pulls)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

<div align="center">

**LogTint** is a lightweight, isomorphic library that brings colors and style to your `console.log`  
— use single API that works in both **Node.js** and the **browser**

</div>

## ✨ Why LogTint?

<div align="center">

|                           |                                                        |
|---------------------------|--------------------------------------------------------|
| 🌐 **Isomorphic**         | Use the same API in both Node.js and the browser       |
| 🚀 **Zero Dependencies**  | Lightweight, fast, and easy to include in any project  |
| 📦 **Tree-shakeable**     | Only things you use make it into your final bundle     |
| 🎨 **Rich Styling**       | Colors, backgrounds, and text decorations—all included |
| 🛠 **TypeScript Support** | Type definitions right out-of-the-box                  |
|                           |                                                        |

</div>


## 📦 Installation

```bash
npm install logtint
```

## 🚀 Quick Start

Make your `console.log` shine with bold text and vibrant colors - it's as easy as writing a string.

> [!TIP]  
> Any function from `logtint` is a template literal as well  
> You may use both syntaxes interchangeably  

```javascript
import log, { bold, cyan } from "logtint"

log`You encounter a ${bold`mysterious door`}...`
log(console.info)`A glowing rune shines in ${cyan`cyan light`} above it.`
log(console.error)`${bold(cyan`You cast Bold Cyan Blast!`)}`
```

Use `tint` whenever you must keep your tinted strings for later use.

```javascript
import log, { tint, italic, bgMagenta } from "logtint"

const scroll = tint`A ${italic`whispered`} incantation drifts through the air...`

// Hijack your console.log 
console.log = (message) => {
    log(console.log)`⚠️ A ${bgMagenta`hidden rune`} reveals: ${message}`
}

console.log(scroll)
```

A lot of styles to choose from! All tree-shakeable to keep your bundles lean and fast.

```javascript
import {
    // Text Formatting
    bold, italic, underline, strikethrough, dim, inverse, hidden,
    // Standard Colors
    black, red, green, yellow, blue, magenta, cyan, white,
    // Bright Colors
    blackBright, redBright, greenBright, yellowBright,
    blueBright, magentaBright, cyanBright, whiteBright,
    // Background Colors
    bgBlack, bgRed, bgGreen, bgYellow,
    bgBlue, bgMagenta, bgCyan, bgWhite,
    // Bright Background Colors
    bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright,
    bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright
} from "logtint"
```

Compose and reuse!

```javascript
import log, { bold, italic, underline, red } from "logtint"

const spell = (text) =>
    bold(italic(underline(red(text))))

log`Casting ${spell("bold, italic, underlined red firball")}`
```
