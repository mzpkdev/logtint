import { inBrowser } from "./utils"
import { FORMATTING } from "./TextStyle"


export const END = "<END>"

type Tinted =
    { text: string, styles: string[], toString?: () => string }

function toString(this: Tinted): string {
    return this.text
}

const Tinted = (eitherTextOrTint: string | Tinted, style: string): Tinted => {
    if (inBrowser()) {
        const text = `%c${eitherTextOrTint}%c`
        if (Tinted.isTinted(eitherTextOrTint)) {
            const styles = eitherTextOrTint.styles
                .map(original => `${style}${original}`)
            styles.unshift(style)
            return { text, styles, toString }
        }
        return { text, styles: [ style, "" ], toString }
    }
    let text = String(eitherTextOrTint)
    if (Tinted.isTinted(eitherTextOrTint)) {
        text = text.replaceAll(END, `${END}${style}`)
        text = `${style}${text}${END}`
        return { text, styles: [], toString }
    }
    text = `${style}${text}${END}`
    return { text, styles: [], toString }
}

Tinted.isTinted = (value: Tinted | unknown): value is Tinted => {
    return !!(value && value.hasOwnProperty("text"))
}

export const tint = (strings: TemplateStringsArray, ...values: unknown[]): Tinted => {
    const styles: string[] = []
    const text = strings.reduce((accumulator, string, i) => {
        const tinted = values[i] ?? ""
        let value = String(tinted)
        if (Tinted.isTinted(tinted)) {
            styles.push(...tinted.styles)
        }
        return accumulator + string + value
    }, "")
    return { text, styles, toString }
}


export default Tinted
