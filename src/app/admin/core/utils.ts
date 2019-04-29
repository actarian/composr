
export function toCamelCase(text: string): string {
	return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
		if (+match === 0) {
			return ''; // or if (/\s+/.test(match)) for white spaces
		}
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
}

export function toTitleCase(text: string): string {
	return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
		if (+match === 0) {
			return ''; // or if (/\s+/.test(match)) for white spaces
		}
		return match.toUpperCase();
	});
}

export function uuid(a?: any) {
	// tslint:disable-next-line: no-bitwise
	return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
