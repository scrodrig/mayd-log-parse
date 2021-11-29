import Parser from './src/parser/parser'
const yargs = require('yargs/yargs') //Yargs' documentation mention to work with ESM imports, but it is not working
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

function main() {
    if (validators()) {
        Parser.parse(argv.input, argv.output)
    }
}

function validators() {
    if (!argv.input || !argv.output) {
        console.error('--input and --output arguments are mandatory')
        return false
    }
    if (typeof argv.input !== 'string' || typeof argv.output !== 'string') {
        console.error('Parameters must be strings')
        return false
    }
    return true
}

if (require.main === module) {
    main()
}
