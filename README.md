# Mayd log parser
## Instructions
Since it is a typescript project, please do the following steps in order to run the **parser**.
`$ npm install -g ts-node`
then, inside the project:
`$ yarn install`
to check all testing, please run:
`$ yarn test`

If all this is working properly, then:

## Usage
Finally, take into considerations that paths are **relative** to the `root` of the project, all inputs are inside `inputs` folder; and outputs inside `outputs` folder.

## Examples

```sh
$ts-node ./parser.ts --input=log.log --output=errors.json
```

```sh
$ts-node ./parser.ts --input=log-multiple.log --output=errors-multiple.json
```