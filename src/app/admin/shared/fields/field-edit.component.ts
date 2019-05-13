import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlOption, FormService } from '@designr/control';
import { ControlSelectOption } from '@designr/control/lib/control/select/control-select';
import { DisposableComponent, Identity } from '@designr/core';
import { ModalData, ModalService } from '@designr/ui';
import { finalize, first } from 'rxjs/operators';
import { Field } from '../store/store';
import { StoreService } from '../store/store.service';

export const CONTROL_TYPES: ControlSelectOption[] = [
	{ name: 'select', id: null },
	// { name: 'checkbox', id: 'Checkbox' },
	{ name: 'Number', id: 'number' },
	{ name: 'Reflection', id: 'reflection' },
	{ name: 'Select', id: 'select' },
	{ name: 'Switch', id: 'switch' },
	{ name: 'Tab', id: 'tab' },
	{ name: 'Text', id: 'text' },
	{ name: 'Textarea', id: 'textarea' },
	{ name: 'Localized Text', id: 'localized-text' },
	{ name: 'Localized Textarea', id: 'localized-textarea' },
];

@Component({
	selector: 'field-edit-component',
	templateUrl: './field-edit.component.html',
	styleUrls: ['./field-edit.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
})

export class FieldEditComponent extends DisposableComponent implements OnInit {

	type: string = 'Definition';
	id: number | string;
	field: Field;
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
		this.id = data.id as number | string;
		this.field = data.field as Field;
		this.options = this.formService.getOptions([{
			key: 'control',
			schema: 'select',
			label: 'Control',
			placeholder: 'control',
			options: CONTROL_TYPES,
			required: false,
			disabled: this.field.primaryKey,
			order: 1
		}, {
			key: 'name',
			schema: 'text',
			label: 'Name',
			placeholder: 'name',
			required: false,
			order: 2
		}, {
			key: 'description',
			schema: 'textarea',
			label: 'Description',
			placeholder: 'description',
			required: false,
			order: 3
		}]);
		this.form = this.formService.getFormGroup(this.options);
		this.form.reset(this.field);
	}

	onReset(event): void {
		this.form.reset(this.field);
	}

	onSubmit(model): void {
		// console.log('FieldEditComponent.onSubmit', model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		const field = Object.assign({ id: this.field.id }, model) as Identity;
		this.storeService.patchField(this.type, this.id, field).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			patched => {
				this.modalService.complete(null, patched);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('FieldEditComponent.onSubmit.error', this.error);
			}
		);
	}

}
