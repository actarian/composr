import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { ActionItem, Column, FilterTypeEnum } from '../shared/table/table.component';
import { Item, TestService } from './test.service';

@Component({
	selector: 'test-component',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent extends DisposableComponent implements OnInit {

	items: Item[] = [];

	columns: Column[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'surname', label: 'Surname' },
		{ key: 'short', label: 'Short' },
		{ key: 'active', label: 'Active', filterType: FilterTypeEnum.Select },
		// { key: 'visible', label: 'Visible', filterType: FilterTypeEnum.Select },
		// { key: 'order', label: 'Order' }
	];

	actionItems: ActionItem[] = [{
		label: 'Delete', action: (items: Item[]): boolean => {
			console.log(items);
			return true;
		}
	}];

	constructor(
		private storeService: TestService,
	) {
		super();
	}

	ngOnInit() {
		this.storeService.get(10000).subscribe(items => this.items = items);
	}

}
