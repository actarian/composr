
import { Injectable } from '@angular/core';
import { Identity, LocalStorageService } from '@designr/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { getIpsum } from './ipsum';
import { Asset, Definition, DEFINITIONS, Field, Page, REFLECTIONS, STORE } from './store';
import { toCamelCase, toTitleCase } from './utils';

let UID = 100;

@Injectable({
	providedIn: 'root',
})
export class FakeService {

	private store_: BehaviorSubject<{ [key: string]: any[] }> = new BehaviorSubject<{ [key: string]: any[] }>(null);

	private createStore$ = this.createStore_().pipe(
		shareReplay()
	);

	get store$(): Observable<{ [key: string]: any[] }> {
		let store = this.store_.getValue();
		if (!store) {
			store = this.storage.get('store');
			if (!store) {
				return this.createStore$;
			}
			this.store_.next(store);
		}
		return this.store_;
	}

	get store(): { [key: string]: any[] } {
		return this.store_.getValue();
	}

	set store(store: { [key: string]: any[] }) {
		this.store_.next(store);
		const stringify = JSON.stringify(store, (key: string, value: any) => {
			return value !== null ? value : undefined;
		});
		const parsed = JSON.parse(stringify);
		this.storage.set('store', parsed);
	}

	constructor(
		protected storage: LocalStorageService,
	) {
	}

	get$(type: string, ofType?: string): Observable<any[]> {
		return this.store$.pipe(
			map(store => {
				return this.getSync(store, type, ofType);
			})
		);
	}

	getList$(type: string, ofType?: string): Observable<any[]> {
		return this.store$.pipe(
			map(store => {
				return this.getListSync(store, type, ofType);
			})
		);
	}

	getTypes$(type: string, ofType?: string): Observable<any[]> {
		return this.get$(type, ofType).pipe(
			// tap(x => console.log('getTypes$', x)),
			map(x => x.map(x => {
				return {
					id: x.id,
					name: x.name,
					model: x.model,
				};
			}))
		);
	}

	getDefinition$(type: string): Observable<Definition> {
		return this.store$.pipe(
			map(store => {
				const definition = store.definition.find(x => toCamelCase(x.model) === toCamelCase('Definition'));
				return store.definition.find(x => toCamelCase(x.model) === toCamelCase(type)) || definition;
			})
		);
	}

	getReflection$(type: string): Observable<Definition> {
		return this.store$.pipe(
			map(store => {
				return store.reflection.find(x => toCamelCase(x.model) === toCamelCase(type));
			})
		);
	}

	getIndex$(type: string): Observable<any[]> {
		return this.getDefinition$(type).pipe(
			switchMap(definition => {
				return this.store$.pipe(
					map(store => {
						let items = store[toCamelCase(type)];
						if (definition) {
							items = items.map(x => {
								const item: any = {};
								item.model = x.model || type;
								definition.fields.forEach(field => {
									if (field.primaryKey || field.indexable) {
										item[field.key] = x[field.key];
									}
								});
								return item;
							});
						}
						return items;
					})
				);
			})
		);
	}

	getDetail$(type: string, id: number | string) {
		return this.store$.pipe(
			map(store => {
				return store[toCamelCase(type)].find(x => x.id === id);
			})
		);
	}

	addItem$(type: string, model: any): Observable<any> {
		console.log('FakeService.addItem$', type, model);
		return of(this.store).pipe(
			map(store => {
				// !!! da rifare errore
				// const definition = this.store.definition.find(x => toCamelCase(x.model) === type);
				let id;
				switch (type) {
					case 'Page':
						id = model.pageType.id;
						break;
					default:
						id = model.type.id;
				}
				const definition = store.definition.find(x => x.id === id);
				const items = store[toCamelCase(definition.model)];
				const item = Object.assign({}, model);
				item.id = UID++;
				item.model = definition.model;
				items.push(item);
				this.store = store;
				return item;
			})
		);
	}

	addType$(type: string, model: any): Observable<any> {
		// console.log('FakeService.addType$', type, model);
		return of(this.store).pipe(
			map(store => {
				const definitions = store.definition;
				const definition = definitions.find(x => toCamelCase(x.model) === toCamelCase(type));
				const items = definitions; // store[toCamelCase(type)];
				const item = Object.assign({}, definition);
				item.id = UID++;
				item.name = model.name;
				item.extend = definition.model;
				item.model = model.model;
				items.push(item);
				this.store = store;
				return item;
			})
		);
	}

	patchDetail$(type: string, model: Identity): Observable<any> {
		return of(this.store).pipe(
			map(store => {
				const item = store[toCamelCase(type)].find(x => x.id === model.id);
				Object.assign(item, model);
				this.store = store;
				return item;
			})
		);
	}

	patchField$(type: string, id: number | string, model: Identity): Observable<Field> {
		// console.log('patchField', type, id, model);
		return of(this.store).pipe(
			map(store => {
				const item = store[toCamelCase(type)].find(x => x.id === id);
				const field = item.fields.find(x => x.id === model.id);
				Object.assign(field, model);
				this.store = store;
				return field;
			})
		);
	}

	patchAsset$(type: string, id: number | string, model: Identity): Observable<Field> {
		// console.log('patchAsset', type, id, model);
		return of(this.store).pipe(
			map(store => {
				const item = store[toCamelCase(type)].find(x => x.id === id);
				const asset = item.assets.find(x => x.id === model.id);
				Object.assign(asset, model);
				this.store = store;
				return asset;
			})
		);
	}

