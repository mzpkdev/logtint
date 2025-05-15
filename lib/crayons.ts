import { inBrowser, inServer } from "./utils"
import tint, { Tint, TintStyle, TintColor } from "./tint"


const formatting = {
    reset: TintStyle("color: unset;", 0),
    italic: TintStyle("font-style: italic;", 3),
    bold: TintStyle("font-weight: bold;", 1),
    underline: TintStyle("text-decoration: underline;", 4),
    strikethrough: TintStyle("text-decoration: line-through;", 9),
    dim: TintStyle("opacity: 0.5;", 2),
    inverse: TintStyle("filter: invert(100%);", 7),
    hidden: TintStyle("visibility: hidden;", 8)
}

const colors = {
    black: TintColor([ "color", 0, 0, 16 ], 30),
    white: TintColor([ "color", 0, 0, 90 ], 37),
    red: TintColor([ "color", 4, 65, 52 ], 31),
    green: TintColor([ "color", 142, 61, 35 ], 32),
    blue: TintColor([ "color", 210, 50, 53 ], 34),
    yellow: TintColor([ "color", 54, 100, 39 ], 33),
    magenta: TintColor([ "color", 300, 43, 55 ], 35),
    cyan: TintColor([ "color", 180, 100, 35 ], 36)
}


export type Crayon = (TintStyle | TintColor) & {
    (text: string): Tint
    (text: Tint): Tint
    (strings: TemplateStringsArray, ...values: unknown[]): Tint
}

export const crayon = (style: TintStyle | TintColor): Crayon => {
    const fn = (strings: string | Tint | TemplateStringsArray, ...values: unknown[]): Tint => {
        if (Tint.isTint(strings)) {
            return Tint(strings, String(style))
        }
        if (typeof strings === "string") {
            return Tint(strings, String(style))
        }
        return Tint(tint(strings, ...values), String(style))
    }
    return Object.assign(fn, style)
}


export const bg = (color: Crayon): Crayon => {
    if (TintStyle.isTintStyle(color)) {
        return color
    }
    let { ansi, css } = color
    if (inBrowser()) {
        const [ , r, g, b ] = css
        css = [ "background-color", r, g, b ]
    }
    if (inServer()) {
        if ((ansi >= 30 && ansi <= 37) || (ansi >= 90 && ansi <= 97)) {
            ansi = ansi + 10
        }
    }
    return crayon(TintColor(css, ansi))
}

export const bright = (color: Crayon): Crayon => {
    if (TintStyle.isTintStyle(color)) {
        return color
    }
    let { ansi, css } = color
    if (inBrowser()) {
        let [ property, h, s, l ] = css
        s = Math.min(s + 10, 85)
        l = Math.min(Math.max(l, 45) + 15, 75)
        css = [ property, h, s, l ]
    }
    if (inServer()) {
        if ((ansi >= 30 && ansi <= 37) || (ansi >= 40 && ansi <= 47)) {
            ansi = ansi + 60
        }
    }
    return crayon(TintColor(css, ansi))
}


export const reset = crayon(formatting.reset)
export const italic = crayon(formatting.italic)
export const bold = crayon(formatting.bold)
export const underline = crayon(formatting.underline)
export const strikethrough = crayon(formatting.strikethrough)
export const dim = crayon(formatting.dim)
export const inverse = crayon(formatting.inverse)
export const hidden = crayon(formatting.hidden)

export const black = crayon(colors.black)
export const white = crayon(colors.white)
export const red = crayon(colors.red)
export const green = crayon(colors.green)
export const blue = crayon(colors.blue)
export const magenta = crayon(colors.magenta)
export const yellow = crayon(colors.yellow)
export const cyan = crayon(colors.cyan)
