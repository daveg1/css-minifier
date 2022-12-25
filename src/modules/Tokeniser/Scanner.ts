export class Scanner {
	static *scan(file: string) {
		for (let i = 0; i < file.length; i++) {
			yield file.charAt(i)
		}
	}
}
