
import { Injectable } from '@angular/core';
import { ControlOption } from '@designr/control';
import { Entity, Identity, LocalStorageService } from '@designr/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CONTROL_MAP, Definition, Field } from './definition';
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
		return this.getReflection$(type).pipe(
			tap(x => console.log('getReflection', type, x))
		);
	}

	getDefinition(type: string): Observable<Definition> {
		return this.getDefinition$(type).pipe(
			tap(x => console.log('getDefinition', type, x))
		);
	}

	getDetail(type: string, id: number | string): Observable<any> {
		// console.log(type, id, this.store[type]);
		return this.getDetail$(type, id).pipe(
			tap(x => console.log('getDetail', type, id, x))
		);
	}

	getList(type: string, ofType?: string): Observable<any[]> {
		return this.getList$(type, ofType);
	}

	getTypes(type: string, ofType?: string): Observable<any[]> {
		return this.getTypes$(type, ofType);
	}

	getIndex(type: string): Observable<any[]> {
		return this.getIndex$(type);
	}

	patchDetail(type: string, model: Identity): Observable<any> {
		// console.log(type, id, this.store[type]);
		return this.patchDetail$(type, model);
	}

	patchField(type: string, id: number | string, model: Identity): Observable<any> {
		return this.patchField$(type, id, model);
	}

	patchAsset(type: string, id: number | string, model: Identity): Observable<any> {
		return this.patchAsset$(type, id, model);
	}

	addItem(type: string, model: any): Observable<any> {
		return this.addItem$(type, model);
	}

	addType(type: string, model: any): Observable<any> {
		return this.addType$(type, model);
	}

	isScalar(item: Field) {
		// console.log(item);
		return ['boolean', 'number', 'string', 'date'].indexOf(item.type) !== -1 || ['select'].indexOf(item.control) !== -1;
	}

	getFields(fields: Field[], ...names: string[]): Field[] {
		return fields.filter(x => names.indexOf(x.key) !== -1);
	}

	getScalarFields(fields: Field[]): Field[] {
		return fields.filter(x => x.visible && this.isScalar(x));
	}

	getNonScalarFields(fields: Field[]): Field[] {
		return fields.filter(x => x.visible && !this.isScalar(x));
	}

	getTabFields(fields: Field[]): Field[] {
		return fields.filter(x => x.visible && !this.isScalar(x) && x.control === 'tab');
	}

	getCreationFields(fields: Field[]): Field[] {
		return fields.filter(x => !x.primaryKey && x.required).map(x => {
			const field = Object.assign({}, x);
			field.editable = true;
			return field;
		});
	}

	mapSchema(field: Field): string {
		const schema = CONTROL_MAP[toCamelCase(field.type)];
		return schema || 'text';
	}

	mapOptions(fields: Field[]): ControlOption<any>[] {
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
					/*
					// !!! transform options in observable
					const options = this.getListSync(this.store, toCamelCase(x.model));
					console.log(x.model, options);
					options.unshift(
						{ id: null, name: 'select' }
					);
					option.options = options;
					*/
					option.options = this.getOptions$(x.model);
					option.asObject = x.type === 'object';
					break;
				case 'reflection':
					option.schema = 'select';
					option.options = this.getReflectionOptions$(x.model);
					option.asObject = x.type === 'object';
					break;
			}
			return option;
		});
		return options;
	}

	getReflectionOptions$(type: string): Observable<Entity[]> {
		return this.getList$('reflection', type).pipe(
			map(x => {
				console.log('reflection', type, x);
				x.unshift(
					{ id: null, name: 'select a value' }
				);
				return x;
			})
		);
	}

	getOptions$(type: string): Observable<Entity[]> {
		return this.getList$(type).pipe(
			map(x => {
				x.unshift(
					{ id: null, name: 'select a value' }
				);
				return x;
			})
		);
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

