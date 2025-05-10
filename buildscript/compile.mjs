import { exec, rename, rm } from "./tools.mjs"


async function main() {
    await rm("./", [ ".js" ])
    await exec(`tsc --project ./tsconfig.mjs.json`)
    await rename("./")
    await exec(`tsc --project ./tsconfig.cjs.json`)
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(-1)
    })