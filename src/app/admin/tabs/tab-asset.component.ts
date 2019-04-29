import { Component, OnInit } from '@angular/core';
import { DisposableComponent, Entity } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { Column } from '../shared/table/table.component';
import { TabService, TabState } from './tab.serice';

@Component({
	selector: 'tab-asset-component',
	templateUrl: 'tab-asset.component.html',
	styleUrls: ['tab-asset.component.scss'],
})
export class TabAssetComponent extends DisposableComponent implements OnInit {

	state: TabState;

	modes: Entity[] = [{
		id: 1,
		name: 'Grid'
	}, {
		id: 2,
		name: 'List'
	}];

	mode: number = 1;

	columns: Column[] = [
		{ key: 'src', name: 'Src' },
		{ key: 'name', name: 'Name' },
		{ key: 'extension', name: 'Extension' },
		{
			key: 'size', name: 'Size', getter: (row: any, col: Column) => {
				return `${row.width}x${row.height}`;
			}
		}
	];

	constructor(
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		this.tabService.state$.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(state => {
			console.log('TabAssetComponent', state);
			this.state = state;
		});
	}

	onEditRow(row: any) {

	}

	onDeleteRow(row: any) {

	}

	onDropRow(items: any[]) {
		console.log('TabAssetComponent.onDropRow', items);
		this.state.item.assets = items;
	}

}
