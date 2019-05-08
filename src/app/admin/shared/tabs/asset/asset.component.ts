import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent, Entity } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first, takeUntil } from 'rxjs/operators';
import { Asset, Field } from '../../store/store';
import { Column } from '../../table/table.component';
import { TabService, TabState } from '../tab.service';
import { AssetEditComponent } from './asset-edit.component';

@Component({
	selector: 'asset-component',
	templateUrl: 'asset.component.html',
	styleUrls: ['asset.component.scss'],
})
export class AssetComponent extends DisposableComponent implements OnInit {

	state: TabState;
	field: Field;

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

	getSrc(asset: Asset): string {
		const w = 640;
		const h = Math.round(640 / asset.width * asset.height);
		const components = asset.src.split('/');
		components[components.length - 2] = w.toString();
		components[components.length - 1] = h.toString();
		return components.join('/');
	}

	constructor(
		private route: ActivatedRoute,
		private tabService: TabService,
		private modalService: ModalService,
	) {
		super();
	}

	ngOnInit() {
		this.tabService.state$.pipe(
			first(),
		).subscribe(state => {
			// console.log('AssetComponent', state);
			this.state = state;
			this.route.params.pipe(
				takeUntil(this.unsubscribe),
			).subscribe(data => {
				const path = this.route.snapshot.url[0].path;
				const field = state.definition.fields.find(x => x.key === path);
				this.field = field;
			});
		});
	}

	onEditRow(asset: any) {
		// console.log('AssetComponent.onEditRow', asset);
		this.modalService.open({
			component: AssetEditComponent,
			data: {
				item: this.state.item,
				asset: asset,
			},
		}).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('AssetComponent.onEditRow.ModalCompleteEvent', e.data);
				Object.assign(asset, e.data as Field);
			}
		});
	}

	onDeleteRow(asset: any) {
		console.log('AssetComponent.onDeleteRow', asset);

	}

	onDropRow(assets: any[]) {
		// console.log('AssetComponent.onDropRow', assets);
		this.state.item.assets = assets;
	}

}
