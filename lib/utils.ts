import { UnsupportedEnvironment } from "./errors"


export const inBrowser = (): boolean => {
    return typeof window !== "undefined" && typeof process === "undefined"
}

export const inServer = (): boolean => {
    return !inBrowser()
}

export const chooseByEnv = <TValueA, TValueB>(browser: TValueA, server: TValueB): TValueA | TValueB => {
    if (inBrowser()) {
        return browser
    }
    if (inServer()) {
        return server
    }
    throw new UnsupportedEnvironment()
}

export const convertRGBToANSI256 = function ([ r, g, b ]: [ number, number, number ]): number {
    if (r === g && g === b) {
        if (r < 8) {
            return 16
        }
        if (r > 248) {
            return 231
        }
        return Math.round(((r - 8) / 247) * 24) + 232
    }
    return 16
        + (36 * Math.round(r / 255 * 5))
        + (6 * Math.round(g / 255 * 5))
        + Math.round(b / 255 * 5)
}

export const convertHSLToRGB = ([ h, s, l ]: [ number, number, number ]): [ number, number, number ] => {
    let t2
    let t3
    let val
    if (s === 0) {
        val = l * 255
        return [ val, val, val ]
    }
    if (l < 0.5) {
        t2 = l * (1 + s)
    } else {
        t2 = l + s - l * s
    }
    const t1 = 2 * l - t2
    const rgb = [ 0, 0, 0 ]
    for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1)
        if (t3 < 0) {
            t3++
        }
        if (t3 > 1) {
            t3--
        }
        if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3
        } else if (2 * t3 < 1) {
            val = t2
        } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
        } else {
            val = t1
        }
        rgb[i] = Math.round(val * 255)
    }
    return rgb as [ number, number, number ]
}
