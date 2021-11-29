type LogEvent = {
    timestamp: number
    loglevel: string //I'd prefer logLevel(camelCase), but instructions doc was with no capitals
    transactionId: string
    details: string
    err?: string
    code?: number
    userId?: number
    user?: {
        id: number
        name?: string
        orders?: [
            {
                id: number
                items: {
                    id: number
                    price: number
                }
            }
        ]
    }
}

type LogEventOutput = {
    timestamp: number
    loglevel: string
    transactionId: string
    err?: string
}

export { LogEvent, LogEventOutput }
