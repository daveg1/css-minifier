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

function createToken(spelling: string, type: TokenType): token {
	return { spelling, type }
}

export function tokenise(file: string): token[] {
	const tokens: token[] = []
	const chars = file.split('')
	let currentSpelling = ''
	let readingIdentifier = false
	let readingLiteral = false
	let readingComment = false

	chars.forEach((char, index) => {
		// Skip whitespace
		if (isWhiteSpace(char)) {
			return
		}

		// Skip comments
		if (char === '/') {
			if (readingComment && chars[index - 1] === '*') {
				readingComment = false
			} else {
				readingComment = true
			}
			return
		} else if (readingComment) {
			return
		}

		// Start reading string literal
		if (char === "'" || char === '"') {
			currentSpelling += char

			if (!readingLiteral) {
				readingLiteral = true
				return
			}

			readingLiteral = false
			tokens.push(createToken(currentSpelling, TokenType.StringLiteral))
			currentSpelling = ''
			return
		} else if (readingLiteral) {
			currentSpelling += char
			return
		}

		// Start reading identifier
		if (isLetter(char) && !readingIdentifier) {
			readingIdentifier = true
			currentSpelling += char
			return
		}

		// Continue reading identifier
		else if (isLetterOrDigit(char) && readingIdentifier) {
			currentSpelling += char
			return
		}

		// Finish reading
		else if (readingIdentifier) {
			readingIdentifier = false
			tokens.push(createToken(currentSpelling, TokenType.Identifier))
			currentSpelling = ''
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
			return
		}

		debug('Missed:', char)
	})

	return tokens
}
