import { LogEvent, LogEventOutput } from '../@types/LogEvent'

class Formatter {
    static format(sentences: Array<string>): LogEvent {
        try {
            if (sentences.length !== 3) {
                throw 'No valid arguments'
            }
            return {
                timestamp: Date.parse(sentences[0]),
                loglevel: sentences[1],
                ...JSON.parse(sentences[2])
            }
        } catch (err) {
            throw err
        }
    }

    static formatOutputAsArray(logs: Array<LogEvent>): Array<LogEventOutput> {
        try {
            const eventResults: Array<LogEventOutput> = []
            logs.forEach(logEvent => {
                const { timestamp, loglevel, transactionId, err } = logEvent
                eventResults.push({
                    timestamp,
                    loglevel,
                    transactionId,
                    err
                })
            })
            return eventResults
        } catch (err) {
            throw err
        }
    }

    static formatOutputAsString(logs: Array<LogEventOutput>): string {
        try {
            let output = ''
            logs.forEach((log, index) => {
                output += JSON.stringify(log)
                if (index !== logs.length - 1) {
                    output += ',\n'
                }
            })
            return `[${output}]`
        } catch (err) {
            throw err
        }
    }
}

export default Formatter
