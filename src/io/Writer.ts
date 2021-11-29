import * as fs from 'fs'

import Formatter from '../formatter/Formatter'
import { LogEventOutput } from '../@types/LogEvent'

const path = require('path')

class Writer {
    //I tried to make an overloaded function, but TS compiler does not support it yet
    static writeFromString(relativePath: string, content: string): void {
        try {
            fs.writeFileSync(path.join(process.env.PWD, 'outputs', relativePath), content, 'utf-8')
        } catch (err) {
            return err.message
        }
    }

    static writeFromArray(relativePath: string, eventLogs: Array<LogEventOutput>): void {
        try {
            const content = Formatter.formatOutputAsString(eventLogs)
            fs.writeFileSync(path.join(process.env.PWD, 'outputs', relativePath), content, 'utf-8')
        } catch (err) {
            return err.message
        }
    }
}

export default Writer
