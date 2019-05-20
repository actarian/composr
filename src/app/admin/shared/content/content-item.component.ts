import { Component, Input, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first } from 'rxjs/operators';
import { AssetEditComponent } from '../asset/asset-edit.component';
import { EditComponent } from '../edit/edit.component';
import { Asset, Content, Definition, Field } from '../store/store';
import { StoreService } from '../store/store.service';
import { TabState } from '../tabs/tab.service';

@Component({
	selector: 'content-item-component',
	templateUrl: 'content-item.component.html',
	styleUrls: ['content-item.component.scss'],
})
export class ContentItemComponent extends DisposableComponent implements OnInit {

	@Input() state?: TabState;
	@Input() item?: any;

	definition: Definition;
	fields: Field[];

	constructor(
		private modalService: ModalService,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		if (!this.item && this.state) {
			this.item = this.state.item;
		} else {
			this.storeService.getDefinitionById(this.item.type.id).pipe(
				first(),
			).subscribe(definition => {
				this.definition = definition;
				this.fields = this.storeService.getVisibleFields(this.definition.fields);
			});
		}
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
		// console.log('ContentItemComponent.onEditAsset', asset);
		this.modalService.open({
			component: AssetEditComponent,
			data: {
				item: this.item,
				asset: asset,
			},
		}).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('ContentItemComponent.onEditAsset.ModalCompleteEvent', e.data);
				Object.assign(asset, e.data as Field);
			}
		});
	}

	onEditContent() {
		// console.log('ContentItemComponent.onEditContent', asset);
		this.modalService.open({
			component: EditComponent,
			data: {
				typeId: this.item.type.id,
				item: this.item,
			}
		}).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('ContentItemComponent.onEditContent.ModalCompleteEvent', e.data);
				Object.assign(this.item, e.data as Content);
			}
		});
	}

	/*
	asset aspect
	[ngStyle]="{ 'padding-top.%': 100 / state.item.assets[0].width * state.item.assets[0].height }"
	*/

}
