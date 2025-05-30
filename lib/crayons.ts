import { UnsupportedColorSpace } from "./errors"
import symbols from "./symbols"
import { inBrowser, inServer, convertRGBToANSI256, convertHSLToRGB } from "./utils"
import tint, { Tint, TintStyle, TintColor, TintFactory } from "./tint"


const formatting = {
    reset: TintStyle.from("color: unset;", 0),
    italic: TintStyle.from("font-style: italic;", 3),
    bold: TintStyle.from("font-weight: bold;", 1),
    underline: TintStyle.from("text-decoration: underline;", 4),
    strikethrough: TintStyle.from("text-decoration: line-through;", 9),
    dim: TintStyle.from("color: color-mix(in srgb, currentColor 70%, transparent);", 2),
    inverse: TintStyle.from("filter: invert(100%);", 7),
    hidden: TintStyle.from("visibility: hidden;", 8)
}

const colors = {
    black: TintColor.from([ "color", "hsl", 0 / 360, 0, 0 ], [ 30, `\x1b[%cm` ]),
    white: TintColor.from([ "color", "hsl", 0 / 360, 0, 0.90 ], [ 37, `\x1b[%cm` ]),
    red: TintColor.from([ "color", "hsl", 4 / 360, 0.65, 0.52 ], [ 31, `\x1b[%cm` ]),
    green: TintColor.from([ "color", "hsl", 142 / 360, 0.61, 0.35 ], [ 32, `\x1b[%cm` ]),
    blue: TintColor.from([ "color", "hsl", 210 / 360, 0.50, 0.53 ], [ 34, `\x1b[%cm` ]),
    yellow: TintColor.from([ "color", "hsl", 54 / 360, 1.00, 0.39 ], [ 33, `\x1b[%cm` ]),
    magenta: TintColor.from([ "color", "hsl", 300 / 360, 0.43, 0.55 ], [ 35, `\x1b[%cm` ]),
    cyan: TintColor.from([ "color", "hsl", 180 / 360, 1.00, 0.35 ], [ 36, `\x1b[%cm` ])
}


export type Crayon = (TintStyle | TintColor | TintFactory) & {
    (text: string): Tint
    (text: Tint): Tint
    (strings: TemplateStringsArray, ...values: unknown[]): Tint
}

export const crayon = (style: TintStyle | TintColor | TintFactory): Crayon => {
    const fn = (strings: string | Tint | TemplateStringsArray, ...values: unknown[]): Tint => {
        let style2 = style
        if (TintFactory.isTintFactory(style)) {
            style2 = style(strings)
        }
        if (Tint.isTint(strings)) {
            return Tint.from(strings, String(style2))
        }
        if (typeof strings === "string") {
            return Tint.from(strings, String(style2))
        }
        return Tint.from(tint(strings, ...values), String(style2))
    }
    return Object.assign(fn, style, { [symbols.isCrayon]: true })
}


export const bg = (color: Crayon): Crayon => {
    if (TintStyle.isTintStyle(color) || TintFactory.isTintFactory(color)) {
        return color
    }
    let { ansi, css } = color
    if (inBrowser()) {
        const [ , scale, rh, gs, bl ] = css
        css = [ "background-color", scale, rh, gs, bl ]
    }
    if (inServer()) {
        let [ code, escape ] = ansi
        if ((code >= 30 && code <= 37) || (code >= 90 && code <= 97)) {
            code = code + 10
        }
        ansi = [ code, escape ]
    }
    return crayon(TintColor.from(css, ansi))
}

export const bright = (color: Crayon): Crayon => {
    if (TintStyle.isTintStyle(color) || TintFactory.isTintFactory(color)) {
        return color
    }
    let { ansi, css } = color
    if (inBrowser()) {
        const [ property, scale ] = css
        if (scale === "rgb") {
            throw new UnsupportedColorSpace()
        }
        if (scale === "hsl") {
            let [ , , h, s, l ] = css
            s = Math.min(s + 0.05, 0.85)
            l = Math.min(Math.max(l, 0.45) + 0.10, 0.75)
            css = [ property, scale, h, s, l ]
        }
    }
    if (inServer()) {
        let [ code, escape ] = ansi
        if ((code >= 30 && code <= 37) || (code >= 40 && code <= 47)) {
            code = code + 60
        }
        ansi = [ code, escape ]
    }
    return crayon(TintColor.from(css, ansi))
}

export const rgb = (r: number, g: number, b: number): Crayon => {
    const css = [ "color", "rgb", r, g, b ] as const
    let ansi = convertRGBToANSI256([ r, g, b ])
    return crayon(TintColor.from(css, [ ansi, `\x1b[38;5;%cm` ]))
}

export const hsl = (h: number, s: number, l: number): Crayon => {
    const css = [ "color", "hsl", h, s, l ] as const
    let ansi = convertRGBToANSI256(convertHSLToRGB([ h, s, l ]))
    return crayon(TintColor.from(css, [ ansi, `\x1b[38;5;%cm` ]))
}

export const colorize = crayon((string: string) => {
    const input = string.trim()
    let hash = 0
    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash)
        hash |= 0
    }
    const r = ((hash >> 16) & 0xff + 256) % 256
    const g = ((hash >> 8) & 0xff + 256) % 256
    const b = (hash & 0xff + 256) % 256
    const css = [ "color", "rgb", r, g, b ] as const
    const ansi = convertRGBToANSI256([ r, g, b ])
    return TintColor.from(css, [ ansi, `\x1b[38;5;%cm` ])
})


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
