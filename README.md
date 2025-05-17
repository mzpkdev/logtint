<div align="center">

[![license](https://img.shields.io/npm/l/logtint.svg)](https://github.com/mzpkdev/logtint/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/logtint.svg)](https://www.npmjs.com/package/logtint)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![bundle size](https://img.shields.io/bundlephobia/minzip/logtint)](https://bundlephobia.com/result?p=logtint)

</div>
<br>
<br>

<p align="center">
  <img src="./.github/assets/logo.png" height="110" align="center" />
  <p align="center">
    <strong>logtint</strong> is a lightweight, isomorphic library that brings colors and style to your <code>console.log</code> <br>  
      — use single API that works in both <em>Node.js</em> and the <em>browser</em>
    <br />
    <br />
    <a href="#how-to-use"><strong>Explore the API »</strong></a>
    <br />
    <br />
    <a href="https://github.com/mzpkdev/logtint/issues">Report a bug</a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="https://github.com/mzpkdev/logtint/issues">Request a feature</a>
  </p>
<br />
<br />

Table of Contents
------------------

* [Overview](#overview)
    * [Why LogTint?](#why-logtint)
    * [Key Features](#key-features)
* [Getting started](#getting-started)
    * [How to install](#how-to-install)
    * [How to use](#how-to-use)

Overview
---------

### Why LogTint?

Tired of digging through walls of gray text? Logging doesn’t have to be a snoozefest.  
Whether you're squashing bugs, keeping an eye on things, or just want your console to look a bit fancier, 
`logtint` will help you highlight the important stuff — with style, consistency, and no fuss.

You know what's best of all?  
It **works** seamlessly in **Node.js** and the **browser**.

### Key Features

<div align="center">

<table>
  <tbody>
    <tr>
      <td>🌐 Isomorphic</td>
      <td>Use the same API in both Node.js and the browser</td>
    </tr>
    <tr>
      <td>🚀 Zero dependencies</td>
      <td>Lightweight, fast, and easy to include in any project</td>
    </tr>
    <tr>
      <td>🌲 Tree-shakeable</td>
      <td>Only things you use make it into your final bundle</td>
    </tr>
    <tr>
      <td>💙 TypeScript</td>
      <td>Type definitions right out of the box</td>
    </tr>
  </tbody>
</table>     

</div>

Getting started
----------------

`logtint` lets you add color and style to your logs with a single, easy-to-use API.
It works in both Node.js and the browser, handling the messy stuff behind the scenes — ANSI codes for terminals, CSS for
browsers.
You just write your log once, and it figures out the rest.

### How to install

```shell
npm install logtint
```

### How to use

You wrap the parts of the message with utilities like `bold`, `cyan`, or any other to apply styling.
Once you have your message ready, you need it to pass it through `log` function to make the styling work.

```javascript
import log, { underline, bold } from "logtint"

log`By default, your messages are output through ${underline`console.log.`}.`
log(console.info)`But do you know you can output your messages through ${bold`any`} function?`
log(console.error)`You just need to pass a function that takes the message as its first argument!`
```

> [!TIP]  
> Most `logtint` utilities can be used as both functions and template literals  
> Use the syntax that fits best for your use case — they’re interchangeable!

Want to turn a color into a background? Just wrap it with `bg(...)`.  
Need a brighter version of a color? Make it brighter with `bright(...)`.

And yes — you can mix them!

```javascript
import log, { bright, bg, yellow } from "logtint"

log(bg(yellow)`You can make any color a background color!`)
log(bright(yellow)`Or maybe you just need a brighter color?`)
log(bright(bg(yellow))(yellow`Yellow text on a bright yellow background? Just use both!`))
```

Use `tint` whenever you must keep your tinted reusable bits for later!

```javascript
import log, { tint, italic, bg, blue } from "logtint"

const message = tint`A ${italic`reusable`} message.`
const logger = (level, message) =>
    tint`[${level}] ${message}`
const debug = bg(blue)`DEBUG`

// Hijack your console.log 
console.log = (message) => {
    log(console.log)`${logger(debug, message)}`
}

console.log(message)
```

A lot of crayons to choose from!  
All tree-shakeable to keep your bundles lean and mean.

```javascript
import {
    // Crayons for text formatting
    bold, italic, underline, strikethrough, dim, inverse, hidden,
    // Crayons for coloring
    black, white, red, green, blue, yellow, magenta, cyan,
    // Crayon modifiers
    bg, bright
} from "logtint"
```

Compose and reuse!

```javascript
import log, { bright, magenta, bold, italic, underline } from "logtint"

const highlight = bright(magenta)
const format = (text) => highlight(bold(italic(underline(text))))

log`You can compose them and combine them into a ${format("single crayon combo")}.`
```

Or make your own!

```javascript
import log, { crayon, TextStyle } from "logtint"

const overline = crayon(TintStyle("text-decoration: overline;", 9 /* underline */))

log`You need your own? ${overline("We've got you covered!")}`
```
