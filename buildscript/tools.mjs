import * as util from "util"
import * as path from "path"
import * as fs from "fs"
import * as child_process from "child_process"


const excluded = [
    "node_modules",
    "buildscript"
]

const walk = (directory, callback) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (excluded.includes(entry.name)) {
            continue
        }
        const child = path.join(directory, entry.name)
        if (entry.isDirectory()) {
            walk(child, callback)
        } else if (entry.isFile()) {
            callback(child)
        }
    }

}

export const rm = (directory, extensions) => {
    walk(directory, (file) => {
        if (extensions.some(extension => file.endsWith(extension))) {
            fs.unlinkSync(file)
        }
    })
}

export const rename = async (directory) => {
    walk(directory, (file) => {
        if ([ ".js" ].some(extension => file.endsWith(extension))) {
            fs.renameSync(file, file.replace(".js", ".mjs"))
        }
    })
}

export const exec = async (command, mute) => {
    return new Promise((resolve, reject) => {
        const [ cmd, ...args ] = command.split(" ")
        const child = child_process.spawn(cmd, args, {
            shell: true,
            stdio: mute
                ? [ "ignore", "ignore", "ignore" ]
                : "inherit"
        })
        child.on("close", (code) => {
            if (code !== 0) {
                reject(code)
            } else {
                resolve()
            }
        })
    })
}

