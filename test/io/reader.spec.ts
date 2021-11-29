import 'mocha'

import Reader from '../../src/io/Reader'
import { expect } from 'chai'

describe('I/O Reader', () => {
    describe('should return the content of the document', () => {
        it('get the the word hello', () => {
            const reader = new Reader()
            reader.read('test/foo.log')
            const document = reader.getDocument()
            expect(document).to.equal('hello')
        })

        it('get the a log without error', () => {
            const reader = new Reader()
            reader.read('test/log-a.log')
            const document = reader.getDocument()
            expect(document).to.equal(
                '2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}\n2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}\n2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request user orders list","userId": 10}\n2021-08-09T02:12:51.255Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is started"}\n2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request the user information","userId": 16}\n2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"User information is gathered","user":{"id":10,"name":"Alice"}}\n2021-08-09T02:12:51.258Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"About to request user orders list","userId":16}\n2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}\n2021-08-09T02:12:51.259Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user": {"id": 16, "name": "Michael"}}\n2021-08-09T02:12:51.262Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"User information is retrieved","user":{"id":16,"orders":[{"id":472,"items":{"id":7,"price":7.12}}]}}\n2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}\n2021-08-09T02:12:51.265Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e821","details":"Service is successfully finished"}'
            )
        })
    })

    describe('should return error for problems at open document', () => {
        it('get error for non existing path', () => {
            const reader = new Reader()
            try {
                reader.read('test/non-existing.log')
            } catch (err) {
                const document = reader.getDocument()
                expect(document).to.equal(
                    `ENOENT: no such file or directory, open '${process.env.PWD}/inputs/test/non-existing.log'`
                )
            }
        })
    })
})
