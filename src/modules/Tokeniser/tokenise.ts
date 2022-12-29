import { debug } from '../utils/debug';
import type { token } from './token';
import { TokenType } from './token';
import { units } from './units';

// Spaces, tabs, new line chars
function isWhiteSpace(char: string) {
	return [' ', '\t', '\r', '\n'].includes(char);
}

function isLetter(char: string) {
	const code = char.toUpperCase().charCodeAt(0);
	return code >= 65 && code <= 90;
}

function isDigit(char: string) {
	const code = char.toUpperCase().charCodeAt(0);
	return code >= 48 && code <= 57;
}

function isLetterOrDigit(char: string) {
	const code = char.toUpperCase().charCodeAt(0);
	return (code >= 65 && code <= 90) || (code >= 48 && code <= 57);
}

function isQuote(char: string) {
	return char === '"' || char === "'";
}

function isHexDigit(char: string) {
	const code = char.toUpperCase().charCodeAt(0);
	// 0-9 | a-f
	return (code >= 48 && code <= 57) || (code >= 65 && code <= 70);
}

function isUnit(spelling: string) {
	return units.includes(spelling);
}

function isOperator(char: string) {
	return ['+', '-', '/', '*', '=', '~', '|', '^', '$'].includes(char);
}

function isSelectorOperator(char: string) {
	return ['~', '|', '^', '$', '*'].includes(char);
}

function createToken(spelling: string, type: TokenType): token {
	return { spelling, type };
}

// TODO handle end of file
// TODO handle errors (error tokens)

export function tokenise(file: string): token[] {
	const tokens: token[] = [];
	const chars = file.split('');
	let currentSpelling = '';

	for (let i = 0; i < chars.length; i++) {
		// const char = chars.at(i) // ? maybe safer

		// Skip whitespace
		if (isWhiteSpace(chars[i])) {
			continue;
		}

		// Forward slash
		if (chars[i] === '/') {
			// Skip comments
			if (chars[i + 1] === '*') {
				while (true) {
					// End of comment found
					if (chars[++i] === '/') {
						if (chars[i - 1] === '*') {
							break;
						}
					}
				}
				currentSpelling = '';
				continue;
			}
		}

		// String literal
		if (isQuote(chars[i])) {
			currentSpelling += chars[i++]; // starting '

			// Read characters until terminating quote reached
			while (!isQuote(chars[i])) {
				currentSpelling += chars[i++];
			}

			currentSpelling += chars[i++]; // ending '
			tokens.push(createToken(currentSpelling, TokenType.StringLiteral));
			currentSpelling = '';
		}

		// Hex literal
		if (chars[i] === '#') {
			currentSpelling += chars[i++];

			while (isHexDigit(chars[i])) {
				currentSpelling += chars[i++];
			}

			tokens.push(createToken(currentSpelling, TokenType.HexLiteral));
			currentSpelling = '';
		}

		// Number literal
		if (isDigit(chars[i])) {
			currentSpelling += chars[i++];

			while (isDigit(chars[i])) {
				currentSpelling += chars[i++];
			}

			tokens.push(createToken(currentSpelling, TokenType.NumberLiteral));
			currentSpelling = '';
		}

		// Identifier
		if (isLetter(chars[i])) {
			currentSpelling += chars[i++];

			while (
				isLetterOrDigit(chars[i]) ||
				chars[i] === '-' ||
				chars[i] === '_'
			) {
				currentSpelling += chars[i++];
			}

			if (isUnit(currentSpelling)) {
				tokens.push(createToken(currentSpelling, TokenType.Unit));
				currentSpelling = '';
			} else {
				tokens.push(createToken(currentSpelling, TokenType.Identifier));
				currentSpelling = '';
			}
		}

		if (isOperator(chars[i])) {
			currentSpelling += chars[i];

			// Followed by =
			if (chars[i + 1] === '=' && isSelectorOperator(chars[i])) {
				currentSpelling += chars[++i];
				tokens.push(createToken(currentSpelling, TokenType.SelectorOperator));
				currentSpelling = '';
				continue;
			}

			tokens.push(createToken(currentSpelling, TokenType.Operator));
			currentSpelling = '';
			continue;
		}

		// Colon
		if (chars[i] === ':') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.Colon));
			currentSpelling = '';
			continue;
		}

		// Semicolon
		if (chars[i] === ';') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.Semicolon));
			currentSpelling = '';
			continue;
		}
		// Comma
		if (chars[i] === ',') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.Comma));
			currentSpelling = '';
			continue;
		}

		// Open Square Bracket
		if (chars[i] === '[') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.OpenSquareBracket));
			currentSpelling = '';
			continue;
		}

		// Close Square Bracket
		if (chars[i] === ']') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.CloseSquareBracket));
			currentSpelling = '';
			continue;
		}

		// Open Bracket
		if (chars[i] === '(') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.OpenBracket));
			currentSpelling = '';
			continue;
		}

		// Close Bracket
		if (chars[i] === ')') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.CloseBracket));
			currentSpelling = '';
			continue;
		}

		// Open brace
		if (chars[i] === '{') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.OpenBrace));
			currentSpelling = '';
			continue;
		}

		// Close brace
		if (chars[i] === '}') {
			currentSpelling += chars[i];
			tokens.push(createToken(currentSpelling, TokenType.CloseBrace));
			currentSpelling = '';
			continue;
		}

		// Ignore trailing whitespace
		if (isWhiteSpace(chars[i])) {
			continue;
		}

		// Note error
		currentSpelling += chars[i];
		tokens.push(createToken(currentSpelling, TokenType.Error));
		currentSpelling = '';

		debug(
			'Missed:',
			chars[i],
			'at',
			i,
			`..${chars[i - 1]}${chars[i]}${chars[i + 1]}..`
		);
	}

	return tokens;
}
