
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

export function skipEmpties(dirty: any): any {
	let item;
	if (Array.isArray(dirty)) {
		item = dirty.map(x => skipEmpties(x)).filter(value => value !== undefined);
		return item.length ? item : undefined;
	} else if (dirty && typeof dirty === 'object') {
		item = {};
		Object.keys(dirty).forEach(key => {
			const value = skipEmpties(dirty[key]);
			if (value !== undefined) {
				item[key] = value;
			}
		});
		return Object.keys(item).length ? item : undefined;
	} else {
		return dirty === null ? undefined : dirty;
	}
}

export function differs(a: any, b: any): boolean {
	a = skipEmpties(a);
	b = skipEmpties(b);
	// console.log(a, b);
	return JSON.stringify(a) !== JSON.stringify(b);
}

export function uuid(a?: any) {
	// tslint:disable-next-line: no-bitwise
	return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
