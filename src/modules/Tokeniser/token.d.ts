export type token = {
	spelling: string
	type: TokenType
}

export const enum TokenType {
	EndOfFile = 'EndOfFile',
	Error = 'Error',
	Identifier = 'Identifier',
	OpenBracket = 'OpenBracket',
	CloseBracket = 'CloseBracket',
	OpenBrace = 'OpenBrace',
	CloseBrace = 'CloseBrace',
	Colon = 'Colon',
	Semicolon = 'Semicolon',
	AtSymbol = 'AtSymbol',
	StringLiteral = 'StringLiteral',
	NumberLiteral = 'NumberLiteral',
	HexLiteral = 'HexLiteral',
	RgbLiteral = 'RgbLiteral',
	HslLiteral = 'HslLiteral',
}