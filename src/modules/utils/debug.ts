const isDebugging = false

export function debug(...message: any[]) {
	if (isDebugging) {
		console.log(...message)
	}
}
