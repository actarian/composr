

import { Injectable } from '@angular/core';
import { ControlOption } from '@designr/control';
import { Identity, LocalStorageService } from '@designr/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CONTROL_MAP, Definition, DEFINITIONS, REFLECTIONS } from './definition';
import { getIpsum } from './ipsum';

let UID = 100;

@Injectable({
	providedIn: 'root',
})
export class StoreService {

	// store as observable?
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
						const item: any = {};
						item.model = x.model;
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

	patchDetail(type: string, model: Identity): Observable<any> {
		// console.log(type, id, this.store[type]);
		const item = this.store[type].find(x => x.id === model.id);
		Object.assign(item, model);
		this.storage.set('store', this.store);
		return of(item);
	}

	getReflection(type: string): Observable<Definition> {
		return of(this.store.reflection.find(x => this.toCamelCase(x.model) === type));
	}

	getDefinition(type: string): Observable<Definition> {
		return of(this.store.definition.find(x => this.toCamelCase(x.model) === type));
	}

	addItem(type: string, model: any): Observable<any> {
		const item = this.createItem(type, model);
		return of(item);
	}

	addType(type: string, model: any): Observable<any> {
		const item = this.createType(type, model);
		return of(item);
	}

	isScalar(item: Definition) {
		// console.log(item);
		return ['boolean', 'number', 'string', 'date'].indexOf(item.type) !== -1 || ['select'].indexOf(item.control) !== -1;
	}

	isTypeOf(item: Definition, type: string): boolean {
		return this.toCamelCase(item.extend) === type || this.toCamelCase(item.model) === type;
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

	getFields(fields: Definition[], ...names: string[]): Definition[] {
		return fields.filter(x => names.indexOf(x.key) !== -1);
	}

	getScalarFields(fields: Definition[]): Definition[] {
		return fields.filter(x => x.visible && this.isScalar(x));
	}

	getNonScalarFields(fields: Definition[]): Definition[] {
		return fields.filter(x => x.visible && !this.isScalar(x));
	}

	getTabFields(fields: Definition[]): Definition[] {
		return fields.filter(x => x.visible && !this.isScalar(x) && x.control === 'tab');
	}

	getCreationFields(fields: Definition[]): Definition[] {
		return fields.filter(x => !x.primaryKey && x.required).map(x => {
			const field = Object.assign({}, x);
			field.editable = true;
			return field;
		});
	}

	mapSchema(field: Definition): string {
		const schema = CONTROL_MAP[this.toCamelCase(field.type)];
		return schema || 'text';
	}

	mapOptions(fields: Definition[]): ControlOption<any>[] {
		console.log('mapOptions', fields);
		const options = fields.map(x => {
			const schema = x.control || this.mapSchema(x);
			const option: any = {
				key: x.key,
				schema: schema,
				label: x.key,
				placeholder: x.description || x.key,
				disabled: !x.editable || x.primaryKey,
				required: x.required,
			};
			switch (schema) {
				case 'select':
					console.log(x.model);
					const options = this.getSync(this.toCamelCase(x.model)).map(x => {
						return { value: x.id, label: x.name };
					});
					options.unshift(
						{ value: null, label: 'select' }
					);
					console.log(options);
					option.options = options;
					break;
			}
			return option;
		});
		return options;
	}

	//

	getChangedValues(original: any, patched: any): any {
		if (patched) {
			const originalType = Array.isArray(original) ? 'array' : typeof original;
			const patchedType = Array.isArray(patched) ? 'array' : typeof patched;
			if (patchedType !== originalType) {
				return patched;
			} else if (originalType === 'array') {
				let didChange = false;
				if (patched.length !== original.length) {
					didChange = true;
				} else {
					didChange = patched.reduce((p, c, i) => {
						return p || (this.getChangedValues(original[i], patched[i]) || false);
					}, false);
				}
				return didChange ? patched : null; // ???
			} else if (originalType === 'object') {
				const values = {};
				Object.keys(patched).forEach(x => {
					const value = this.getChangedValues(original[x], patched[x]);
					if (value) {
						values[x] = value;
					}
				});
				return Object.keys(values).length ? values : null;
			} else {
				return patched !== original ? patched : null;
			}
		}
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
			store.component = [];
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
				const component = this.toTitleCase(x.model) + 'Component';
				store.component.push(
					{ id: definition.id, name: component, path: component.toLowerCase() + '.cshtml' }
				);
			});
			store.page = this.createPages(1000);
			pageReflections.forEach((x, i) => {
				if (x.model !== 'Page') {
					const key = this.toCamelCase(x.model);
					// console.log(key, x.id);
					store[key] = store.page.filter(x => this.toCamelCase(x.type) === key).map(x => Object.assign({}, x));
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
			const isDetail = pageType.name.indexOf('Detail') !== -1;
			if (!isDetail) {
				pageTypes.splice(pageTypes.indexOf(pageType), 1);
			}
			let name = pageType.name + (isDetail ? ` ${id}` : ``);
			name = name.toLowerCase().replace(/\s/g, '-');
			const title = getIpsum(5);
			const abstract = getIpsum(12);
			const description = getIpsum(50);
			const component = this.toTitleCase(pageType.name) + 'Component';
			const componentId = this.store.component.find(x => x.name === component).id;
			const model = this.toCamelCase(pageType.name);
			return {
				id,
				name,
				title,
				abstract,
				description,
				component,
				componentId,
				model,
				//
				typeId: pageType.id,
				type: pageType.name,
				//
				// type: pageType.model,
				// pageTypeId: pageType.id,
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

	createItem(type: string, model: any): any {
		// const definition = this.store.definition.find(x => this.toCamelCase(x.model) === type);
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

