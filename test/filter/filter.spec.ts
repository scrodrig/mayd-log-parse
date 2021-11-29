import * as faker from 'faker'

import { LogEvent, LogEventOutput } from '../../src/@types/LogEvent'

import Filter from '../../src/filter/Filter'
import { expect } from 'chai'

describe('Filter', () => {
    describe('Filter with no format', () => {
        it('should filter log events when error with simple objects', () => {
            const formattedObjectDebug: LogEvent = {
                timestamp: faker.time.recent(),
                loglevel: 'debug',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                userId: faker.datatype.number(1000)
            }
            const formattedObjectError: LogEvent = {
                timestamp: faker.time.recent(),
                loglevel: 'error',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                userId: faker.datatype.number(1000)
            }
            const logEvents = [formattedObjectDebug, formattedObjectError]
            const filteredLogsAsOutput = Filter.filter(logEvents, 'error')
            expect(filteredLogsAsOutput.length).to.equal(1)
            expect(filteredLogsAsOutput).to.be.deep.equal([formattedObjectError])
        })

        it('should filter log events when error with complex objects', () => {
            const formattedObjectDebug: LogEvent = {
                timestamp: faker.time.recent(),
                loglevel: 'info',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                user: {
                    id: faker.datatype.number(100),
                    orders: [
                        {
                            id: faker.datatype.number(500),
                            items: { id: faker.datatype.number(1000), price: faker.datatype.float(2) }
                        }
                    ]
                }
            }
            const formattedObjectError: LogEvent = {
                timestamp: faker.time.recent(),
                loglevel: 'error',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                user: {
                    id: faker.datatype.number(100),
                    orders: [
                        {
                            id: faker.datatype.number(500),
                            items: { id: faker.datatype.number(1000), price: faker.datatype.float(2) }
                        }
                    ]
                },
                code: faker.datatype.number(400),
                err: faker.lorem.words()
            }
            const logEvents = [formattedObjectDebug, formattedObjectError]
            const filteredLogsAsOutput = Filter.filter(logEvents, 'error')
            expect(filteredLogsAsOutput.length).to.equal(1)
            expect(filteredLogsAsOutput).to.be.deep.equal([formattedObjectError])
        })
    })

    describe('Filter with output format', () => {
        it('should filter log events when error with simple objects with format', () => {
            const formattedObjectDebug: LogEvent = {
                timestamp: faker.time.recent(),
                loglevel: 'debug',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                userId: faker.datatype.number(1000)
            }
            const formattedObjectError: LogEvent = {
                timestamp: faker.time.recent(),
                loglevel: 'error',
                transactionId: faker.datatype.uuid(),
                details: faker.lorem.sentence(),
                userId: faker.datatype.number(1000),
                err: faker.datatype.string()
            }

            const formattedOutputError: LogEventOutput = {
                timestamp: formattedObjectError.timestamp,
                loglevel: formattedObjectError.loglevel,
                transactionId: formattedObjectError.transactionId,
                err: formattedObjectError.err
            }
            const logEvents = [formattedObjectDebug, formattedObjectError]
            const filteredLogsAsOutput = Filter.filterWithOutputFormat(logEvents, 'error')
            expect(filteredLogsAsOutput.length).to.equal(1)
            expect(filteredLogsAsOutput).to.be.deep.equal([formattedOutputError])
        })
    })
})
