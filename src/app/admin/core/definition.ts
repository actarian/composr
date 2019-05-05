import { toCamelCase, toTitleCase } from './utils';

export interface Field {
	id?: number | string;
	name: string;
	description?: string;
	key: string;
	type: string;
	model?: string;
	extend?: string;
	fields?: Field[];
	control?: string;
	filterType?: number;
	order?: number;
	primaryKey?: boolean;
	required?: boolean;
	visible?: boolean;
	editable?: boolean;
	indexable?: boolean;
}

export interface Definition {
	id?: number | string;
	name: string;
	description?: string;
	key: string;
	type: string;
	model?: string;
	extend?: string;
	fields?: Field[];
}

export interface PageType {
	id: number | string;
	name: string;
	model: string;
}

export interface ContentType {
	id: number | string;
	name: string;
	model: string;
}

export interface AssetType {
	id: number | string;
	name: string;
	model: string;
}

export interface Component {
	id: number | string;
	name: string;
}

export interface Meta {
	title: string;
	description: string;
	keywords: string;
	robots: string;
}

export interface Content {
	id: number | string;
	name: string;
	contentType: ContentType;
}

export interface Asset {
	id: number | string;
	assetType: AssetType;
	src: string;
	name?: string;
	extension?: string;
	width?: number;
	height?: number;
	title?: string;
	abstract?: string;
}

export interface Page {
	id: number | string;
	pageType: PageType;
	component: Component;
	name: string;
	title?: string;
	abstract?: string;
	description?: string;
	meta?: Meta;
	slug?: string;
	active?: boolean;
	contents?: Content[];
	assets?: Asset[];
	related?: Page[];
	features?: any[];
	taxonomies?: any[];
}

export const CONTROL_MAP: { [key: string]: string } = {
	'boolean': 'switch',
	'string': 'text',
	'object': 'select',
	'array': 'text', // list
};

