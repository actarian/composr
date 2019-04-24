
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
	order?: number;
	//
	primaryKey?: boolean;
	//
	required?: boolean;
	visible?: boolean;
	editable?: boolean;
	indexable?: boolean;
}

export const CONTROL_MAP: { [key: string]: string } = {
	'boolean': 'switch',
	'string': 'text',
	'object': 'select',
	'array': 'text', // list
};

export const REFLECTIONS: Definition[] = [{
	id: 'definition',
	name: 'Definition',
	key: 'definition',
	type: 'object',
	model: 'Definition',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field' }
	]
}, {
	id: 'component',
	name: 'Component',
	key: 'component',
	type: 'object',
	model: 'Component',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Path', key: 'path', type: 'string', required: true },
		{ name: 'Types', key: 'types', type: 'array', model: 'PageType' }
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
}, {
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
		{ name: 'Title', key: 'title', type: 'string' },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
		{ name: 'Description', key: 'description', type: 'string' },
		{ name: 'Active', key: 'active', type: 'boolean' },
		{ name: 'Meta', key: 'meta', type: 'object', model: 'Meta' },
		{ name: 'Images', key: 'images', type: 'array', model: 'Image' },
		{ name: 'Related', key: 'related', type: 'array', model: 'Page' },
		{ name: 'Features', key: 'features', type: 'array', model: 'Feature' },
		{ name: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'Taxonomy' }
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
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
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
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Type', key: 'typeId', type: 'number', control: 'select', model: 'PageType', required: true, visible: true, indexable: true },
		{ name: 'Component', key: 'component', type: 'object', model: 'Component', control: 'select', visible: true, editable: true, indexable: true }, // special scalar relation type with pageType
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Title', key: 'title', type: 'string', visible: true, editable: true, indexable: true },
		{ name: 'Abstract', key: 'abstract', type: 'string', control: 'textarea', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'string', control: 'textarea', visible: true, editable: true },
		{ name: 'Slug', key: 'slug', type: 'string', required: true, visible: true, editable: true },
		{ name: 'Active', key: 'active', type: 'boolean', control: 'switch', visible: true, editable: true },
		{ name: 'Meta', key: 'meta', type: 'object', model: 'Meta', control: 'tab', visible: true },
		{ name: 'Images', key: 'images', type: 'array', model: 'Image', visible: true },
		{ name: 'Related', key: 'related', type: 'array', model: 'Page', visible: true },
		{ name: 'Features', key: 'features', type: 'array', model: 'Feature', visible: true },
		{ name: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'Taxonomy', visible: true }
	]
}];
