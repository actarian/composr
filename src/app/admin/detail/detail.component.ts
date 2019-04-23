import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent, MenuItem } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';

export const TABS: MenuItem[] = [
	{ id: 1, name: 'Detail' },
	{ id: 2, name: 'Meta' },
	{ id: 3, name: 'Contents' },
	{ id: 4, name: 'Media' },
	{ id: 5, name: 'Features' },
	{ id: 6, name: 'Taxonomies' },
	{ id: 7, name: 'Related' },
];

@Component({
	selector: 'detail-component',
	templateUrl: 'detail.component.html',
	styleUrls: ['detail.component.scss'],
})
export class DetailComponent extends DisposableComponent implements OnInit {

	tabs: MenuItem[] = TABS;
	tab: MenuItem = this.tabs[0];

	type: string;
	id: number;
	definition: Definition;
	item: any;

	options: ControlOption<any>[];
	form: FormGroup;
	submitted: boolean = false;
	busy: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private formService: FormService,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			this.type = data.type;
			this.id = parseInt(data.id, 0);
			this.storeService.getDefinition(this.type).subscribe(definition => {
				this.definition = definition;
				this.options = this.formService.getOptions(definition.fields.filter(x => x.visible && this.storeService.isScalar(x)).map(x => {
					return {
						key: x.key,
						schema: this.storeService.getControlWithType(x.type),
						label: x.key,
						placeholder: x.key,
						disabled: !x.editable,
						required: x.required,
					};
				}));
				this.form = this.formService.getFormGroup(this.options);
				this.storeService.getDetail(this.type, this.id).subscribe(item => {
					this.item = item;
					this.form.patchValue(item);
				});
			});
		});
	}

	/*
	{
		key: 'email',
		schema: 'email',
		label: 'contact.email',
		placeholder: 'contact.email',
		required: true,
		match: 'emailConfirm',
		reverse: true,
		order: 1
	}, {
		key: 'emailConfirm',
		schema: 'email',
		label: 'contact.emailConfirm',
		placeholder: 'contact.emailConfirm',
		required: true,
		match: 'email',
		order: 2,
	}, {
		key: 'password',
		schema: 'password',
		label: 'contact.password',
		placeholder: 'contact.password',
		required: true,
		minlength: 6,
		order: 3
	}, {
		key: 'type',
		schema: 'select',
		label: 'contact.type',
		options: [{
			label: 'Any',
			value: null,
		}, {
			label: 'Yes',
			value: true,
		}, {
			label: 'No',
			value: false,
		}],
		order: 3
	}, {
		key: 'privacy',
		schema: 'checkbox',
		label: 'contact.privacy',
		placeholder: 'contact.privacy',
		order: 5
	}
	*/

	onReset() {
		this.form.reset();
	}

	onSubmit(model: any) {
		console.log('onSubmit', model, this.id);
	}

	onPreview() {
		console.log('onPreview', this.type, this.id);
	}

}
