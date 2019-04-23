

import { Injectable } from '@angular/core';
import { LocalStorageService } from '@designr/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CONTROL_MAP, Definition, DEFINITIONS, REFLECTIONS } from './definition';
import { DATAS } from './store';

let UID = 1;

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

	getList(type: string): Observable<any[]> {
		console.log(type);
		return of(this.store[type].map(x => {
			return {
				id: x.id,
				name: x.name,
			};
		}));
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
		return of(this.store.reflection.find(x => x.key === type));
	}

	getDefinition(type: string): Observable<Definition> {
		return of(this.store.definition.find(x => x.key === type));
	}

	getControlWithType(type: string): string {
		const schema = CONTROL_MAP[type];
		return schema || 'text';
	}

	addType(type: string, model: any): Observable<any> {
		const item = this.createType(type, model);
		return of(item);
	}

	isScalar(item: Definition) {
		console.log(item);
		return ['boolean', 'number', 'string', 'date'].indexOf(item.type) !== -1;
	}

	//

	createStore() {
		let store = this.storage.get('store');
		if (!store) {
			store = {};
			store.reflection = REFLECTIONS.map(x => Object.assign({}, x));
			store.definition = DEFINITIONS.map(x => Object.assign({}, x));
			const pageDefinition = store.definition.find(x => x.key === 'page');
			DATAS.pagetype.forEach(x => {
				const definition = Object.assign({}, pageDefinition);
				definition.id = store.definition.length;
				definition.key = x.name.toLowerCase();
				definition.name = x.name;
				store.definition.push(definition);
			});
			store.page = this.createPages(10000);
			this.storage.set('store', store);
		}
		this.store = store;
	}

	createPages(count: number = 100): any[] {
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			const pageType = DATAS.pagetype[Math.floor(Math.random() * DATAS.pagetype.length)];
			const title = pageType.name + (pageType.isIndex ? `` : ` ${id}`);
			const name = title.toLowerCase().replace(/\s/g, '-');
			return {
				id,
				name,
				title,
				//
				type: pageType.name,
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
		const pageDefinition = definitions.find(x => x.key === 'page');
		const definition = Object.assign({}, pageDefinition);
		definition.id = definitions.length;
		definition.key = model.name.toLowerCase();
		definition.name = model.name;
		definitions.push(definition);
		this.storage.set('store', this.store);
		return definition;
	}

}

