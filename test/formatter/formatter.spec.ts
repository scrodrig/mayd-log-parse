import { LogEvent, LogEventOutput } from '../../src/@types/LogEvent'

import Formatter from '../../src/formatter/Formatter'
import Splitter from '../../src/splitter/Splitter'
import { expect } from 'chai'
import faker from 'faker'

describe('Formatter', () => {
    it('should format in a simple JSON Object', () => {
        const sentence = `2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}`
        const splittedWords = Splitter.split(sentence, ' - ')
        const formattedObject = Formatter.format(splittedWords)
        expect(formattedObject).to.be.deep.equal({
            timestamp: 1628475171253,
            loglevel: 'info',
            transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
            details: 'Service is started'
        })
    })

    it('should format in a simple JSON Object with user', () => {
        const sentence = `2021-08-09T02:12:51.259Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user": {"id": 16, "name": "Michael"}}`
        const splittedWords = Splitter.split(sentence, ' - ')
        const formattedObject = Formatter.format(splittedWords)
        expect(formattedObject).to.be.deep.equal({
            timestamp: 1628475171259,
            loglevel: 'debug',
            transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
            details: 'User information is retrieved',
            user: { id: 16, name: 'Michael' }
        })
    })

    it('should format in a complex JSON Object with user and orders', () => {
        const sentence =
            '2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}'
        const splittedWords = Splitter.split(sentence, ' - ')
        const formattedObject = Formatter.format(splittedWords)
        expect(formattedObject).to.be.deep.equal({
            timestamp: 1628475171262,
            loglevel: 'debug',
            transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e821',
            details: 'User information is retrieved',
            user: {
                id: 16,
                orders: [{ id: 472, items: { id: 7, price: 7.12 } }]
            }
        })
    })

    it('should format ready to print as a string', () => {
        const logEventOutputs: Array<LogEventOutput> = [
            {
                timestamp: faker.time.recent(),
                loglevel: faker.lorem.word(),
                transactionId: faker.datatype.uuid(),
                err: faker.datatype.string()
            },
            {
                timestamp: faker.time.recent(),
                loglevel: faker.lorem.word(),
                transactionId: faker.datatype.uuid(),
                err: faker.datatype.string()
            }
        ]
        const formattedObject = Formatter.formatOutputAsString(logEventOutputs)
        expect(formattedObject).to.be.deep.equal(
            `[${JSON.stringify(logEventOutputs[0])},\n${JSON.stringify(logEventOutputs[1])}]`
        )
    })

    it('should format ready to print as an array', () => {
        const logEvent: Array<LogEvent> = [
            {
                timestamp: faker.time.recent(),
                loglevel: 'error',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                userId: faker.datatype.number(1000),
                err: faker.datatype.string()
            },
            {
                timestamp: faker.time.recent(),
                loglevel: 'error',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                userId: faker.datatype.number(1000),
                err: faker.datatype.string()
            }
        ]
        const formattedObject = Formatter.formatOutputAsArray(logEvent)
        const outputLogEventOne = picker(logEvent[0])
        const outputLogEventTwo = picker(logEvent[1])
        expect(formattedObject).to.be.deep.equal([outputLogEventOne, outputLogEventTwo])
    })
})

function picker(logEvent: LogEvent): LogEventOutput {
    return (({ timestamp, loglevel, transactionId, err }) => ({
        timestamp,
        loglevel,
        transactionId,
        err
    }))(logEvent)
}
