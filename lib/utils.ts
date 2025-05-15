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
