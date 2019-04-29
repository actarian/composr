
import { Injectable } from '@angular/core';
import { ControlOption } from '@designr/control';
import { Identity, LocalStorageService } from '@designr/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CONTROL_MAP, Definition } from './definition';
import { FakeService } from './fake.service';
import { toCamelCase } from './utils';

@Injectable({
	providedIn: 'root',
})
export class StoreService extends FakeService {

	constructor(
		protected storage: LocalStorageService,
	) {
		super(storage);
	}

	getReflection(type: string): Observable<Definition> {
		return of(this.store.reflection.find(x => toCamelCase(x.model) === type)).pipe(
			tap(x => console.log('getReflection', type, x))
		);
	}

	getDefinition(type: string): Observable<Definition> {
		return of(this.store.definition.find(x => toCamelCase(x.model) === toCamelCase(type))).pipe(
			tap(x => console.log('getDefinition', type, x))
		);
	}

	getDetail(type: string, id: number): Observable<any> {
		// console.log(type, id, this.store[type]);
		return of(this.store[type].find(x => x.id === id)).pipe(
			tap(x => console.log('getDetail', type, id, x))
		);
	}

	getTypes(type: string, ofType?: string): Observable<any[]> {
		return of(this.getSync(type, ofType).map(x => {
			return {
				id: x.id,
				name: x.name,
				key: toCamelCase(x.model),
			};
		}));
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

	patchDetail(type: string, model: Identity): Observable<any> {
		// console.log(type, id, this.store[type]);
		const item = this.store[type].find(x => x.id === model.id);
		Object.assign(item, model);
		this.storage.set('store', this.store);
		return of(item);
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
		const schema = CONTROL_MAP[toCamelCase(field.type)];
		return schema || 'text';
	}

	mapOptions(fields: Definition[]): ControlOption<any>[] {
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
					const options = this.getListSync(toCamelCase(x.model));
					console.log(x.model, options);
					options.unshift(
						{ id: null, name: 'select' }
					);
					option.options = options;
					option.asObject = x.type === 'object';
					break;
			}
			return option;
		});
		return options;
	}

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

}

