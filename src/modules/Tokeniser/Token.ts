import { TokenType } from './TokenType'

export class Token {
	spelling: string
	type: TokenType

	constructor(spelling: string, type: TokenType) {
		this.spelling = spelling
		this.type = type
	}
}
