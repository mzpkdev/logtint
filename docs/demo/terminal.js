import { AnsiUp } from "https://cdn.jsdelivr.net/npm/ansi_up@6.0.6/ansi_up.min.js"


const parser = new AnsiUp()

const cursor = () => {
    const root = document.createElement("span")
    root.className = "cursor"
    root.innerHTML = `_`
    return root
}

const line = (text, ...children) => {
    const root = document.createElement("p")
    root.className = "line"
    root.innerHTML = `${text}`
    for (const child of children) {
        root.appendChild(child)
    }
    return root
}


const retype = async (element, text) => {
    const delay = 25
    for (let i = 0; i <= text.length; i++) {
        setTimeout(() => {
            element.innerText = text.slice(0, i)
        }, i * delay)
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, text.length * delay)
    })
}

const wait = (delay) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), delay)
    })
}


class Terminal {
    #_element
    #_cursor

    #_wait = false
    #_clear = true

    async tty() {
        return new Promise(resolve => {
          setTimeout(() => {
              resolve(this.#_element.querySelector(`#tty`))
          }, 100)
        })
    }

    constructor(id) {
        this.#_element = document.getElementById(id)
        this.#_cursor = cursor()
        setTimeout(this.#_render)
    }

    async input(text) {
        const tty = await this.tty()
        let content
        if (this.#_clear) {
            content = tty.lastChild.querySelector(`span`)
        } else {
            content = document.createElement("span")
            const element = line(`$ `, content, this.#_cursor)
            tty.appendChild(element)
        }
        await retype(content, text)
        await wait(250)
        return this
    }

    async output(text) {
        const element = line(parser.ansi_to_html(text))
        const tty = await this.tty()
        tty.appendChild(element)
        await wait(250)
        this.enter()
        return this
    }

    async enter() {
        if (this.#_wait) {
            return
        }
        this.#_wait = true
        setTimeout(async () => {
            this.#_wait = false
            const content = document.createElement("span")
            const element = line(`$ `, content, this.#_cursor)
            const tty = await this.tty()
            tty.appendChild(element)
        }, 100)
        return this
    }

    async clear() {
        if (this.#_clear) {
            return this
        }
        const tty = await this.tty()
        tty.innerHTML = ``
        await this.enter()
        this.#_clear = true
        return this
    }

    #_render = () => {
        this.#_element.innerHTML = `
            <div id="tty" class="tty"></div>
        `
        this.clear()
    }
}


export default Terminal