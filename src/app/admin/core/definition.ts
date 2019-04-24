
export interface Definition {
	id?: number | string;
	name: string;
	key: string;
	type: string;
	model?: string;
	extend?: string;
	fields?: Definition[];
	control?: string;
	filterType?: number;
	primaryKey?: boolean;
	required?: boolean;
	visible?: boolean;
	editable?: boolean;
	indexable?: boolean;
}

export const CONTROL_MAP: { [key: string]: string } = {
	'boolean': 'checkbox',
	'string': 'text',
	'object': 'select',
	'array': 'text', // list
};

export const REFLECTIONS: Definition[] = [{
	id: 'page',
	name: 'Page',
	key: 'page',
	type: 'object',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Type', key: 'type', type: 'number', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Slug', key: 'slug', type: 'string', required: true },
		{ name: 'Component', key: 'component', type: 'string' },
		{ name: 'Title', key: 'name', type: 'string' },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
		{ name: 'Description', key: 'description', type: 'string' },
		{ name: 'Active', key: 'active', type: 'boolean' },
		{ name: 'Meta', key: 'meta', type: 'object', model: 'meta' },
		{ name: 'Images', key: 'images', type: 'array', model: 'image' },
		{ name: 'Related', key: 'related', type: 'array', model: 'page' },
		{ name: 'Features', key: 'features', type: 'array', model: 'feature' },
		{ name: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'taxonomy' }
	]
}, {
	id: 'definition',
	name: 'Definition',
	key: 'definition',
	type: 'object',
	model: 'Definition',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'field' }
	]
}, {
	id: 'meta',
	name: 'Meta',
	key: 'meta',
	type: 'object',
	model: 'Meta',
	extend: 'Entity',
	fields: [
		{ name: 'Title', key: 'title', type: 'string' },
		{ name: 'Description', key: 'description', type: 'string' },
		{ name: 'Keywords', key: 'keywords', type: 'string' },
		{ name: 'Robots', key: 'robots', type: 'string' }
	]
}, {
	id: 'image',
	name: 'Image',
	key: 'image',
	type: 'object',
	model: 'Image',
	extend: 'Entity',
	fields: [
		{ name: 'Title', key: 'title', type: 'string' },
		{ name: 'Description', key: 'description', type: 'string' },
		{ name: 'Keywords', key: 'keywords', type: 'string' },
		{ name: 'Robots', key: 'robots', type: 'string' }
	]
}];

['Homepage', 'Products', 'Product Detail', 'About Us', 'Contact', 'Store Locator', 'Store Detail', 'Magazine', 'News Detail', 'Faq']
	.forEach(x => {
		const page = REFLECTIONS.find(x => x.model === 'Page');
		const item = Object.assign({}, page);
		item.extend = item.model;
		item.id = x.toLowerCase();
		item.name = x;
		item.model = x;
		item.key = x.toLowerCase();
		REFLECTIONS.push(item);
	});

export const DEFINITIONS: Definition[] = [{
	id: 1,
	name: 'Definition',
	key: 'definition',
	type: 'object',
	model: 'Definition',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true },
		{ name: 'Model', key: 'model', type: 'string', required: true, visible: true, indexable: true },
		{ name: 'Extend', key: 'extend', type: 'string', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
	]
}, {
	id: 2,
	name: 'Page',
	key: 'page',
	type: 'object',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true },
		{ name: 'Type', key: 'type', type: 'number', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Slug', key: 'slug', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Component', key: 'component', type: 'string', visible: true, editable: true }, // special scalar relation type with pageType
		{ name: 'Title', key: 'name', type: 'string', visible: true, editable: true },
		{ name: 'Abstract', key: 'abstract', type: 'string', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'string', visible: true, editable: true },
		{ name: 'Active', key: 'active', type: 'boolean', visible: true, editable: true, indexable: true },
		{ name: 'Meta', key: 'meta', type: 'object', model: 'meta', visible: true, editable: true },
		{ name: 'Images', key: 'images', type: 'array', model: 'image', visible: true, editable: true },
		{ name: 'Related', key: 'related', type: 'array', model: 'page', visible: true, editable: true },
		{ name: 'Features', key: 'features', type: 'array', model: 'feature', visible: true, editable: true },
		{ name: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'taxonomy', visible: true, editable: true }
	]
}];
