import { inBrowser } from "./utils"
import tint from "./tint"


const createLogger = (logger: typeof console.log) => {
    return (strings: TemplateStringsArray, ...values: unknown[]): void => {
        const { encoded, styles } = tint(strings, ...values)
        if (inBrowser()) {
            logger.call(globalThis.console, encoded, ...styles)
        } else {
            logger.call(globalThis.console, encoded.replaceAll(`<END>`, "\x1b[0m"))
        }
    }
}


function log(strings: TemplateStringsArray, ...values: unknown[]): void
function log(logger: typeof console.log): (strings: TemplateStringsArray, ...values: unknown[]) => void
function log(eitherStringsOrLogger: typeof console.log | TemplateStringsArray, ...rest: unknown[]) {
    if (typeof eitherStringsOrLogger === "function") {
        return createLogger(eitherStringsOrLogger)
    }
    if (Array.isArray(eitherStringsOrLogger)) {
        createLogger(globalThis.console.log)(eitherStringsOrLogger, ...rest)
        return
    }
    console.log(eitherStringsOrLogger)
}


export default log
