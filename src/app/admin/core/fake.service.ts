
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@designr/core';
import { Asset, Definition, DEFINITIONS, Page, REFLECTIONS } from './definition';
import { getIpsum } from './ipsum';
import { toCamelCase, toTitleCase } from './utils';

let UID = 100;

@Injectable({
	providedIn: 'root',
})
export class FakeService {

	// store as observable?
	store: { [key: string]: any };

	constructor(
		protected storage: LocalStorageService,
	) {
		this.createStore();
	}

	isTypeOf(item: Definition, type: string): boolean {
		return toCamelCase(item.extend) === type || toCamelCase(item.model) === type;
	}

	getSync(type: string, ofType?: string): any[] {
		// console.log('getSync', type, ofType);
		if (this.store[type]) {
			const items = this.store[type].filter(x => {
				return ofType ? this.isTypeOf(x, ofType) : x;
			});
			items.sort((a, b) => {
				return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
			});
			return items;
		} else {
			return [];
		}
	}

	getListSync(type: string, ofType?: string): any[] {
		return this.getSync(type, ofType).map(x => {
			return {
				id: x.id,
				name: x.name,
			};
		});
	}

	createStore() {
		let store = this.storage.get('store');
		if (!store) {
			store = {};
			this.store = store;
			store.reflection = REFLECTIONS.map(x => Object.assign({}, x));
			store.definition = DEFINITIONS.map(x => Object.assign({}, x));
			store.component = [];
			const pageDefinition = store.definition.find(x => toCamelCase(x.model) === 'page');
			const pageReflections = this.getSync('reflection', 'page');
			pageReflections.forEach(x => {
				const definition = Object.assign({}, pageDefinition);
				// console.log(definition);
				if (x.model !== 'Page') {
					definition.id = UID++;
					definition.key = toCamelCase(x.model);
					definition.name = x.model;
					definition.model = x.model;
					definition.extend = 'Page';
					definition.fields = pageDefinition.fields.slice().map(x => Object.assign({}, x));
					store.definition.push(definition);
				}
				const component = toTitleCase(x.model) + 'Component';
				store.component.push(
					{ id: definition.id, name: component, path: component.toLowerCase() + '.cshtml' }
				);
			});
			store.pageType = store.definition.filter(x => x.model === 'Page' || x.extend === 'Page').map(x => Object.assign({}, x));
			store.page = this.createPages(1000);
			pageReflections.forEach((x, i) => {
				if (x.model !== 'Page') {
					const key = toCamelCase(x.model);
					// console.log(key, x.id);
					store[key] = store.page.filter(x => toCamelCase(x.pageType.name) === key).map(x => {
						x = Object.assign({}, x);
						x.pageType = Object.assign({}, x.pageType);
						x.component = Object.assign({}, x.component);
						x.assets = x.assets.map(x => Object.assign({}, x));
						return x;
					});
				}
			});
			this.storage.set('store', store);
		}
		this.store = store;
	}

	createPages(count: number = 100): Page[] {
		const pageTypes = this.getSync('definition', 'page');
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			const pageType = pageTypes[Math.floor(Math.random() * pageTypes.length)];
			const isDetail = pageType.name.indexOf('Detail') !== -1;
			if (!isDetail) {
				pageTypes.splice(pageTypes.indexOf(pageType), 1);
			}
			let name = pageType.name + (isDetail ? ` ${id}` : ``);
			name = name.toLowerCase().replace(/\s/g, '-');
			const title = getIpsum(5);
			const abstract = getIpsum(12);
			const description = getIpsum(50);
			const componentName = toTitleCase(pageType.name) + 'Component';
			const component = this.store.component.find(x => x.name === componentName);
			const model = toCamelCase(pageType.name);
			return {
				id,
				pageType: Object.assign({}, pageType),
				component: Object.assign({}, component),
				name,
				title,
				abstract,
				description,
				slug: 'slug',
				active: Math.random() > 0.5,
				contents: [],
				assets: this.createAssets(),
				related: [],
				features: [],
				taxonomies: [],
				// model,
				// market: { id: 1, name: 'en' },
				// visible: Math.random() > 0.5,
				// order: Math.floor(Math.random() * 100000),
				/*
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
				assets?: [];
				related?: Page[];
				features?: any[];
				taxonomies?: any[];
				*/
			};
		});
	}

	createAssets(): Asset[] {
		const count = 1 + Math.floor(Math.random() * 5);
		const widths = [1920, 1600, 1280, 960];
		const heights = [1080, 960, 720, 640, 480];
		return new Array(count).fill(null).map((x, i) => {
			const assetType = {
				id: 1,
				name: 'DefaultType',
				model: 'Asset',
			};
			const name = `picture-${i}`;
			const extension = 'JPG';
			const width = widths[Math.floor(Math.random() * widths.length)];
			const height = heights[Math.floor(Math.random() * heights.length)];
			const id = Math.floor(Math.random() * 1024);
			const src = `https://picsum.photos/id/${id}/${width}/${height}`;
			// const id = uuid();
			// const src = `https://dummyimage.com/${width}x${height}/e2e6f6/2440c3/`;
			return {
				id,
				assetType,
				src,
				name,
				extension,
				width,
				height,
				/*
				id: number | string;
				assetType: AssetType;
				src: string;
				name?: string;
				extension?: string;
				width?: number;
				height?: number;
				title?: string;
				abstract?: string;
				*/
			};
		});
	}

	createType(type: string, model: any): any {
		const definitions = this.store.definitions;
		const pageDefinition = definitions.find(x => toCamelCase(x.model) === 'page');
		const definition = Object.assign({}, pageDefinition);
		definition.id = UID++;
		definition.key = model.name.toLowerCase();
		definition.name = model.name;
		definition.extend = definition.model;
		definition.model = model.name;
		definitions.push(definition);
		this.storage.set('store', this.store);
		return definition;
	}

	createItem(type: string, model: any): any {
		// const definition = this.store.definition.find(x => toCamelCase(x.model) === type);
		const definition = this.store.definition.find(x => x.id === model.typeId);
		const items = this.store[definition.model.toLowerCase()];
		const item = Object.assign({}, model);
		item.id = UID++;
		item.model = definition.model;
		items.push(item);
		this.storage.set('store', this.store);
		return item;
	}

}

