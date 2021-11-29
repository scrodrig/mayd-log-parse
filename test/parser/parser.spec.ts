import 'mocha'

import Parser from '../../src/parser/parser'
import Reader from '../../src/io/Reader'
import { expect } from 'chai'

describe('Parser', () => {
    describe('should return the error logs', () => {
        it('get error logs with json', () => {
            const reader = new Reader()
            Parser.parse('./test/log-parser-test.log', './test/error-parser-test-log.json')
            reader.read('../outputs/test/error-parser-test-log.json')
            const document = reader.getDocument()
            expect(document).to.equal('[{"timestamp":1628475171259,"loglevel":"error","transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","err":"Not found"}]')
        })
    })
})
