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
		// { key: 'fullname', label: 'Fullname', getter: (row: any, col: Column) => `${row.name} ${row.surname}` },
		{ key: 'id', label: 'Id' },
		{ key: 'title', label: 'Title' },
		{ key: 'pageType', label: 'Page Type' },
		{ key: 'template', label: 'Template' },
		/*
		{ key: 'category', label: 'Category' },
		{ key: 'market', label: 'Market' },
		*/
		{ key: 'active', label: 'Active', filterType: FilterTypeEnum.Select },
		// { key: 'visible', label: 'Visible', filterType: FilterTypeEnum.Select },
		// { key: 'order', label: 'Order' }
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
