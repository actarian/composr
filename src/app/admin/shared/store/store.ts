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
	model?: string;
	extend?: string;
	fields?: Field[];
}

export interface Component {
	id: number | string;
	name: string;
}

export interface Localization {
	code: string;
	text: string;
	// [index: number]: { code: string; text: string; };
	// [key: string]: string;
}

export interface Language {
	id: number | string;
	name: string;
	code: string;
	description: Localization[] | string;
	active: boolean;
}

export interface Meta {
	id: number | string;
	title?: Localization[] | string;
	description?: Localization[] | string;
	keywords?: Localization[] | string;
	robots?: Localization[] | string;
}

export interface AssetType {
	id: number | string;
	name: string;
	model: string;
}

export interface Asset {
	id: number | string;
	type: AssetType;
	src: string;
	name?: string;
	extension?: string;
	width?: number;
	height?: number;
	title?: string;
	abstract?: string;
	active?: boolean;
}

export interface PageType {
	id: number | string;
	name: string;
	model: string;
}

export interface Page {
	id: number | string;
	type: PageType;
	component: Component;
	name: string;
	title?: Localization[] | string;
	abstract?: Localization[] | string;
	description?: Localization[] | string;
	meta?: Meta;
	slug?: string;
	contents?: Content[];
	assets?: Asset[];
	related?: Page[];
	features?: any[];
	taxonomies?: any[];
	active?: boolean;
}

export interface ContentType {
	id: number | string;
	name: string;
	model: string;
}

export interface Content {
	id: number | string;
	name: string;
	type: ContentType;
	active: boolean;
}

export interface ContentText {
	id: number | string;
	name: string;
	type: ContentType;
	title?: Localization[] | string;
	abstract?: Localization[] | string;
	description?: Localization[] | string;
	active?: boolean;
}

export interface ContentPicture {
	id: number | string;
	name: string;
	type: ContentType;
	title?: Localization[] | string;
	abstract?: Localization[] | string;
	description?: Localization[] | string;
	assets?: Asset[];
	active?: boolean;
}

