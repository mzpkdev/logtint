export const inBrowser = (): boolean => {
    return typeof typeof window !== "undefined" && typeof process === "undefined"
}
