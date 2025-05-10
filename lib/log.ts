import { inBrowser } from "./utils"
import { tint } from "./Tinted"


export default (logger: typeof console.log) => (strings: TemplateStringsArray, ...values: unknown[]): void => {
    const { text, styles } = tint(strings, ...values)
    if (inBrowser()) {
        logger.call(console, String(text), ...styles)
    } else {
        logger.call(console, String(text))
    }
}