export const REFLECTIONS: Definition[] = [{
	id: 'Definition',
	name: 'Definition',
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
	model: 'Component',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Path', key: 'path', type: 'string' },
		{ name: 'Types', key: 'types', type: 'array', model: 'Page' }
	]
}, {
	id: 'Language',
	name: 'Language',
	model: 'Language',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Code', key: 'code', type: 'string' },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization' },
		{ name: 'Active', key: 'active', type: 'boolean' }
	]
}, {
	id: 'Meta',
	name: 'Meta',
	model: 'Meta',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization' },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization' },
		{ name: 'Keywords', key: 'keywords', type: 'array', model: 'Localization' },
		{ name: 'Robots', key: 'robots', type: 'array', model: 'Localization' }
	]
}, {
	id: 'Asset',
	name: 'Asset',
	model: 'Asset',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'AssetType', key: 'type', type: 'object', model: 'AssetType', required: true },
		{ name: 'Src', key: 'src', type: 'string', required: true },
		{ name: 'Name', key: 'name', type: 'string' },
		{ name: 'Extension', key: 'extension', type: 'string' },
		{ name: 'Width', key: 'width', type: 'number' },
		{ name: 'Height', key: 'height', type: 'number' },
		{ name: 'Author', key: 'title', type: 'string' },
		{ name: 'Title', key: 'title', type: 'string' },
		{ name: 'Abstract', key: 'abstract', type: 'string' },
		{ name: 'Active', key: 'active', type: 'boolean' }
	]
}, {
	id: 'Image',
	name: 'Image',
	model: 'Image',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'AssetType', key: 'type', type: 'object', model: 'AssetType', required: true },
		{ name: 'Src', key: 'src', type: 'string', required: true },
		{ name: 'Extension', key: 'extension', type: 'string' },
		{ name: 'Width', key: 'width', type: 'number' },
		{ name: 'Height', key: 'height', type: 'number' },
		{ name: 'Author', key: 'title', type: 'string' },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization' },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization' },
		{ name: 'Active', key: 'active', type: 'boolean' }
	]
}, {
	id: 'Page',
	name: 'Page',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Page', required: true },
		{ name: 'Component', key: 'component', type: 'object', model: 'Component' },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Slug', key: 'slug', type: 'string' },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization' },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization' },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization' },
		{ name: 'Meta', key: 'meta', type: 'object', model: 'Meta' },
		{ name: 'Contents', key: 'contents', type: 'array', model: 'Content' },
		{ name: 'Assets', key: 'assets', type: 'array', model: 'Asset' },
		{ name: 'Related', key: 'related', type: 'array', model: 'Page' },
		{ name: 'Features', key: 'features', type: 'array', model: 'Feature' },
		{ name: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'Taxonomy' },
		{ name: 'Active', key: 'active', type: 'boolean' }
	]
}, {
	id: 'Content',
	name: 'Content',
	model: 'Content',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Content', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Active', key: 'active', type: 'boolean' }
	]
}, {
	id: 'ContentText',
	name: 'ContentText',
	model: 'ContentText',
	extend: 'Content',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Content', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization' },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization' },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization' },
		{ name: 'Active', key: 'active', type: 'boolean' }
	]
}, {
	id: 'ContentPicture',
	name: 'ContentPicture',
	model: 'ContentPicture',
	extend: 'Content',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Content', required: true },
		{ name: 'Name', key: 'name', type: 'string', required: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization' },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization' },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization' },
		{ name: 'Assets', key: 'assets', type: 'array', model: 'Asset' },
		{ name: 'Active', key: 'active', type: 'boolean' }
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
	model: 'Definition',
	extend: 'Object',
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
	model: 'Entity',
	extend: 'Definiion',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Model', key: 'model', type: 'string', model: 'Entity', control: 'reflection', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', control: 'text', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field', control: 'tab', visible: true, editable: true },
	]
}, {
	id: 1,
	name: 'Component',
	model: 'Component',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Path', key: 'path', type: 'string', visible: true, editable: true, indexable: true },
		{ name: 'Types', key: 'types', type: 'array', model: 'Page', control: 'multi', visible: true, editable: true, indexable: true }
	]
}, {
	id: 1,
	name: 'Language',
	model: 'Language',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Code', key: 'code', type: 'string', visible: true, editable: true, indexable: true },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true, indexable: true },
		{ name: 'Active', key: 'active', type: 'boolean', visible: true, editable: true, indexable: true },
	]
}, {
	id: 1,
	name: 'Meta',
	model: 'Meta',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: false, indexable: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true, indexable: true },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Keywords', key: 'keywords', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true },
		{ name: 'Robots', key: 'robots', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true }
	]
}, {
	id: 1,
	name: 'PageType',
	model: 'PageType',
	extend: 'Definition',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Model', key: 'model', type: 'string', model: 'Page', control: 'reflection', required: true, visible: true, editable: false, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', control: 'text', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field', control: 'tab', visible: true, editable: true },
	]
}, {
	id: 1,
	name: 'Page',
	model: 'Page',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Page', control: 'definition', required: true, visible: true, indexable: true },
		{ name: 'Component', key: 'component', type: 'object', model: 'Component', control: 'select', visible: true, editable: true, indexable: true }, // special scalar relation type with type
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true, indexable: true },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Slug', key: 'slug', type: 'string', visible: true, editable: true },
		{ name: 'Active', key: 'active', type: 'boolean', control: 'switch', visible: true, editable: true, indexable: true },
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
	name: 'AssetType',
	model: 'AssetType',
	extend: 'Definition',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Model', key: 'model', type: 'string', model: 'Asset', control: 'reflection', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', control: 'text', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Fields', key: 'fields', type: 'array', model: 'Field', control: 'tab', visible: true, editable: true },
	]
}, {
	id: 1,
	name: 'Asset',
	model: 'Asset',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, indexable: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Asset', control: 'definition', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Src', key: 'src', type: 'string', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', visible: true, indexable: true },
		{ name: 'Extension', key: 'extension', type: 'string', visible: true, indexable: true },
		{ name: 'Width', key: 'width', type: 'number', visible: true, indexable: true },
		{ name: 'Height', key: 'height', type: 'number', visible: true, indexable: true },
		{ name: 'Author', key: 'author', type: 'string', visible: true, editable: true, indexable: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Active', key: 'active', type: 'boolean', control: 'switch', visible: true, editable: true, indexable: true },
	]
}, {
	id: 1,
	name: 'ContentType',
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
	model: 'Content',
	extend: 'Entity',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Content', control: 'definition', required: true, visible: true, indexable: true },
		{ name: 'Active', key: 'active', type: 'boolean', control: 'switch', visible: true, editable: true, indexable: true },
	]
}, {
	id: 1,
	name: 'ContentText',
	model: 'ContentText',
	extend: 'Content',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Content', control: 'definition', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true, indexable: true },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Active', key: 'active', type: 'boolean', control: 'switch', visible: true, editable: true, indexable: true },
	]
}, {
	id: 1,
	name: 'ContentPicture',
	model: 'ContentPicture',
	extend: 'Content',
	fields: [
		{ name: 'Id', key: 'id', type: 'number', primaryKey: true, required: true, visible: true, indexable: true },
		{ name: 'Type', key: 'type', type: 'object', model: 'Content', control: 'definition', required: true, visible: true, indexable: true },
		{ name: 'Name', key: 'name', type: 'string', required: true, visible: true, editable: true, indexable: true },
		{ name: 'Title', key: 'title', type: 'array', model: 'Localization', control: 'localized-text', visible: true, editable: true, indexable: true },
		{ name: 'Abstract', key: 'abstract', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Description', key: 'description', type: 'array', model: 'Localization', control: 'localized-textarea', visible: true, editable: true },
		{ name: 'Active', key: 'active', type: 'boolean', control: 'switch', visible: true, editable: true, indexable: true },
		{ name: 'Assets', key: 'assets', type: 'array', model: 'Asset', control: 'tab', visible: true },
	]
}];

export const STORE: { [key: string]: any[] } = {
	/*
	assetType: [{
		id: 1,
		model: 'AssetType',
		name: 'Default Type',
		abstract: 'Generic Picture',
	}],
	*/
	asset: [],
	// contentType: DEFINITIONS.filter(x => x.model === 'ContentType'),
	component: [],
	content: [],
	meta: [],
	// entity: [],
	language: [{
		id: 1,
		name: 'Italiano',
		description: [
			{ code: 'it', text: 'Italiano' },
			{ code: 'en', text: 'Italian' }
		],
		code: 'it',
		active: true,
	}, {
		id: 1,
		name: 'English',
		description: [
			{ code: 'it', text: 'Inglese' },
			{ code: 'en', text: 'English' }
		],
		code: 'en',
		active: true,
	}]
};
