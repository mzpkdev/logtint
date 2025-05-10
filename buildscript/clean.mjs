import { rm, exec } from "./tools.mjs"
import fs from "fs"


async function main() {
    await exec(`tsc --build --clean`)
    rm("./", [ ".mjs", ".cjs", ".d.ts", ".js.map", ".d.ts.map" ])
    if (fs.existsSync(".tsbuildinfo")) {
        fs.unlinkSync(".tsbuildinfo")
    }
}


main(...process.argv.slice(2))
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(-1)
    })