import { UnsupportedEnvironment } from "./errors"
import { chooseByEnv, inBrowser, inServer } from "./utils"


export type Tint = String & {
    text: string
    styles: string[]
    ["@@isTint"]: true
}

export const Tint = (text: Tint | string, style?: string): Tint => {
    const symbol = { ["@@isTint"]: true } as const
    if (inBrowser()) {
        let styles: string[] = []
        if (Tint.isTint(text)) {
            styles = text.styles
                .map(original => `${style} ${original}`)
        }
        if (style) {
            styles.unshift(style)
            styles.push("")
        }
        text = `%c${text}%c`
        return Object.assign(text, { ...symbol, text, styles })
    }
    if (inServer()) {
        const styles = []
        if (style) {
            styles.push(style)
        }
        if (Tint.isTint(text)) {
            styles.push(...text.styles)
        }
        const ansi = style
            ? `\x1b[${style}m` : ""
        text = text.replaceAll(`<END>`, `<END>${ansi}`)
        text = `${ansi}${text}<END>`
        return Object.assign(text, { ...symbol, text, styles })
    }
    throw new UnsupportedEnvironment()
}

Tint.isTint = (value: Tint | unknown): value is Tint => {
    return !!(value && value.hasOwnProperty("@@isTint"))
}


export type TintStyle = String & {
    css: string
    ansi: number
    ["@@isTintStyle"]: true
}

export const TintStyle = (css: string, ansi: number): TintStyle => {
    const symbol = { ["@@isTintStyle"]: true } as const
    const string = String(chooseByEnv(css, ansi))
    return Object.assign(string, { ...symbol, css, ansi })
}

TintStyle.isTintStyle = (value: unknown | TintStyle): value is TintStyle => {
    return !!(value && value.hasOwnProperty("@@isTintStyle"))
}


export type TintColor = String & {
    css: [ string, number, number, number ]
    ansi: number
    ["@@isTintColor"]: true
}

export const TintColor = (css: [ string, number, number, number ], ansi: number): TintColor => {
    const symbol = { ["@@isTintColor"]: true } as const
    const [ property, h, s, l ] = css
    const string = String(chooseByEnv(`${property}: hsl(${h}, ${s}%, ${l}%);`, ansi))
    return Object.assign(string, { ...symbol, css, ansi })
}

TintColor.isTintColor = (value: unknown | TintColor): value is TintColor => {
    return !!(value && value.hasOwnProperty("@@isTintColor"))
}


const tint = (strings: TemplateStringsArray, ...values: unknown[]): Tint => {
    const styles: string[] = []
    const text = strings.reduce((accumulator, string, i) => {
        const tinted = values[i] ?? ""
        if (Tint.isTint(tinted)) {
            styles.push(...tinted.styles)
        }
        return accumulator + string + String(tinted)
    }, "")
    const symbol = { ["@@isTint"]: true } as const
    return Object.assign(text, { ...symbol, text, styles })
}


export default tint
