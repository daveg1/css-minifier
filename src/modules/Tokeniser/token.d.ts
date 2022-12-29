export type token = {
	spelling: string;
	type: TokenType;
};

export const enum TokenType {
	EndOfFile = 'EndOfFile',
	Error = 'Error',
	Identifier = 'Identifier',
	OpenBracket = 'OpenBracket',
	CloseBracket = 'CloseBracket',
	OpenBrace = 'OpenBrace',
	CloseBrace = 'CloseBrace',
	OpenSquareBracket = 'OpenSquareBracket',
	CloseSquareBracket = 'CloseSquareBracket',
	Comma = 'Comma',
	Colon = 'Colon',
	Semicolon = 'Semicolon',

	// Operators
	SelectorOperator = 'SelectorOperator',
	Operator = 'Operator',
	// TODO finish above

	AtSymbol = 'AtSymbol',
	Unit = 'Unit',
	StringLiteral = 'StringLiteral',
	NumberLiteral = 'NumberLiteral',
	HexLiteral = 'HexLiteral',
	RgbLiteral = 'RgbLiteral',
	HslLiteral = 'HslLiteral',
}
