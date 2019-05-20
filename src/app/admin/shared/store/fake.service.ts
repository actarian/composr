
import { Injectable } from '@angular/core';
import { Entity, Identity, LocalStorageService } from '@designr/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { getIpsum } from './ipsum';
import { Asset, Content, ContentPicture, Definition, DEFINITIONS, Field, Meta, Page, REFLECTIONS, STORE } from './store';
import { some, toCamelCase, toTitleCase } from './utils';

const VERSION = 1;
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
			if (store.UID && store.UID[1] && store.UID[1] === VERSION) {
				UID = store.UID[0];
				this.store_.next(store);
			} else {
				return this.createStore$;
			}
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

	/*
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
	*/

	getDefinitionListOfType$(type: string): Observable<Entity[]> {
		return this.getDefinitionsOfType$(type).pipe(
			map(items => this.toList(items.filter(x => x.extend !== 'Entity')))
		);
	}

	getDefinitionsOfType$(type: string): Observable<Definition[]> {
		return this.store$.pipe(
			map(store => {
				return store.definition.filter(x => toCamelCase(x.model) === toCamelCase(type) || toCamelCase(x.extend) === toCamelCase(type));
			})
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

	getDefinitionById$(id: number): Observable<Definition> {
		return this.store$.pipe(
			map(store => {
				const definition = store.definition.find(x => toCamelCase(x.model) === toCamelCase('Definition'));
				return store.definition.find(x => x.id === id) || definition; // return base definition if undefined
			})
		);
	}

	getIndexById$(id: number): Observable<any[]> {
		return this.getDefinitionById$(id).pipe(
			switchMap(definition => {
				// console.log(definition);
				return this.store$.pipe(
					map(store => {
						let items = [];
						if (definition) {
							items = store[toCamelCase(definition.model)];
							if (!items) {
								items = store[toCamelCase(definition.extend)];
								items = items.filter(x => x.type.id === id);
							}
							items = items.map(x => {
								const item: any = {};
								item.model = x.model || definition.model;
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

	getReflection$(type: string): Observable<Definition> {
		return this.store$.pipe(
			map(store => {
				return store.reflection.find(x => toCamelCase(x.model) === toCamelCase(type));
			})
		);
	}

	getDetail$(baseModel: string, model: string, id: number | string) {
		// console.log('FakeService.getDetail$', baseModel, model, id);
		return this.store$.pipe(
			map(store => {
				const collection = store[toCamelCase(model)] || store[toCamelCase(baseModel)];
				return collection.find(x => x.id === id);
			})
		);
	}

	addItem$(typeId: number, model: any): Observable<any> {
		// console.log('FakeService.addItem$', typeId, model);
		return of(this.store).pipe(
			map(store => {
				const definition = this.store.definition.find(x => x.id === typeId);
				// console.log(definition.model);
				const collection = store[toCamelCase(definition.model)] || store[toCamelCase(definition.extend)];
				const item = Object.assign({}, model);
				item.id = UID++;
				item.model = definition.model;
				collection.push(item);
				store.UID[0] = UID;
				this.store = store;
				return item;
			})
		);
	}

	addDefinition$(definitionModel: string, typeModel: string, item: any): Observable<any> {
		// console.log('FakeService.addDefinition$', definitionModel, typeModel, item);
		return of(this.store).pipe(
			map(store => {
				const reflection = store.reflection.find(x => toCamelCase(x.model) === toCamelCase(item.model));
				const baseDefinition = store.definition.find(x => toCamelCase(x.model) === toCamelCase(typeModel));
				const definition = Object.assign({}, reflection);
				// console.log(reflection);
				definition.id = UID++;
				definition.name = item.name;
				definition.extend = typeModel;
				definition.model = item.model;
				store.definition.push(definition);
				store.UID[0] = UID;
				this.store = store;
				return definition;
			})
		);
	}

	patch(source, target) {
		if (Array.isArray(target)) {
			return target.map((x, i) => this.patch(source.length > i ? source[i] : x, x));
		} else if (target && typeof target === 'object') {
			Object.keys(target).forEach(x => {
				source[x] = this.patch(source[x], target[x]);
			});
			return source;
		} else {
			return target;
		}
	}

	patchDetail$(type: string, model: Identity): Observable<any> {
		return of(this.store).pipe(
			map(store => {
				const item = store[toCamelCase(type)].find(x => x.id === model.id);
				const patched = this.patch(item, model);
				// console.log(patched);
				// Object.assign(item, patched);
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

	private createIds_(collection: Identity[]) {
		collection.forEach(x => x.id = UID++);
	}

	private createStore_() {
		return this.pictures$().pipe(
			switchMap(pictures => {
				const store = Object.assign({}, STORE);
				Object.keys(store).forEach(x => this.createIds_(store[x]));
				store.reflection = REFLECTIONS;
				store.definition = DEFINITIONS;
				store.component = [];
				const pageTypeDefinition = store.definition.find(x => x.model === 'PageType');
				// pageTypeDefinition.fields.forEach(x => x.id = UID++);
				const pageDefinition = store.definition.find(x => x.model === 'Page');
				// pageDefinition.fields.forEach(x => x.id = UID++);
				const pageReflections = this.getSync(store, 'reflection', 'Page');
				pageReflections.forEach(x => {
					const definitionType = Object.assign({}, pageTypeDefinition);
					// console.log(definition);
					/*
					if (x.model !== 'Page') {
						const model = x.model + 'Type';
						definitionType.name = model;
						definitionType.model = model;
						definitionType.extend = 'PageType';
						definitionType.fields = definitionType.fields.slice();
						store.definition.push(definitionType);
					}
					*/
					const definition = Object.assign({}, pageDefinition);
					// console.log(definition);
					if (x.model !== 'Page') {
						definition.name = x.model;
						definition.model = x.model;
						definition.extend = 'Page';
						definition.fields = pageDefinition.fields.slice();
						store.definition.push(definition);
					}
				});
				this.createIds_(store.definition);
				store.definition.forEach(x => this.createIds_(x.fields));
				store.definition.filter(x => x.model === 'Page' || x.extend === 'Page').forEach(x => {
					const component = toTitleCase(x.model) + 'Component';
					store.component.push({
						id: UID++, name: component, path: component.toLowerCase() + '.cshtml', types: [{
							id: x.id, name: x.name, model: x.model,
						}]
					});
				});
				// store.pageType = store.definition.filter(x => x.model === 'Page' || x.extend === 'Page');
				// this.createIds_(store.pageType);
				store.asset = this.createAssets_(store, pictures, 500);
				store.meta = this.createMeta_(store, 100);
				store.content = this.createContents_(store, 100);
				store.page = this.createPages_(store, 100);
				/*
				pageReflections.forEach((x, i) => {
					if (x.model !== 'Page') {
						const key = toCamelCase(x.model);
						store[key] = store.page.filter(p => p.model === x.model);
					}
				});
				*/
				store.UID = [UID, VERSION];
				this.store = store;
				return this.store_;
			})
		);
	}

	private createAssets_(store, pictures, count: number = 100): Asset[] {
		// const count = 1 + Math.floor(Math.random() * 5);
		const widths = [1920, 1600, 1280, 960];
		const heights = [1080, 960, 720, 640, 480];
		const type = store.definition.find(x => x.model === 'Asset');
		return new Array(count).fill(null).map((x, i) => {
			const picture = pictures[Math.floor(Math.random() * pictures.length)];
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
			const asset = {
				id,
				type: {
					id: type.id,
					name: type.name,
					model: type.model,
				},
				src,
				name,
				extension,
				width,
				height,
				author,
				active: Math.random() > 0.5
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
			return asset;
		});
	}

	private createMeta_(store, count: number = 100): Meta[] {
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			const model = 'Meta';
			let name = `${model} ${id}`;
			name = name.toLowerCase().replace(/\s/g, '-');
			const title = getIpsum(5);
			const description = getIpsum(12);
			const keywords = getIpsum(5).toLowerCase().replace(/\s/g, ', ');
			const item = {
				id,
				title: [{ code: 'en', text: title }],
				description: [{ code: 'en', text: description }],
				keywords: [{ code: 'en', text: keywords }],
			};
			return item;
		});
	}

	private createContents_(store, count: number = 100): Content[] {
		const types = store.definition.filter(x => x.extend === 'Content');
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			// console.log(JSON.parse(JSON.stringify(types)));
			const type = types[Math.floor(Math.random() * types.length)];
			const model = type.model;
			let name = `${model} ${id}`;
			name = name.toLowerCase().replace(/\s/g, '-');
			const title = getIpsum(5);
			const abstract = getIpsum(12);
			const description = getIpsum(50);
			const componentName = model + 'Component';
			// const component = store.component.find(x => x.name === componentName);
			// console.log(type.model, model);
			const item = {
				id,
				model,
				type: {
					id: type.id,
					name: type.name,
					model: type.model,
				},
				/*
				component: {
					id: component.id,
					name: component.name,
					model: component.model,
				},
				*/
				name,
				title: [{ code: 'en', text: title }],
				abstract: [{ code: 'en', text: abstract }],
				description: [{ code: 'en', text: description }],
				active: Math.random() > 0.5
			};
			if (type.fields.find(x => x.key === 'assets') !== undefined) {
				(item as ContentPicture).assets = some(store.asset, 6);
			}
			return item;
		});
	}

	private createPages_(store, count: number = 100): Page[] {
		const types = store.definition.filter(x => x.model === 'Page' || x.extend === 'Page');
		// console.log(types);
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			// console.log(JSON.parse(JSON.stringify(types)));
			const type = types[Math.floor(Math.random() * types.length)];
			const isSingleton = type.name.indexOf('Detail') === -1;
			if (isSingleton) {
				types.splice(types.indexOf(type), 1);
			}
			const model = type.model;
			let name = model + (isSingleton ? `` : ` ${id}`);
			name = name.toLowerCase().replace(/\s/g, '-');
			const title = getIpsum(5);
			const abstract = getIpsum(12);
			const description = getIpsum(50);
			const meta = store.meta[i];
			const componentName = model + 'Component';
			const component = store.component.find(x => x.name === componentName);
			return {
				id,
				model,
				type: {
					id: type.id,
					name: type.name,
					model: type.model,
				},
				component: {
					id: component.id,
					name: component.name,
					model: component.model,
				},
				name,
				title: [{ code: 'en', text: title }],
				abstract: [{ code: 'en', text: abstract }],
				description: [{ code: 'en', text: description }],
				meta,
				slug: 'slug',
				active: Math.random() > 0.5,
				contents: some(store.content, 4),
				assets: some(store.asset, 6),
				related: [],
				features: [],
				taxonomies: [],
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

	toList(collection: any[]): Entity[] {
		return collection.map(x => {
			return {
				id: x.id,
				name: x.name,
			};
		});
	}

}

