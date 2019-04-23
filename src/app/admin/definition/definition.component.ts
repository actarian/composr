import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent, MenuItem } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';
import { Option } from '../shared/table/table.component';

export const TABS: MenuItem[] = [
	{ id: 1, name: 'Detail' },
	{ id: 2, name: 'Fields' },
];

export const CONTROL_TYPES: Option[] = [
	{ value: 1, label: 'Text' },
];

@Component({
	selector: 'definition-component',
	templateUrl: 'definition.component.html',
	styleUrls: ['definition.component.scss'],
})
export class DefinitionComponent extends DisposableComponent implements OnInit {

	tabs: MenuItem[] = TABS;
	tab: MenuItem = this.tabs[0];
	controlTypes = CONTROL_TYPES;

	type: string;
	id: number;
	definition: Definition;
	reflection: Definition;
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
			console.log(this.type, this.id);
			this.storeService.getDefinition('definition').subscribe(definition => {
				console.log('definition', definition);
				this.definition = definition;
				this.form = this.getFormByDefinition(definition);
				this.storeService.getDetail('definition', this.id).subscribe(item => {
					this.item = item;
					this.form.patchValue(item);
				});
			});
			this.storeService.getReflection(this.type).subscribe(reflection => {
				console.log('reflection', reflection);
				this.reflection = reflection;
			});
		});
	}

	getFormByDefinition(definition) {
		this.options = this.formService.getOptions(definition.fields.filter(x => x.visible && this.storeService.isScalar(x)).map(x => {
			return {
				key: x.key,
				schema: this.storeService.getControlWithType(x.type),
				label: x.key,
				placeholder: x.key,
				disabled: !x.editable || x.primaryKey,
			};
		}));
		return this.formService.getFormGroup(this.options);
	}

	onReset() {
		this.form.reset();
	}

	onSubmit(model: any) {
		console.log('onSubmit', model, this.id);
	}

	onDelete() {
		console.log('onDelete', this.id);
	}

	onSetControl(value, field) {
		console.log('onDelete', value, field);
	}

}
