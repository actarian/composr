import { toTitleCase } from './utils';

export const CONTROL_MAP: { [key: string]: string } = {
	'boolean': 'switch',
	'string': 'text',
	'object': 'select',
	'array': 'text', // list
};

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

export interface Localization {
	[key: string]: string;
}

export interface Language {
	id: number | string;
	name: string;
	code: string;
	description: Localization | string;
	active: boolean;
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
	title?: Localization | string;
	abstract?: Localization | string;
	description?: Localization | string;
	meta?: Meta;
	slug?: string;
	active?: boolean;
	contents?: Content[];
	assets?: Asset[];
	related?: Page[];
	features?: any[];
	taxonomies?: any[];
}

export const REFLECTIONS: Definition[] = [{
	id: 'Definition',
	name: 'Definition',
	type: 'object',
	model: 'Definition',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field' }
	]
}, {
	id: 'Entity',
	name: 'Entity',
	type: 'object',
	model: 'Entity',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field' }
	]
}, {
	id: 'AssetType',
	name: 'AssetType',
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
	id: 'Language',
	name: 'Language',
	type: 'object',
	model: 'Language',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Code', key: 'code', type: 'string' },
		{ name: 'Description', key: 'description', type: 'object', model: 'Localization' },
		{ name: 'Active', key: 'active', type: 'boolean' }
	]
}, {
	id: 'Meta',
	name: 'Meta',
	type: 'object',
	model: 'Meta',
	extend: 'Entity',
	fields: [
		{ name: 'Title', key: 'title', type: 'object', model: 'Localization' },
		{ name: 'Description', key: 'description', type: 'object', model: 'Localization' },
		{ name: 'Keywords', key: 'keywords', type: 'object', model: 'Localization' },
		{ name: 'Robots', key: 'robots', type: 'object', model: 'Localization' }
	]
}, {
	id: 'Asset',
	name: 'Asset',
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
		{ name: 'Title', key: 'title', type: 'object', model: 'Localization' },
		{ name: 'Abstract', key: 'abstract', type: 'object', model: 'Localization' },
	]
}, {
	id: 'Content',
	name: 'Content',
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
	type: 'object',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'PageType', key: 'pageType', type: 'object', model: 'PageType', required: true },
		{ name: 'Component', key: 'component', type: 'object', model: 'Component' },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Slug', key: 'slug', type: 'string' },
		{ name: 'Title', key: 'title', type: 'object', model: 'Localization' },
		{ name: 'Abstract', key: 'abstract', type: 'object', model: 'Localization' },
		{ name: 'Description', key: 'description', type: 'object', model: 'Localization' },
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
		REFLECTIONS.push(item);
	});

export const DEFINITIONS: Definition[] = [{
	id: 1,
	name: 'Definition',
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
	id: 1,
	name: 'Entity',
	type: 'object',
	model: 'Entity',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Model', key: 'model', type: 'string', model: 'Entity', control: 'reflection', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', control: 'text', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field', control: 'tab', visible: true, editable: true },
	]
}, {
	id: 1,
	name: 'PageType',
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
	id: 1,
	name: 'Asset',
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
		{ name: 'Title', key: 'title', type: 'object', model: 'Localization', control: 'localized-text', visible: true, editable: true },
		{ name: 'Abstract', key: 'abstract', type: 'object', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
	]
}, {
	id: 1,
	name: 'Meta',
	type: 'object',
	model: 'Meta',
	extend: 'Identity',
	fields: [
		{ name: 'Title', key: 'title', type: 'object', model: 'Localization', control: 'localized-text', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'object', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Keywords', key: 'keywords', type: 'object', model: 'Localization', control: 'localized-text', visible: true, editable: true },
		{ name: 'Robots', key: 'robots', type: 'object', model: 'Localization', control: 'localized-text', visible: true, editable: true }
	]
}, {
	id: 1,
	name: 'Page',
	type: 'object',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'PageType', key: 'pageType', type: 'object', model: 'PageType', control: 'select', required: true, visible: true, indexable: true },
		{ name: 'Component', key: 'component', type: 'object', model: 'Component', control: 'select', visible: true, editable: true, indexable: true }, // special scalar relation type with pageType
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Title', key: 'title', type: 'object', model: 'Localization', control: 'localized-text', visible: true, editable: true, indexable: true },
		{ name: 'Abstract', key: 'abstract', type: 'object', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'object', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
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
}, {
	id: 1,
	name: 'ContentType',
	type: 'object',
	model: 'ContentType',
	extend: 'Definition',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Model', key: 'model', type: 'string', model: 'Content', control: 'reflection', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', control: 'text', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field', control: 'tab', visible: true, editable: true },
	]
}, {
	id: 1,
	name: 'Content',
	type: 'object',
	model: 'Content',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'ContentType', key: 'contentType', type: 'object', model: 'ContentType', control: 'select', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
	]
}, {
	id: 1,
	name: 'Component',
	type: 'object',
	model: 'Component',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Path', key: 'path', type: 'string', visible: true, editable: true, indexable: true },
		{ name: 'Types', key: 'types', type: 'array', model: 'PageType', control: 'multi', visible: true, editable: true, indexable: true }
	]
}, {
	id: 1,
	name: 'Language',
	type: 'object',
	model: 'Language',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Code', key: 'code', type: 'string', visible: true, editable: true, indexable: true },
		{ name: 'Description', key: 'description', type: 'object', model: 'Localization', control: 'localized-text', visible: true, editable: true, indexable: true },
		{ name: 'Active', key: 'active', type: 'boolean', visible: true, editable: true, indexable: true },
	]
}];

export const STORE: { [key: string]: any[] } = {
	asset: [],
	assetType: [{
		id: 1,
		model: 'AssetType',
		name: 'Default Type',
		abstract: 'Generic Picture',
	}],
	content: [],
	contentType: DEFINITIONS.filter(x => x.model === 'ContentType'),
	language: [{
		id: 1,
		name: 'Italiano',
		description: {
			it: 'Italiano',
			en: 'Italian',
		},
		code: 'it',
		active: true,
	}, {
		id: 1,
		name: 'English',
		description: {
			it: 'Inglese',
			en: 'English',
		},
		code: 'en',
		active: true,
	}]
};
