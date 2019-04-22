import { FilterTypeEnum } from '../shared/table/table.component';

export interface Definition {
	id?: number;
	label: string;
	key: string;
	type: string;
	model?: string;
	fields?: Definition[];
	control?: string;
	filterType?: number;
	primaryKey?: boolean;
}

export const REFLECTION: { [key: string]: Definition[] } = {
	pagetype: [
		{ label: 'Id', key: 'id', type: 'number' },
		{ label: 'Name', key: 'name', type: 'string' },
		{ label: 'Fields', key: 'fields', type: 'array', model: 'field' },
	],
	page: [
		{ label: 'Id', key: 'id', type: 'number' },
		{ label: 'Slug', key: 'slug', type: 'string' },
		{ label: 'Url', key: 'url', type: 'string' },
		{ label: 'Title', key: 'label', type: 'string' },
		{ label: 'Abstract', key: 'abstract', type: 'string' },
		{ label: 'Description', key: 'description', type: 'string' },
		{ label: 'Component', key: 'component', type: 'string' },
		{ label: 'Type', key: 'type', type: 'number' },
		{ label: 'Active', key: 'active', type: 'boolean' },
		{ label: 'Meta', key: 'meta', type: 'object', model: 'meta' },
		{ label: 'Images', key: 'images', type: 'array', model: 'image' },
		{ label: 'Related', key: 'related', type: 'array', model: 'page' },
		{ label: 'Features', key: 'features', type: 'array', model: 'feature' },
		{ label: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'taxonomy' }
	],
	meta: [
		{ label: 'Title', key: 'title', type: 'string' },
		{ label: 'Description', key: 'description', type: 'string' },
		{ label: 'Keywords', key: 'keywords', type: 'string' },
		{ label: 'Robots', key: 'robots', type: 'string' }
	],
	image: [
		{ label: 'Id', key: 'id', type: 'number' },
		{ label: 'Type', key: 'type', type: 'number' },
		{ label: 'Description', key: 'description', type: 'string' },
		{ label: 'FielName', key: 'fileName', type: 'string' },
		{ label: 'Url', key: 'url', type: 'string' }
	]
};

export const INDEX_DEFINITION: { [key: string]: Definition } = {
	page: {
		label: 'Pages',
		key: 'page',
		type: 'object',
		model: 'Page',
		fields: [
			{ label: 'Id', key: 'id', type: 'number', primaryKey: true },
			{ label: 'Title', key: 'title', type: 'string' },
			{ label: 'Page Type', key: 'pageType', type: 'string' },
			{ label: 'Template', key: 'template', type: 'string' },
			/*
			{ label: 'Category', key: 'category', type: 'string' },
			{ label: 'Market', key: 'market', type: 'string' },
			*/
			{ label: 'Active', key: 'active', type: 'boolean', filterType: FilterTypeEnum.Select },
		]
	}
};

export const DETAIL_DEFINITION: { [key: string]: Definition } = {
	pagetype: {
		label: 'Page Type',
		key: 'pagetype',
		type: 'object',
		model: 'PageType',
		fields: [
			{ label: 'Id', key: 'id', type: 'number', primaryKey: true },
			{ label: 'Name', key: 'name', type: 'string' },
		]
	},
	page: {
		label: 'Page',
		key: 'page',
		type: 'object',
		model: 'Page',
		fields: [
			{ label: 'Id', key: 'id', type: 'number', primaryKey: true },
			{ label: 'Slug', key: 'slug', type: 'string' },
			{ label: 'Url', key: 'url', type: 'string' },
			{ label: 'Title', key: 'label', type: 'string' },
			{ label: 'Abstract', key: 'abstract', type: 'string' },
			{ label: 'Description', key: 'description', type: 'string' },
			{ label: 'Component', key: 'component', type: 'string' },
			{ label: 'Type', key: 'type', type: 'number' },
			{ label: 'Active', key: 'active', type: 'boolean' },
			{
				label: 'Meta', key: 'meta', type: 'object', model: 'meta',
				fields: [
					{ label: 'Title', key: 'title', type: 'string' },
					{ label: 'Description', key: 'description', type: 'string' },
					{ label: 'Keywords', key: 'keywords', type: 'string' },
					{ label: 'Robots', key: 'robots', type: 'string' }
				]
			},
			{ label: 'Images', key: 'images', type: 'array', model: 'image' },
			{ label: 'Related', key: 'related', type: 'array', model: 'page' },
			{ label: 'Features', key: 'features', type: 'array', model: 'feature' },
			{ label: 'Taxonomies', key: 'taxonomies', type: 'array', model: 'taxonomy' }
		]
	}
};