export const REFLECTIONS: Definition[] = [{
	id: 'Definition',
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
	id: 'AssetType',
	name: 'AssetType',
	key: 'assetType',
	type: 'object',
	model: 'AssetType',
	extend: 'Definition',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Model', key: 'model', type: 'string', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
	]
}, {
	id: 'ContentType',
	name: 'ContentType',
	key: 'contentType',
	type: 'object',
	model: 'ContentType',
	extend: 'Definition',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Model', key: 'model', type: 'string', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
	]
}, {
	id: 'PageType',
	name: 'PageType',
	key: 'pageType',
	type: 'object',
	model: 'PageType',
	extend: 'Definition',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Model', key: 'model', type: 'string', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
	]
}, {
	id: 'Component',
	name: 'Component',
	key: 'component',
	type: 'object',
	model: 'Component',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Path', key: 'path', type: 'string' },
		{ name: 'Types', key: 'types', type: 'array', model: 'PageType' }
	]
}, {
	id: 'Meta',
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
	id: 'Asset',
	name: 'Asset',
	key: 'asset',
	type: 'object',
	model: 'Asset',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'AssetType', key: 'assetType', type: 'object', model: 'AssetType', required: true },
		{ name: 'Src', key: 'src', type: 'string', required: true },
		{ name: 'Name', key: 'name', type: 'string' },
		{ name: 'Extension', key: 'extension', type: 'string' },
		{ name: 'Width', key: 'width', type: 'number' },
		{ name: 'Height', key: 'height', type: 'number' },
		{ name: 'Author', key: 'title', type: 'string' },
		{ name: 'Title', key: 'title', type: 'string' },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
	]
}, {
	id: 'Image',
	name: 'Image',
	key: 'image',
	type: 'object',
	model: 'Image',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'AssetType', key: 'assetType', type: 'object', model: 'AssetType', required: true },
		{ name: 'Src', key: 'src', type: 'string', required: true },
		{ name: 'Extension', key: 'extension', type: 'string' },
		{ name: 'Width', key: 'width', type: 'number' },
		{ name: 'Height', key: 'height', type: 'number' },
		{ name: 'Author', key: 'title', type: 'string' },
		{ name: 'Title', key: 'title', type: 'string' },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
	]
}, {
	id: 'Content',
	name: 'Content',
	key: 'content',
	type: 'object',
	model: 'Content',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'ContentType', key: 'contentType', type: 'object', model: 'ContentType', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true }
	]
}, {
	id: 'Page',
	name: 'Page',
	key: 'page',
	type: 'object',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'PageType', key: 'pageType', type: 'object', model: 'PageType', required: true },
		{ name: 'Component', key: 'component', type: 'object', model: 'Component' },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Slug', key: 'slug', type: 'string' },
		{ name: 'Title', key: 'title', type: 'string' },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
		{ name: 'Description', key: 'description', type: 'string' },
		{ name: 'Active', key: 'active', type: 'boolean' },
		{ name: 'Meta', key: 'meta', type: 'object', model: 'Meta' },
		{ name: 'Contents', key: 'contents', type: 'array', model: 'Content' },
		{ name: 'Assets', key: 'assets', type: 'array', model: 'Asset' },
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
		item.id = toTitleCase(x);
		item.name = toTitleCase(x);
		item.model = toTitleCase(x);
		item.key = toCamelCase(x);
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
		{ name: 'Model', key: 'model', type: 'string', model: 'Entity', control: 'reflection', required: true, visible: true, indexable: true },
		// { name: 'Extend', key: 'extend', type: 'string', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', control: 'text', required: true, visible: true, editable: true, indexable: true },
		/*
		{ name: 'Description', key: 'description', type: 'string', control: 'textarea', visible: true, editable: true },
		{ name: 'Required', key: 'required', type: 'boolean', control: 'switch', visible: true, editable: true },
		{ name: 'Visible', key: 'visible', type: 'boolean', control: 'switch', visible: true, editable: true },
		{ name: 'Editable', key: 'editable', type: 'boolean', control: 'switch', visible: true, editable: true },
		{ name: 'Indexable', key: 'indexable', type: 'boolean', control: 'switch', visible: true, editable: true },
		{ name: 'Control', key: 'control', type: 'number', control: 'select', model: 'Control', visible: true, editable: true },
		*/
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field', control: 'tab', visible: true, editable: true },
		/*
		description?: string;
		control?: string;
		required?: boolean;
		visible?: boolean;
		editable?: boolean;
		indexable?: boolean;
		*/
	]
}, {
	id: 2,
	name: 'PageType',
	key: 'pageType',
	type: 'object',
	model: 'PageType',
	extend: 'Definition',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Model', key: 'model', type: 'string', model: 'Page', control: 'reflection', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', control: 'text', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field', control: 'tab', visible: true, editable: true },
	]
}, {
	id: 3,
	name: 'Asset',
	key: 'asset',
	type: 'object',
	model: 'Asset',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'AssetType', key: 'assetType', type: 'object', model: 'AssetType', control: 'select', required: true, visible: true, editable: true },
		{ name: 'Src', key: 'src', type: 'string', required: true, visible: true },
		{ name: 'Name', key: 'name', type: 'string', visible: true },
		{ name: 'Extension', key: 'extension', type: 'string', visible: true },
		{ name: 'Width', key: 'width', type: 'number', visible: true },
		{ name: 'Height', key: 'height', type: 'number', visible: true },
		{ name: 'Author', key: 'author', type: 'string', visible: true, editable: true },
		{ name: 'Title', key: 'title', type: 'string', visible: true, editable: true },
		{ name: 'Abstract', key: 'abstract', type: 'string', control: 'textarea', visible: true, editable: true },
	]
}, {
	id: 4,
	name: 'Meta',
	key: 'meta',
	type: 'object',
	model: 'Meta',
	extend: 'Identity',
	fields: [
		{ name: 'Title', key: 'title', type: 'string', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'string', control: 'textarea', visible: true, editable: true },
		{ name: 'Keywords', key: 'keywords', type: 'string', visible: true, editable: true },
		{ name: 'Robots', key: 'robots', type: 'string', visible: true, editable: true }
	]
}, {
	id: 5,
	name: 'Page',
	key: 'page',
	type: 'object',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'PageType', key: 'pageType', type: 'object', model: 'PageType', control: 'select', required: true, visible: true, indexable: true },
		{ name: 'Component', key: 'component', type: 'object', model: 'Component', control: 'select', visible: true, editable: true, indexable: true }, // special scalar relation type with pageType
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Title', key: 'title', type: 'string', visible: true, editable: true, indexable: true },
		{ name: 'Abstract', key: 'abstract', type: 'string', control: 'textarea', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'string', control: 'textarea', visible: true, editable: true },
		{ name: 'Slug', key: 'slug', type: 'string', visible: true, editable: true },
		{ name: 'Active', key: 'active', type: 'boolean', control: 'switch', visible: true, editable: true },
		{
			name: 'Meta', key: 'meta', type: 'object', model: 'Meta', control: 'tab', visible: true,
			description: 'lorem ipsum'
		},
		{ name: 'Contents', key: 'contents', type: 'array', model: 'Content', control: 'tab', visible: true },
		{ name: 'Assets', key: 'assets', type: 'array', model: 'Asset', control: 'tab', visible: true },
		{ name: 'Related', key: 'related', type: 'array', model: 'Page', control: 'tab', visible: true },
		{ name: 'Features', key: 'features', type: 'array', model: 'Feature', control: 'tab', visible: true },
		{ name: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'Taxonomy', visible: true }
	]
}];

export const STORE: { [key: string]: any[] } = {
	assetType: [{
		id: 100000,
		model: 'AssetType',
		name: 'Default Type',
		abstract: 'Generic Picture',
	}]
};
