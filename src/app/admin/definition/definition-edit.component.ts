import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlOption, FormService } from '@designr/control';
import { ControlSelectOption } from '@designr/control/lib/control/select/control-select';
import { DisposableComponent } from '@designr/core';
import { ModalData, ModalService } from '@designr/ui';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';
// import { ControlOption } from '../../core/forms';

export const CONTROL_TYPES: ControlSelectOption[] = [
	{ name: 'select', id: null },
	// { name: 'checkbox', id: 'Checkbox' },
	{ name: 'Number', id: 'number' },
	{ name: 'Select', id: 'select' },
	{ name: 'Switch', id: 'switch' },
	{ name: 'Tab', id: 'tab' },
	{ name: 'Text', id: 'text' },
	{ name: 'Textarea', id: 'textarea' },
];

@Component({
	selector: 'definition-edit-component',
	templateUrl: './definition-edit.component.html',
	styleUrls: ['./definition-edit.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
})

export class DefinitionEditComponent extends DisposableComponent implements OnInit {

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
		this.definition = this.modalData as Definition;
		this.options = this.formService.getOptions([{
			key: 'control',
			schema: 'select',
			label: 'Control',
			placeholder: 'control',
			options: CONTROL_TYPES,
			required: false,
			disabled: this.definition.primaryKey,
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
		this.form.patchValue(this.definition);
	}

	onReset(event): void {
		this.form.reset(this.definition);
	}

	onSubmit(model): void {
		// console.log('DefinitionEditComponent.onSubmit', model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		/*
		this.storeService.patchDefinition(this.definition.id, model).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			patched => {
				this.modalService.close(null, patched);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('DefinitionEditComponent.onSubmit.error', this.error);
			}
		);
		*/
	}

}
