import { inBrowser } from "./utils"


type TextStyle =
    { ansi: string, css: string }

const TextStyle = (ansi: string, css: string) => {
    return { ansi, css } as const
}

export const define = <TDefinition extends Record<string, TextStyle>>(
    definition: TDefinition
): { [K in keyof TDefinition]: string } => {
    const normalized = {} as Record<keyof TDefinition, string>
    for (const property in definition) {
        if (!Object.prototype.hasOwnProperty.call(definition, property)) {
            continue
        }
        if (inBrowser()) {
            normalized[property as keyof typeof normalized] = definition[property].css
            continue
        }
        normalized[property as keyof typeof normalized] = definition[property].ansi
    }
    return normalized
}

export const FORMATTING = define({
    RESET: TextStyle("\x1b[0m", "color: unset;"),
    ITALIC: TextStyle("\x1b[3m", "font-style: italic;"),
    BOLD: TextStyle("\x1b[1m", "font-weight: bold;"),
    UNDERLINE: TextStyle("\x1b[4m", "text-decoration: underline;"),
    STRIKETHROUGH: TextStyle("\x1b[9m", "text-decoration: line-through;"),
    DIM: TextStyle("\x1b[2m", "opacity: 0.5;"),
    INVERSE: TextStyle("\x1b[7m", "filter: invert(100%);"),
    HIDDEN: TextStyle("\x1b[8m", "visibility: hidden;")
} as const)

export const COLOR = define({
    BLACK: TextStyle("\x1b[30m", "color: black;"),
    WHITE: TextStyle("\x1b[37m", "color: white;"),
    RED: TextStyle("\x1b[31m", "color: red;"),
    GREEN: TextStyle("\x1b[32m", "color: green;"),
    BLUE: TextStyle("\x1b[34m", "color: blue;"),
    MAGENTA: TextStyle("\x1b[35m", "color: magenta;"),
    YELLOW: TextStyle("\x1b[33m", "color: yellow;"),
    CYAN: TextStyle("\x1b[36m", "color: cyan;"),
    BRIGHT_BLACK: TextStyle("\x1b[90m", "color: gray;"),
    BRIGHT_WHITE: TextStyle("\x1b[97m", "color: white;"),
    BRIGHT_RED: TextStyle("\x1b[91m", "color: lightcoral;"),
    BRIGHT_GREEN: TextStyle("\x1b[92m", "color: lightgreen;"),
    BRIGHT_BLUE: TextStyle("\x1b[94m", "color: lightskyblue;"),
    BRIGHT_MAGENTA: TextStyle("\x1b[95m", "color: violet;"),
    BRIGHT_YELLOW: TextStyle("\x1b[93m", "color: lightyellow;"),
    BRIGHT_CYAN: TextStyle("\x1b[96m", "color: paleturquoise;")
} as const)

export const BACKGROUND_COLOR = define({
    BLACK: TextStyle("\x1b[40m", "background-color: black;"),
    WHITE: TextStyle("\x1b[47m", "background-color: white;"),
    RED: TextStyle("\x1b[41m", "background-color: red;"),
    BLUE: TextStyle("\x1b[44m", "background-color: blue;"),
    GREEN: TextStyle("\x1b[42m", "background-color: green;"),
    MAGENTA: TextStyle("\x1b[45m", "background-color: magenta;"),
    YELLOW: TextStyle("\x1b[43m", "background-color: yellow;"),
    CYAN: TextStyle("\x1b[46m", "background-color: cyan;"),
    BRIGHT_BLACK: TextStyle("\x1b[100m", "background-color: gray;"),
    BRIGHT_WHITE: TextStyle("\x1b[107m", "background-color: white;"),
    BRIGHT_RED: TextStyle("\x1b[101m", "background-color: lightcoral;"),
    BRIGHT_GREEN: TextStyle("\x1b[102m", "background-color: lightgreen;"),
    BRIGHT_BLUE: TextStyle("\x1b[104m", "background-color: lightskyblue;"),
    BRIGHT_MAGENTA: TextStyle("\x1b[105m", "background-color: violet;"),
    BRIGHT_YELLOW: TextStyle("\x1b[103m", "background-color: lightyellow;"),
    BRIGHT_CYAN: TextStyle("\x1b[106m", "background-color: paleturquoise;")
} as const)


export default TextStyle
