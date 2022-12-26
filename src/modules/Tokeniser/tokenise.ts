import { debug } from '../utils/debug'
import type { token } from './token'
import { TokenType } from './token'

// Spaces, tabs, new line chars
function isWhiteSpace(char: string) {
	return [' ', '\t', '\r', '\n'].includes(char)
}

function isLetter(char: string) {
	const code = char.toUpperCase().charCodeAt(0)
	return code >= 65 && code <= 90
}

function isLetterOrDigit(char: string) {
	const code = char.toUpperCase().charCodeAt(0)
	return (code >= 65 && code <= 90) || (code >= 48 && code <= 57)
}

function isQuote(char: string) {
	return char === '"' || char === "'"
}

function createToken(spelling: string, type: TokenType): token {
	return { spelling, type }
}

// TODO handle end of file
// TODO handle errors (error tokens)

export function tokenise(file: string): token[] {
	const tokens: token[] = []
	const chars = file.split('')
	let currentSpelling = ''
	let readingIdentifier = false
	let readingLiteral = false
	let readingComment = false

	for (let i = 0; i < chars.length; i++) {
		let char = chars[i]
		// const char = chars.at(i) // maybe safer?

		// Skip whitespace
		if (isWhiteSpace(char)) {
			continue
		}

		// Skip comments
		if (char === '/') {
			let reading = true

			while (reading) {
				// End of comment found
				if (chars[++i] === '/') {
					if (chars[i - 1] === '*') {
						reading = false
					}
				}
			}

			continue
		}

		// String literal
		if (isQuote(char)) {
			currentSpelling += chars[i++] // starting '

			// Read characters until terminating quote reached
			while (!isQuote(chars[i])) {
				currentSpelling += chars[i++]
			}

			currentSpelling += char // ending '
			tokens.push(createToken(currentSpelling, TokenType.StringLiteral))
			currentSpelling = ''
			continue
		}

		// Identifier
		if (isLetter(char)) {
			currentSpelling += chars[i++]

			while (isLetterOrDigit(chars[i])) {
				currentSpelling += chars[i++]
			}

			tokens.push(createToken(currentSpelling, TokenType.Identifier))
			currentSpelling = ''
			char = chars[i]
		}

		// Read other characters
		let token: token | null = null

		switch (char) {
			case ':': {
				currentSpelling += char
				token = createToken(currentSpelling, TokenType.Colon)
				break
			}

			case ';': {
				currentSpelling += char
				token = createToken(currentSpelling, TokenType.Semicolon)
				break
			}

			case '{': {
				currentSpelling += char
				token = createToken(currentSpelling, TokenType.OpenBrace)
				break
			}

			case '}': {
				currentSpelling += char
				token = createToken(currentSpelling, TokenType.CloseBrace)
				break
			}
		}

		if (token) {
			tokens.push(token)
			currentSpelling = ''
			continue
		}

		debug('Missed:', char)
	}

	return tokens
}
