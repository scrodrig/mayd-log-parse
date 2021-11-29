import { LogEvent, LogEventOutput } from '../@types/LogEvent'

import Filter from '../filter/Filter'
import Formatter from '../formatter/Formatter'
import Reader from '../io/reader'
import Splitter from '../splitter/Splitter'
import Writer from '../io/writer'

class Parser {
    static parse(relativeInputPath: string, relativeOutputPath: string) {
        const parser = new Parser()
        try {
            const content = parser.read(relativeInputPath)
            const logs = parser.getEventLogs(content)
            const filteredWithFormat = parser.filter(logs)
            Writer.writeFromArray(relativeOutputPath, filteredWithFormat)
        } catch (err) {
            console.log(err.message)
        }
    }

    private read(relativeInputPath: string): string {
        const reader = new Reader()
        reader.read(relativeInputPath)
        return reader.getDocument()
    }

    private getEventLogs(content: string): Array<LogEvent> {
        const logs: Array<LogEvent> = []
        const splittedSentencesWithBreakLine = Splitter.split(content, '\n')
        splittedSentencesWithBreakLine.forEach(sentence => {
            const splittedSentencesWithDash = Splitter.split(sentence, ' - ')
            const formattedObject = Formatter.format(splittedSentencesWithDash)
            logs.push(formattedObject)
        })
        return logs
    }

    private filter(logs: Array<LogEvent>): Array<LogEventOutput> {
        return Filter.filterWithOutputFormat(logs, 'error')
    }
}

export default Parser
