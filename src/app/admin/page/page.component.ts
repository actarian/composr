import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { ActionItem, Column, FilterTypeEnum } from '../shared/table/table.component';
import { DataService, Item, PageRow } from './data.service';

@Component({
	selector: 'page-component',
	templateUrl: 'page.component.html',
	styleUrls: ['page.component.scss'],
})
export class PageComponent extends DisposableComponent implements OnInit {

	items: PageRow[] = [];

	columns: Column[] = [
		// { key: 'fullname', label: 'Fullname', getter: (row: any, col: Column) => `${row.name} ${row.surname}` },
		{ key: 'id', label: 'Id' },
		{ key: 'title', label: 'Title' },
		{ key: 'pageType', label: 'Page Type' },
		{ key: 'template', label: 'Template' },
		{ key: 'category', label: 'Category' },
		{ key: 'market', label: 'Market' },
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
		private dataService: DataService,
	) {
		super();
	}

	ngOnInit() {
		this.dataService.get(10000).subscribe(items => this.items = items);
	}

}
