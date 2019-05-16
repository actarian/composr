import { Component, Input, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first } from 'rxjs/operators';
import { AssetEditComponent } from '../asset/asset-edit.component';
import { Asset, Field } from '../store/store';
import { TabState } from '../tabs/tab.service';

@Component({
	selector: 'content-item-component',
	templateUrl: 'content-item.component.html',
	styleUrls: ['content-item.component.scss'],
})
export class ContentItemComponent extends DisposableComponent implements OnInit {

	@Input() state: TabState;

	constructor(
		private modalService: ModalService,
	) {
		super();
	}

	ngOnInit() {

	}

	getSrc(asset: Asset): string {
		const w = 640;
		const h = Math.round(640 / asset.width * asset.height);
		const components = asset.src.split('/');
		components[components.length - 2] = w.toString();
		components[components.length - 1] = h.toString();
		return components.join('/');
	}

	onEditAsset(asset: any) {
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

}
