import * as fs from 'fs'
const path = require('path')

class Reader {
    relativePath: string
    content: string

    read(relativePath: string) {
        try {
            this.relativePath = relativePath
            this.content = fs.readFileSync(path.join(process.env.PWD, 'inputs', relativePath), 'utf8')
        } catch (err) {
            this.content = err.message
            throw err
        }
    }

    getDocument() {
        return this.content
    }
}

export default Reader
