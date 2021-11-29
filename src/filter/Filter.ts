import { LogEvent, LogEventOutput } from '../@types/LogEvent'

import Formatter from '../formatter/Formatter'

class Filter {
    static filter(logEvents: Array<LogEvent>, logLevel: string = 'error'): Array<LogEvent> {
        try {
            return logEvents.filter(log => {
                return log.loglevel === logLevel
            })
        } catch (err) {
            throw err
        }
    }

    static filterWithOutputFormat(logEvents: Array<LogEvent>, logLevel: string = 'error'): Array<LogEventOutput> {
        try {
            const filteredLogEvents = Filter.filter(logEvents, logLevel)
            return Formatter.formatOutputAsArray(filteredLogEvents)
        } catch (err) {
            throw err
        }
    }
}

export default Filter
