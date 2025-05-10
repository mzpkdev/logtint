# LogTint 🌈

<div align="center">

[![npm version](https://img.shields.io/npm/v/logtint.svg)](https://www.npmjs.com/package/logtint)
[![bundle size](https://img.shields.io/bundlephobia/min/logtint)](https://bundlephobia.com/result?p=logtint)
[![license](https://img.shields.io/npm/l/logtint.svg)](https://github.com/mzpk/logtint/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mzpk/logtint/pulls)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

<div align="center">

> **LogTint** is a lightweight, modern library for styling `console.log` output — designed to work seamlessly in both **Node.js** and **the browser**.  

Whether you're building for a node.js or browser, format your console.logs with colors, backgrounds, and text decorations.

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


</div>

## 📦 Installation

```bash
npm install logtint
```

## 🚀 Quick Start

Make your console output shine with bold text and vibrant colors - it's as easy as writing a string:

```javascript
import log, { bold, cyan } from "logtint"

log`You encounter a ${bold("mysterious door")}...`
log`A glowing rune shines in ${cyan("cyan light")} above it.`

log`${bold(cyan("You cast Bold Cyan Blast!"))}`
```

The `tint` function is your secret weapon for creating reusable styled messages - perfect for crafting beautiful logs that you can use anywhere:

```javascript
import log, { tint, italic, bgMagenta } from "logtint"

const scroll = tint`A ${italic("whispered")} incantation drifts through the air...`

// Hijack your console.log 
console.log = (message) => {
    log`⚠️ A ${bgMagenta("hidden rune")} reveals: ${message}`
}

console.log(scroll)
```

Your complete styling toolkit awaits! From text formatting to colors and backgrounds - all tree-shakeable for that sweet, minimal bundle size 🎨:

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

Level up your console game! Mix and match styles to create sophisticated output - watch how they stack from the inside out:

```javascript
import log, { bold, italic, underline, red } from "logtint"

const spell = (text) => 
    bold(italic(underline(red(text))))

log`Casting ${spell("bold, italic, underlined red firball")}`
```
