import { Token } from './Token'
import { Scanner } from './Scanner'
import { TokenType } from './TokenType'

export class Tokeniser {
	tokens: Token[] = []
	currentSpelling = ''
	currentChar: string | void = ''
	scanner

	constructor(file: string) {
		this.scanner = Scanner.scan(file)
	}

	isWhiteSpace(char: string) {
		return [' ', '\n', '\r', '\t'].includes(char)
	}

	// Expects an ASCII value (a-z, A-Z)
	// TODO: refer to CSS spec on identifiers
	isLetterOrDigit(char: string | void) {
		if (!char) {
			return false
		}

		const code = char.toUpperCase().charCodeAt(0)
		return (code >= 65 && code <= 90) || (code >= 48 && code <= 57)
	}

	skipComment() {
		if (this.currentChar === '/') {
			this.currentChar = this.takeChar()

			if (this.currentChar === '*') {
				// Read '*'
				this.currentChar = this.takeChar()

				this.takeChar()

				// Read reading until end of comment (or file) is reached
				while (this.currentChar) {
					if (this.currentChar === '*') {
						this.currentChar = this.takeChar()

						if (this.currentChar === '/') {
							break
						}

						continue
					}

					this.takeChar()
				}

				// End of file reached
				if (!this.currentChar) {
					this.addToken(TokenType.EndOfFile)
				}

				// End of comment reached
				if (this.currentChar === '/') {
					// Clear spelling as no need to retain it
					this.currentSpelling = ''
				}
			} else {
				// Unexpected token
				this.addToken(TokenType.Error)
			}
		}
	}

	takeChar() {
		this.currentSpelling += this.currentChar
		this.currentChar = this.scanner.next().value
		return this.currentChar
	}

	addToken(type: TokenType) {
		this.tokens.push(new Token(this.currentSpelling, type))
		this.currentSpelling = ''
	}

	// Scans file and splits it into a list of tokens
	getTokens(): Token[] {
		// Scan characters
		for (const char of this.scanner) {
			this.currentChar = char

			// Skip whitespace
			if (this.isWhiteSpace(this.currentChar)) {
				continue
			}

			this.skipComment()

			// Identifiers
			if (this.isLetterOrDigit(this.currentChar)) {
				this.takeChar()

				while (this.isLetterOrDigit(this.currentChar)) {
					this.takeChar()
				}

				this.addToken(TokenType.Identifier)
				continue
			}

			// String literal (double or single quote)
			if (this.currentChar === "'" || this.currentChar === '"') {
				this.takeChar()

				while (this.isLetterOrDigit(this.currentChar)) {
					this.takeChar()
				}

				if (this.currentChar === "'" || this.currentChar === '"') {
					this.takeChar()
					this.addToken(TokenType.StringLiteral)
					continue
				}

				// Unknown token
				this.addToken(TokenType.Error)
			}

			// Colon
			if (this.currentChar === ':') {
				this.takeChar()
				this.addToken(TokenType.Colon)
				continue
			}

			// Semicolon
			if (this.currentChar === ';') {
				this.takeChar()
				this.addToken(TokenType.Semicolon)
				continue
			}

			// Open Brace
			if (this.currentChar === '{') {
				this.takeChar()
				this.addToken(TokenType.OpenBrace)
				continue
			}

			// Close Brace
			if (this.currentChar === '}') {
				this.takeChar()
				this.addToken(TokenType.CloseBrace)
				continue
			}

			if (!this.currentChar) {
				this.addToken(TokenType.EndOfFile)
				continue
			}

			// this.takeChar()
			// this.addToken(TokenType.Error)
		}

		return this.tokens
	}
}
