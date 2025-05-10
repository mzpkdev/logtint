import { inBrowser } from "./utils"
import { FORMATTING } from "./TextStyle"


type Tinted =
    { text: string, styles: string[], toString?: () => string }

function toString(this: Tinted): string {
    return this.text
}

const Tinted = (eitherTextOrTint: string | Tinted, style: string): Tinted => {
    if (inBrowser()) {
        const text = `%c${eitherTextOrTint}%c`
        if (Tinted.isTinted(eitherTextOrTint)) {
            const styles = eitherTextOrTint.styles.slice()
                .map(original => `${style}${original}`)
            styles.unshift(style)
            styles.push(FORMATTING.RESET)
            return { text, styles, toString }
        }
        return { text, styles: [ style, FORMATTING.RESET ], toString }
    }
    let text = `${eitherTextOrTint}`
    if (Tinted.isTinted(eitherTextOrTint)) {
        text = text.replaceAll(FORMATTING.RESET, `${FORMATTING.RESET}${style}`)
        text = `${style}${text}${FORMATTING.RESET}`
        return { text, styles: [], toString }
    }
    text = `${style}${text}${FORMATTING.RESET}`
    return { text, styles: [], toString }
}

Tinted.isTinted = (value: Tinted | unknown): value is Tinted => {
    return !!(value && value.hasOwnProperty("text"))
}

export const tint = (strings: TemplateStringsArray, ...values: unknown[]): Tinted => {
    const styles: string[] = []
    const text = strings.reduce((accumulator, string, i) => {
        const value = values[i] ?? ""
        if (Tinted.isTinted(value)) {
            styles.push(...value.styles)
        }
        return accumulator + string + value
    }, "")
    return { text, styles, toString }
}


export default Tinted
