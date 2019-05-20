import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { ModalData, ModalService } from '@designr/ui';
import { finalize, first } from 'rxjs/operators';
import { Definition } from '../store/store';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'edit-component',
	templateUrl: 'edit.component.html',
	styleUrls: ['edit.component.scss'],
})
export class EditComponent extends DisposableComponent implements OnInit {

	typeId: number;
	item: any;
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
		this.typeId = data.typeId as number;
		this.item = data.item as any;
		this.storeService.getDefinitionById(this.typeId).pipe(
			first(),
		).subscribe(definition => {
			this.definition = definition;
			// console.log('EditComponent', this.typeId, this.item, definition);
			this.options = this.formService.getOptions(
				this.storeService.mapOptions(
					this.item ? this.storeService.getScalarFields(this.definition.fields) : this.storeService.getCreationFields(this.definition.fields),
					{ type: { disabled: definition.extend !== 'Entity' } }
				)
			);
			this.form = this.formService.getFormGroup(this.options);
			this.onReset();
		});
	}

	onReset() {
		if (this.item) {
			this.form.reset(this.item);
		} else {
			this.form.reset(
				this.definition.extend === 'Entity' ?
					{ type: { id: null } } :
					{ type: this.definition }
			);
		}
	}

	onSubmit(model: any) {
		// console.log('EditComponent.onSubmit', model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		if (this.item) {
			model.id = this.item.id;
		}
		(this.item ? this.storeService.patchItem(this.typeId, model) : this.storeService.addItem(this.typeId, model)).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			createdOrPatched => {
				this.modalService.complete(null, createdOrPatched);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('EditComponent.onSubmit.error', this.error);
			}
		);
	}

}
