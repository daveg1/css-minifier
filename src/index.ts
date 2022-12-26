import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tokenise } from './modules/Tokeniser/tokenise';

const path = join(__dirname, 'example.css');
const file = readFileSync(path, 'utf-8');

// Tokenise
const tokens = tokenise(file);
console.log(tokens);
