export class UnsupportedEnvironment extends Error {
    name = "UnsupportedEnvironment"
    message = `This environment does not support tinted logs.`
}
