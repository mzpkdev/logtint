import { UnsupportedEnvironment } from "./errors"
import symbols from "./symbols"
import { chooseByEnv, inBrowser, inServer } from "./utils"

export class Tint extends String {
    static {
        const blacklisted = [ "constructor", "toString", "valueOf", "length" ]
        for (const property of Object.getOwnPropertyNames(String.prototype)) {
            if (blacklisted.includes(property)) {
                continue
            }
            const copy: unknown = String.prototype[property as keyof String]
            if (typeof copy === "function") {
                Object.defineProperty(this.prototype, property, {
                    value: function (this: Tint, ...args: any[]) {
                        const original = copy.apply(this.original, args)
                        const encoded = this.encoded.replace(this.original, original)
                        if (typeof original === "string") {
                            return new Tint(original, encoded, this.styles)
                        }
                        return original
                    },
                    configurable: true,
                    writable: true
                })
            }
        }
    }

    static from(text: string | Tint, style?: string): Tint {
        const original = Tint.isTint(text)
            ? text.original : text
        let encoded = Tint.isTint(text)
            ? text.encoded : text
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
            encoded = `%c${encoded}%c`
            return new Tint(original, encoded, styles)
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
                ? style : ""
            encoded = encoded.replaceAll(`<END>`, `<END>${ansi}`)
            encoded = `${ansi}${encoded}<END>`
            return new Tint(original, encoded, styles)
        }
        throw new UnsupportedEnvironment()
    }

    static isTint(value: Tint | unknown): value is Tint {
        return !!(value && typeof value === "object" && symbols.isTint in value)
    }

    readonly original: string
    readonly encoded: string
    readonly styles: string[]

    constructor(original: string, encoded: string, styles: string[]) {
        super()
        this.original = original
        this.encoded = encoded
        this.styles = styles
    }

    toString(): string {
        return this.encoded
    }

    valueOf(): string {
        return this.encoded
    }

    get length(): number {
        return this.encoded.length
    }

    get [symbols.isTint](): boolean {
        return true
    }
}

export class TintStyle extends String {
    public readonly css: string
    public readonly ansi: number

    static from(css: string, ansi: number): TintStyle {
        return new TintStyle(css, ansi)
    }

    static isTintStyle(value: unknown): value is TintStyle {
        return !!(value && typeof value === "object" && symbols.isTintStyle in value)
    }

    constructor(css: string, ansi: number) {
        super()
        this.css = css
        this.ansi = ansi
    }

    toString(): string {
        return String(chooseByEnv(this.css, `\x1b[${this.ansi}m`))
    }

    get [symbols.isTintStyle](): boolean {
        return true
    }
}

export class TintColor extends String {
    public readonly css: readonly [ string, string, number, number, number ]
    public readonly ansi: [ number, string ]

    static from(css: readonly [ string, string, number, number, number ], ansi: [ number, string ]): TintColor {
        return new TintColor(css, ansi)
    }

    static isTintColor(value: unknown): value is TintColor {
        return !!(value && typeof value === "object" && symbols.isTintColor in value)
    }

    constructor(css: readonly [ string, string, number, number, number ], ansi: [ number, string ]) {
        super()
        this.css = css
        this.ansi = ansi
    }

    toString(): string {
        const [ property, scale ] = this.css
        let css = ""
        const [ code, escape ] = this.ansi
        let ansi = escape.replace("%c", String(code))
        if (scale === "rgb") {
            const [ , , r, g, b ] = this.css
            css = `${property}: ${scale}(${r}, ${g}, ${b});`
        }
        if (scale === "hsl") {
            const [ , , h, s, l ] = this.css
            css = `${property}: ${scale}(${h * 360}, ${s * 100}%, ${l * 100}%);`
        }
        return String(chooseByEnv(css, ansi))
    }

    get [symbols.isTintColor](): boolean {
        return true
    }
}

export type TintFactory = (...varargs: any[]) =>
    TintStyle | TintColor

export namespace TintFactory {
    export const isTintFactory = (value: unknown): value is TintFactory => {
        return typeof value === "function" && !(symbols.isCrayon in value)
    }
}

const tint = (strings: TemplateStringsArray, ...values: unknown[]): Tint => {
    const styles: string[] = []
    let outputOriginal = ""
    let outputEncoded = ""
    for (let i = 0; i < strings.length; i++) {
        const string = strings[i]
        const value = values[i] ?? ""
        let original = value
        let encoded = value
        if (Tint.isTint(value)) {
            styles.push(...value.styles)
            original = value.original
            encoded = value.encoded
        }
        outputOriginal = outputOriginal + string + original
        outputEncoded = outputEncoded + string + encoded
    }
    return new Tint(outputOriginal, outputEncoded, styles)
}


export default tint
