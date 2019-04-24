

import { Injectable } from '@angular/core';
import { LocalStorageService } from '@designr/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CONTROL_MAP, Definition, DEFINITIONS, REFLECTIONS } from './definition';

let UID = 100;

@Injectable({
	providedIn: 'root',
})
export class StoreService {

	store: { [key: string]: any };

	constructor(
		private storage: LocalStorageService,
	) {
		this.createStore();
	}

	getList(type: string, ofType?: string): Observable<any[]> {
		return of(this.getListSync(type, ofType));
	}

	getIndex(type: string): Observable<any[]> {
		return this.getDefinition(type).pipe(
			switchMap(definition => {
				if (definition) {
					return of(this.store[type].map(x => {
						const item = {};
						definition.fields.forEach(field => {
							if (field.primaryKey || field.indexable) {
								item[field.key] = x[field.key];
							}
						});
						return item;
					}));
				} else {
					return of(this.store[type]);
				}
			})
		);
	}

	getDetail(type: string, id: number): Observable<any> {
		// console.log(type, id, this.store[type]);
		return of(this.store[type].find(x => x.id === id));
	}

	getReflection(type: string): Observable<Definition> {
		return of(this.store.reflection.find(x => this.toCamelCase(x.model) === type));
	}

	getDefinition(type: string): Observable<Definition> {
		return of(this.store.definition.find(x => this.toCamelCase(x.model) === type));
	}

	getControlWithType(type: string): string {
		const schema = CONTROL_MAP[this.toCamelCase(type)];
		return schema || 'text';
	}

	addType(type: string, model: any): Observable<any> {
		const item = this.createType(type, model);
		return of(item);
	}

	isScalar(item: Definition) {
		// console.log(item);
		return ['boolean', 'number', 'string', 'date'].indexOf(item.type) !== -1;
	}

	isTypeOf(item: Definition, type: string): boolean {
		return this.toCamelCase(item.extend) === type; // this.toCamelCase(item.model) === type ||
	}

	toCamelCase(text: string): string {
		return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
			if (+match === 0) {
				return ''; // or if (/\s+/.test(match)) for white spaces
			}
			return index === 0 ? match.toLowerCase() : match.toUpperCase();
		});
	}

	toTitleCase(text: string): string {
		return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
			if (+match === 0) {
				return ''; // or if (/\s+/.test(match)) for white spaces
			}
			return match.toUpperCase();
		});
	}

	//

	getSync(type: string, ofType?: string): any[] {
		// console.log('getSync', type, ofType);
		const items = this.store[type].filter(x => {
			return ofType ? this.isTypeOf(x, 'page') : x;
		});
		items.sort((a, b) => {
			return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
		});
		return items;
	}

	getListSync(type: string, ofType?: string): any[] {
		return this.getSync(type, ofType).map(x => {
			return {
				id: x.id,
				name: x.name,
				key: this.toCamelCase(x.model),
			};
		});
	}

	//

	createStore() {
		let store = this.storage.get('store');
		if (!store) {
			store = {};
			this.store = store;
			store.reflection = REFLECTIONS.map(x => Object.assign({}, x));
			store.definition = DEFINITIONS.map(x => Object.assign({}, x));
			const pageDefinition = store.definition.find(x => this.toCamelCase(x.model) === 'page');
			const pageReflections = this.getSync('reflection', 'page');
			pageReflections.forEach(x => {
				const definition = Object.assign({}, pageDefinition);
				// console.log(definition);
				if (x.model !== 'Page') {
					definition.id = UID++;
					definition.key = this.toCamelCase(x.model);
					definition.name = x.model;
					definition.model = x.model;
					definition.extend = 'Page';
					definition.fields = pageDefinition.fields.slice().map(x => Object.assign({}, x));
					store.definition.push(definition);
				}
			});
			store.page = this.createPages(1000);
			pageReflections.forEach(x => {
				if (x.model !== 'Page') {
					const key = this.toCamelCase(x.model);
					// console.log(key, x.id);
					store[key] = store.page.filter(x => this.toCamelCase(x.type) === key);
				}
			});
			this.storage.set('store', store);
		}
		this.store = store;
	}

	createPages(count: number = 100): any[] {
		const pageTypes = this.getSync('definition', 'page');
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			const pageType = pageTypes[Math.floor(Math.random() * pageTypes.length)];
			const title = pageType.name + (pageType.name.indexOf('Detail') !== -1 ? ` ${id}` : ``);
			const name = title.toLowerCase().replace(/\s/g, '-');
			return {
				id,
				name,
				title,
				//
				type: pageType.model,
				pageType: pageType.name,
				pageTypeId: pageType.id,
				//
				template: pageType.name,
				templateId: 100 + pageType.id,
				//
				category: pageType.name,
				categoryId: 200 + pageType.id,
				//
				market: 'en',
				marketId: 1,
				//
				active: Math.random() > 0.5,
				visible: Math.random() > 0.5,
				order: Math.floor(Math.random() * 100000),
				actions: [],
			};
		});
	}

	createType(type: string, model: any): any {
		const definitions = this.store.definitions;
		const pageDefinition = definitions.find(x => this.toCamelCase(x.model) === 'page');
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

}