	private createStore_() {
		return this.pictures$().pipe(
			switchMap(pictures => {
				const store = Object.assign({}, STORE);
				store.reflection = REFLECTIONS;
				store.definition = DEFINITIONS;
				store.component = [];
				const pageTypeDefinition = store.definition.find(x => x.model === 'PageType');
				pageTypeDefinition.fields.forEach(x => x.id = UID++);
				const pageDefinition = store.definition.find(x => x.model === 'Page');
				pageDefinition.fields.forEach(x => x.id = UID++);
				const pageReflections = this.getSync(store, 'reflection', 'Page');
				pageReflections.forEach(x => {
					const definitionType = Object.assign({}, pageTypeDefinition);
					// console.log(definition);
					if (x.model !== 'Page') {
						const model = x.model + 'Type';
						definitionType.id = UID++;
						definitionType.name = model;
						definitionType.model = model;
						definitionType.extend = 'PageType';
						definitionType.fields = definitionType.fields.slice();
						definitionType.fields.forEach(x => x.id = UID++);
						store.definition.push(definitionType);
					}
					const definition = Object.assign({}, pageDefinition);
					// console.log(definition);
					if (x.model !== 'Page') {
						definition.id = UID++;
						definition.name = x.model;
						definition.model = x.model;
						definition.extend = 'Page';
						definition.fields = pageDefinition.fields.slice();
						definition.fields.forEach(x => x.id = UID++);
						store.definition.push(definition);
					}
					const component = toTitleCase(x.model) + 'Component';
					store.component.push(
						{
							id: definition.id, name: component, path: component.toLowerCase() + '.cshtml', types: [{
								id: definition.id, name: definition.name
							}]
						}
					);
				});
				store.pageType = store.definition.filter(x => x.model === 'Page' || x.extend === 'Page');
				store.page = this.createPages_(store, pictures, 100);
				pageReflections.forEach((x, i) => {
					if (x.model !== 'Page') {
						const key = toCamelCase(x.model);
						// console.log(key, x.id);
						store[key] = store.page.filter(x => toCamelCase(x.pageType.name) === key);
					}
				});
				this.store = store;
				return this.store_;
			})
		);
	}

	private createPages_(store, pictures, count: number = 100): Page[] {
		const pageTypes = this.getSync(store, 'definition', 'page');
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			// console.log(JSON.parse(JSON.stringify(pageTypes)));
			const pageType = pageTypes[Math.floor(Math.random() * pageTypes.length)];
			const isSingleton = pageType.name.indexOf('Detail') === -1;
			if (isSingleton) {
				pageTypes.splice(pageTypes.indexOf(pageType), 1);
			}
			let name = pageType.name + (isSingleton ? `` : ` ${id}`);
			name = name.toLowerCase().replace(/\s/g, '-');
			const title = getIpsum(5);
			const abstract = getIpsum(12);
			const description = getIpsum(50);
			const componentName = toTitleCase(pageType.name) + 'Component';
			const component = store.component.find(x => x.name === componentName);
			const model = toCamelCase(pageType.name);
			return {
				id,
				model,
				pageType: {
					id: pageType.id,
					name: pageType.name,
					model: pageType.model,
				},
				component: {
					id: component.id,
					name: component.name,
					model: component.model,
				},
				name,
				title: { en: title },
				abstract: { en: abstract },
				description: { en: description },
				slug: 'slug',
				active: Math.random() > 0.5,
				contents: [],
				assets: this.createAssets_(store, pictures),
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

	private createAssets_(store, pictures): Asset[] {
		const count = 1 + Math.floor(Math.random() * 5);
		const widths = [1920, 1600, 1280, 960];
		const heights = [1080, 960, 720, 640, 480];
		return new Array(count).fill(null).map((x, i) => {
			const picture = pictures[Math.floor(Math.random() * pictures.length)];
			const assetType = store.assetType[0];
			const name = `picture-${i}`;
			const extension = 'JPG';
			const id = UID++;
			const width = picture.width;
			const height = picture.height;
			const src = picture.src;
			const author = picture.author;
			/*
			const width = widths[Math.floor(Math.random() * widths.length)];
			const height = heights[Math.floor(Math.random() * heights.length)];
			const id = Math.floor(Math.random() * 1024);
			const src = `https://picsum.photos/id/${id}/${width}/${height}`;
			const author = 'websolute';
			*/
			// const id = uuid();
			// const src = `https://dummyimage.com/${width}x${height}/e2e6f6/2440c3/`;
			return {
				id,
				assetType: {
					id: assetType.id,
					name: assetType.name,
					model: assetType.model,
				},
				src,
				name,
				extension,
				width,
				height,
				author,
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

	private pictures$(): Observable<any[]> {
		return from(fetch(`assets/json/pictures.json`)
			.then(response => response.json())
			.then(responseJson => {
				return responseJson; // as YourType
			})
		);
	}

	isTypeOf(item: Definition, type: string): boolean {
		return toCamelCase(item.extend) === toCamelCase(type) || toCamelCase(item.model) === toCamelCase(type);
	}

	getSync(store, type: string, ofType?: string): any[] {
		// console.log('getSync', type, ofType);
		if (store[toCamelCase(type)]) {
			const items = store[toCamelCase(type)].filter(x => {
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

	getListSync(store, type: string, ofType?: string): any[] {
		return this.getSync(store, type, ofType).map(x => {
			return {
				id: x.id,
				name: x.name,
			};
		});
	}

}

