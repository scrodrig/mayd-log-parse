import 'mocha'

import * as faker from 'faker'

import Splitter from '../../src/splitter/Splitter'
import { expect } from 'chai'

describe('Splitter', () => {
    it('should apply split command with - and get a length of 3', () => {
        const firstWord = faker.lorem.word()
        const secondWord = faker.lorem.word()
        const thirdWord = faker.lorem.word()
        const sentence = `${firstWord} - ${secondWord} - ${thirdWord}`
        const splittedWords = Splitter.split(sentence, ' - ')
        expect(splittedWords.length).to.equal(3)
    })

    it('should apply split command with a break line and match the words', () => {
        const firstWord = faker.lorem.word()
        const secondWord = faker.lorem.word()
        const thirdWord = faker.lorem.word()
        const sentence = `${firstWord}\n${secondWord}\n${thirdWord}`
        const expectations = [firstWord, secondWord, thirdWord]
        const splittedWords = Splitter.split(sentence, '\n')
        splittedWords.forEach((splittedWord, index) => {
            expect(splittedWord).to.equal(expectations[index])
        })
    })

    it('should apply split command with - and match the words', () => {
        const sentence = `2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}`
        const splittedWords = Splitter.split(sentence, ' - ')
        expect(splittedWords[0]).to.equal('2021-08-09T02:12:51.253Z')
        expect(splittedWords[1]).to.equal('info')
        expect(splittedWords[2]).to.equal(
            '{"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}'
        )
    })

    it('should apply split command with break line and -, then match lengths', () => {
        const sentence = `2021-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}\n2021-08-09T02:12:51.254Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"About to request the user information","userId": 10}`
        const splittedWordsWithBreakLine = Splitter.split(sentence, '\n')
        const splittedWordsWithDash = Splitter.split(splittedWordsWithBreakLine[0], ' - ')
        expect(splittedWordsWithBreakLine.length).to.equal(2)
        expect(splittedWordsWithDash.length).to.equal(3)
    })
})
