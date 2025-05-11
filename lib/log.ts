import { inBrowser } from "./utils"
import { END, tint } from "./Tinted"
import { FORMATTING } from "@/lib/TextStyle"


const console = globalThis.console

const createLogger = (logger: typeof console.log) => (strings: TemplateStringsArray, ...values: unknown[]): void => {
    const { text, styles } = tint(strings, ...values)
    if (inBrowser()) {
        globalThis.console.log(text)
        globalThis.console.log(styles)
        logger.call(console, String(text), ...styles)
    } else {
        globalThis.console.log(JSON.stringify(text))
        logger.call(console, String(text).replaceAll(END, FORMATTING.RESET)
        )
    }
}

function log(strings: TemplateStringsArray, ...values: unknown[]): void
function log(logger: typeof console.log): (strings: TemplateStringsArray, ...values: unknown[]) => void
function log(eitherStringsOrLogger: typeof console.log | TemplateStringsArray, ...rest: unknown[]) {
    if (typeof eitherStringsOrLogger === "function") {
        return createLogger(eitherStringsOrLogger)
    }
    if (Array.isArray(eitherStringsOrLogger)) {
        createLogger(console.log)(eitherStringsOrLogger, ...rest)
        return ``
    }
    console.log(eitherStringsOrLogger, ...rest)
}


export default log
