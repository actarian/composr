

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Definition, DETAIL_DEFINITION, INDEX_DEFINITION, REFLECTION } from './definition';


export const CONTROL_MAP: { [key: string]: string } = {
	'boolean': 'checkbox',
	'string': 'text',
	'object': 'select',
	'array': 'text', // list
};

@Injectable({
	providedIn: 'root',
})
export class DefinitionService {

	getControlWithType(type: string): string {
		const schema = CONTROL_MAP[type];
		return schema || 'text';
	}

	getReflection(type: string): Observable<Definition[]> {
		return of(REFLECTION[type]);
	}

	getIndexDefinition(type: string): Observable<Definition> {
		return of(INDEX_DEFINITION[type]);
	}

	getDetailDefinition(type: string): Observable<Definition> {
		return of(DETAIL_DEFINITION[type]);
	}

}
