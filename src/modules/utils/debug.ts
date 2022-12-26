const isDebugging = true;

export function debug(...message: any[]) {
	if (isDebugging) {
		console.log(...message);
	}
}
