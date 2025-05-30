export class UnsupportedEnvironment extends Error {
    static name = "UnsupportedEnvironment"
    message = `This environment does not support tinted logs.`
}

export class UnsupportedColorSpace extends Error {
    static name = "UnsupportedColorSpace"
    message = `This color space does not support tinted logs.`
}
