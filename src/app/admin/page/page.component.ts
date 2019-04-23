import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { StoreService } from '../core/store.service';
import { ActionItem, Column, FilterTypeEnum } from '../shared/table/table.component';

@Component({
	selector: 'page-component',
	templateUrl: 'page.component.html',
	styleUrls: ['page.component.scss'],
})
export class PageComponent extends DisposableComponent implements OnInit {

	items: any[] = [];

	columns: Column[] = [
		// { key: 'fullname', name: 'Fullname', getter: (row: any, col: Column) => `${row.name} ${row.surname}` },
		{ key: 'id', name: 'Id' },
		{ key: 'title', name: 'Title' },
		{ key: 'pageType', name: 'Page Type' },
		{ key: 'template', name: 'Template' },
		/*
		{ key: 'category', name: 'Category' },
		{ key: 'market', name: 'Market' },
		*/
		{ key: 'active', name: 'Active', filterType: FilterTypeEnum.Select },
		// { key: 'visible', name: 'Visible', filterType: FilterTypeEnum.Select },
		// { key: 'order', name: 'Order' }
	];

	actionItems: ActionItem[] = [{
		label: 'Delete', action: (items: any[]): boolean => {
			// console.log(items);
			return true;
		}
	}];

	constructor(
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.storeService.getList('page').subscribe(items => this.items = items);
	}

}
