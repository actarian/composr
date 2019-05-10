import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlOption } from '@designr/control';
import { BehaviorSubject } from 'rxjs';
import { Definition, Field } from '../store/store';
import { StoreService } from '../store/store.service';

export interface TabItem {
	slug: string;
	name: string;
	field: Definition;
}

export interface TabState {
	tabFields: TabItem[];
	type: string;
	id: number;
	definition: Definition;
	item: any;
	options: ControlOption<any>[];
	form: FormGroup;
	fields?: Field[];
	fieldOptions?: ControlOption<any>[][];
}

@Injectable({
	providedIn: 'root',
})
export class TabService {

	state$: BehaviorSubject<TabState> = new BehaviorSubject<TabState>(null);

	constructor(
		private storeService: StoreService
	) {
	}

	setState(state: TabState) {
		this.state$.next(state);
	}

	getTabs(definition: Definition): TabItem[] {
		const fields = this.storeService.getTabFields(definition.fields);
		const tabs = fields.map(x => {
			return {
				slug: x.key,
				name: x.name,
				field: x
			};
		});
		const detail = Object.assign({}, definition) as Field;
		detail.key = 'detail';
		tabs.unshift({
			slug: 'detail',
			name: 'Detail',
			field: detail,
		});
		return tabs;
	}

}
