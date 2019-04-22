
export interface PageType {
	id: number;
	name: string;
	isIndex: boolean;
}

export const DATA: { [key: string]: any[] } = {
	pagetype: [
		{ id: 1, isIndex: true, name: 'Homepage' },
		{ id: 2, isIndex: false, name: 'Products' },
		{ id: 3, isIndex: false, name: 'Product Detail' },
		{ id: 4, isIndex: true, name: 'About Us' },
		{ id: 5, isIndex: true, name: 'Contact' },
		{ id: 6, isIndex: true, name: 'Store Locator' },
		{ id: 7, isIndex: false, name: 'Store Detail' },
		{ id: 8, isIndex: true, name: 'Magazine' },
		{ id: 9, isIndex: false, name: 'News' },
		{ id: 10, isIndex: true, name: 'Faq' },
		{ id: 11, isIndex: false, name: 'Generic' },
	]
};
