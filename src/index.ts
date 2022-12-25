import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Tokeniser } from './modules/Tokeniser/Tokeniser'

const path = join(__dirname, 'example.css')
const file = readFileSync(path, 'utf-8')
const tokeniser = new Tokeniser(file)

const tokens = tokeniser.getTokens()

console.log(tokens)
