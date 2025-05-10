import { FORMATTING, COLOR, BACKGROUND_COLOR } from "./TextStyle"
import Tinted from "./Tinted"


const string = (strings: TemplateStringsArray, ...values: unknown[]) => {
    return strings.reduce((accumulator, string, i) => {
        const value = values[i] ?? ""
        return accumulator + string + value
    }, "")
}


type Formatting = {
    (text: string | Tinted): Tinted
    (strings: TemplateStringsArray, ...values: unknown[]): Tinted
}

const apply = (definition: string): Formatting =>
    (text: string | Tinted | TemplateStringsArray, ...values: unknown[]) => {
        if (Tinted.isTinted(text) || typeof text === "string") {
            return Tinted(text, definition)
        }
        return Tinted(string(text, ...values), definition)
    }

export const italic = apply(FORMATTING.ITALIC)
export const bold = apply(FORMATTING.BOLD)
export const underline = apply(FORMATTING.UNDERLINE)
export const strikethrough = apply(FORMATTING.STRIKETHROUGH)
export const dim = apply(FORMATTING.DIM)
export const invert = apply(FORMATTING.INVERSE)
export const hidden = apply(FORMATTING.HIDDEN)

export const black = apply(COLOR.BLACK)
export const white = apply(COLOR.WHITE)
export const red = apply(COLOR.RED)
export const green = apply(COLOR.GREEN)
export const blue = apply(COLOR.BLUE)
export const magenta = apply(COLOR.MAGENTA)
export const yellow = apply(COLOR.YELLOW)
export const cyan = apply(COLOR.CYAN)

export const blackBright = apply(COLOR.BRIGHT_BLACK)
export const whiteBright = apply(COLOR.BRIGHT_WHITE)
export const redBright = apply(COLOR.BRIGHT_RED)
export const greenBright = apply(COLOR.BRIGHT_GREEN)
export const blueBright = apply(COLOR.BRIGHT_BLUE)
export const magentaBright = apply(COLOR.BRIGHT_MAGENTA)
export const yellowBright = apply(COLOR.BRIGHT_YELLOW)
export const cyanBright = apply(COLOR.BRIGHT_CYAN)

export const bgBlack = apply(BACKGROUND_COLOR.BLACK)
export const bgWhite = apply(BACKGROUND_COLOR.WHITE)
export const bgRed = apply(BACKGROUND_COLOR.RED)
export const bgGreen = apply(BACKGROUND_COLOR.GREEN)
export const bgBlue = apply(BACKGROUND_COLOR.BLUE)
export const bgMagenta = apply(BACKGROUND_COLOR.MAGENTA)
export const bgYellow = apply(BACKGROUND_COLOR.YELLOW)
export const bgCyan = apply(BACKGROUND_COLOR.CYAN)

export const bgBlackBright = apply(BACKGROUND_COLOR.BRIGHT_BLACK)
export const bgWhiteBright = apply(BACKGROUND_COLOR.BRIGHT_WHITE)
export const bgRedBright = apply(BACKGROUND_COLOR.BRIGHT_RED)
export const bgGreenBright = apply(BACKGROUND_COLOR.BRIGHT_GREEN)
export const bgBlueBright = apply(BACKGROUND_COLOR.BRIGHT_BLUE)
export const bgMagentaBright = apply(BACKGROUND_COLOR.BRIGHT_MAGENTA)
export const bgYellowBright = apply(BACKGROUND_COLOR.BRIGHT_YELLOW)
export const bgCyanBright = apply(BACKGROUND_COLOR.BRIGHT_CYAN)
