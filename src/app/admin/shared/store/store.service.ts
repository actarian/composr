
import { Injectable } from '@angular/core';
import { ControlOption } from '@designr/control';
import { ControlSelectOption } from '@designr/control/lib/control/select/control-select';
import { Entity, Identity, LocalStorageService } from '@designr/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FakeService } from './fake.service';
import { CONTROL_MAP, Definition, Field } from './store';
import { toCamelCase } from './utils';

export const FLAG_OPTIONS: ControlSelectOption[] = [{ id: null, name: 'All' }, { id: true, name: 'Yes' }, { id: false, name: 'No' }];
export const SCALAR_TYPES: string[] = ['boolean', 'date', 'number', 'string'];
export const SCALAR_CONTROLS: string[] = ['definition', 'localized-text', 'localized-textarea', 'multi', 'select', 'reflection'];

@Injectable({
	providedIn: 'root',
})
export class StoreService extends FakeService {

	constructor(
		protected storage: LocalStorageService,
	) {
		super(storage);
	}

	/*
	getReflection(type: string): Observable<Definition> {
		return this.getReflection$(type).pipe(
			// tap(x => console.log('getReflection', type, x))
		);
	}
	*/

	getDefinition(type: string): Observable<Definition> {
		return this.getDefinition$(type).pipe(
			// tap(x => console.log('getDefinition', type, x))
		);
	}

	getIndex(type: string): Observable<any[]> {
		return this.getIndex$(type);
	}

	getDefinitionById(id: number): Observable<Definition> {
		return this.getDefinitionById$(id).pipe(
			// tap(x => console.log('getDefinition', type, x))
		);
	}

	getIndexById(id: number): Observable<any[]> {
		return this.getIndexById$(id);
	}

	getDetail(typeId: number | string, id: number | string): Observable<any> {
		return this.getDetail$(typeId, id).pipe(
			tap(x => console.log('getDetail', typeId, id, x))
		);
	}

	/*
	getList(type: string, ofType?: string): Observable<any[]> {
		return this.getList$(type, ofType);
	}
	*/

	getDefinitionsOfType(type: string): Observable<Definition[]> {
		return this.getDefinitionsOfType$(type);
	}

	patchItem(typeId: number | string, item: Identity): Observable<any> {
		// console.log(type, id, this.store[type]);
		return this.patchItem$(typeId, item);
	}

	patchDetail(typeId: number | string, item: Identity): Observable<any> {
		// console.log(type, id, this.store[type]);
		return this.patchDetail$(typeId, item);
	}

	patchDefinition(typeId: number | string, item: Identity): Observable<any> {
		// console.log(type, id, this.store[type]);
		return this.patchDefinition$(typeId, item);
	}

	patchField(typeModel: string, id: number | string, item: Identity): Observable<any> {
		return this.patchField$(typeModel, id, item);
	}

	/*
	patchItemAsset(typeId: number | string, id: number | string, item: Identity): Observable<any> {
		return this.patchItemAsset$(typeId, id, item);
	}
	*/

	patchAsset(typeId: number | string, item: Identity): Observable<any> {
		return this.patchAsset$(typeId, item);
	}

	addItem(typeId: number | string, item: any): Observable<any> {
		return this.addItem$(typeId, item);
	}

	addDefinition(definitionModel: string, typeModel: string, item: any): Observable<any> {
		return this.addDefinition$(definitionModel, typeModel, item);
	}

	isScalar(item: Field) {
		// console.log(item);
		return SCALAR_TYPES.indexOf(item.type) !== -1 || SCALAR_CONTROLS.indexOf(item.control) !== -1;
	}

	getFields(fields: Field[], ...names: string[]): Field[] {
		return fields.filter(x => names.indexOf(x.key) !== -1);
	}

	getVisibleFields(fields: Field[]): Field[] {
		return fields.filter(x => x.visible);
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

	mapOptions(fields: Field[], overrides?: { [key: string]: any }): ControlOption<any>[] {
		const options = fields.map(x => {
			const schema = x.control || this.mapSchema(x);
			const option: any = {
				key: x.key,
				schema: schema,
				label: x.key,
				placeholder: x.description || x.key,
				disabled: !x.editable || x.primaryKey,
				required: x.required,
				//
				type: x.type,
				primaryKey: x.primaryKey,
			};
			// console.log(x);
			switch (schema) {
				case 'select':
					/*
					// !!! transform options in observable
					const options = this.getListSync(this.store, toCamelCase(x.model));
					// console.log(x.model, options);
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
				case 'definition':
					option.schema = 'select';
					option.options = this.getDefinitionOptions$(x.model);
					option.asObject = x.type === 'object';
					break;
				case 'multi':
					option.options = this.getDefinitionOptions$(x.model); // !!! definition
					break;
				case 'localized-text':
				case 'localized-textarea':
					option.options = this.getLanguageOptions$('Language');
					break;
			}
			if (overrides && overrides[x.key]) {
				Object.assign(option, overrides[x.key]);
				// console.log(option);
			}
			return option;
		});
		return options;
	}

	mapTableOptions(fields: Field[]): ControlOption<any>[] {
		const options = this.mapOptions(fields).map((option: any) => {
			switch (option.schema) {
				case 'select':
				case 'reflection':
				case 'definition':
				case 'multi':
					option.schema = 'select';
					option.asObject = false;
					break;
				case 'switch':
					option.schema = 'select';
					option.options = FLAG_OPTIONS;
					option.asObject = false;
					break;
				case 'localized-text':
				case 'localized-textarea':
					option.schema = 'text';
					break;
			}
			option.disabled = false;
			option.required = false;
			return option;
		});
		return options;
	}

	getReflectionOptions$(type: string): Observable<Entity[]> {
		return this.getList$('reflection', type).pipe(
			// tap(x => console.log('getReflectionOptions$', type, x)),
			map(x => {
				// console.log('reflection', type, x);
				x.unshift(
					{ id: null, name: 'select a value' }
				);
				return x;
			})
		);
	}

	getDefinitionList(type: string): Observable<Entity[]> {
		return this.getDefinitionListOfType$(type);
	}

	getDefinitionOptions$(type: string): Observable<Entity[]> {
		return this.getDefinitionListOfType$(type).pipe(
			tap(x => console.log('getDefinitionOptions$', type, x)),
			map(x => {
				// console.log('reflection', type, x);
				x.unshift(
					{ id: null, name: 'select a value' }
				);
				return x;
			}),
			tap(x => console.log('getDefinitionOptions', x))
		);
	}

	getLanguageOptions$(type: string): Observable<Entity[]> {
		return this.get$(type).pipe(
			// tap(x => console.log('getLanguageOptions$', type, x)),
			map(x => {
				// console.log('reflection', type, x);
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

