import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { ModalData, ModalService } from '@designr/ui';
import { finalize, first } from 'rxjs/operators';
import { Asset, Definition } from '../store/store';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'asset-edit-component',
	templateUrl: './asset-edit.component.html',
	styleUrls: ['./asset-edit.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
})

export class AssetEditComponent extends DisposableComponent implements OnInit {

	item: any;
	asset: Asset;
	definition: Definition;
	options: ControlOption<any>[];
	form: FormGroup;
	error: any;
	busy: boolean = false;
	submitted: boolean = false;

	constructor(
		private formService: FormService,
		private modalService: ModalService,
		private modalData: ModalData,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		const data = this.modalData as any;
		this.item = data.item as any;
		this.asset = data.asset as Asset;
		this.storeService.getDefinition('Asset').subscribe(definition => {
			this.definition = definition;
			// console.log('AssetEditComponent.getDefinition', definition);
			this.options = this.formService.getOptions(
				this.storeService.mapOptions(
					this.storeService.getScalarFields(this.definition.fields)
				)
			);
			this.form = this.formService.getFormGroup(this.options);
			this.form.reset(this.asset);
		});
	}

	onReset(event): void {
		this.form.reset(this.asset);
	}

	onSubmit(model): void {
		// console.log('AssetEditComponent.onSubmit', model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		const asset = Object.assign({ id: this.asset.id }, model);
		this.storeService.patchAsset(this.definition.id, asset).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			patched => {
				this.modalService.complete(null, patched);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('AssetEditComponent.onSubmit.error', this.error);
			}
		);
	}

}
