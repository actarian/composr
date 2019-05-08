import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { first, takeUntil } from 'rxjs/operators';
import { Definition } from '../store/store';
import { StoreService } from '../store/store.service';
import { TabItem, TabService } from '../tabs/tab.service';

@Component({
	selector: 'definition-component',
	templateUrl: 'definition.component.html',
	styleUrls: ['definition.component.scss'],
})
export class DefinitionComponent extends DisposableComponent implements OnInit {

	tabFields: TabItem[];
	tabIndex: number = -1;

	type: string;
	id: number;
	definition: Definition;
	fields: Definition[];
	fieldOptions: ControlOption<any>[][];
	item: any;

	options: ControlOption<any>[];
	form: FormGroup;
	submitted: boolean = false;
	busy: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private formService: FormService,
		private storeService: StoreService,
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			this.type = data.type;
			this.id = parseInt(data.id, 0);
			// console.log('definition', this.type, this.id);
			// !!! make PageType dynamic (name + type ???)
			this.storeService.getDefinition(this.type + 'Type').pipe(
				first(),
			).subscribe(definition => {
				// console.log('definition', definition);
				this.definition = definition;
				this.options = this.formService.getOptions(
					this.storeService.mapOptions(
						this.storeService.getScalarFields(this.definition.fields)
					)
				);
				/*
				this.options.push({
					products: this.formBuilder.array([])
				});
				*/
				this.form = this.formService.getFormGroup(this.options);
				this.tabFields = this.tabService.getTabs(this.definition);
				this.storeService.getDetail('definition', this.id).pipe(
					first(),
				).subscribe(item => {
					// console.log('getDetail', 'definition', this.id, item);
					this.item = item;
					this.fields = this.item.fields.slice().map(x => Object.assign({}, x));
					const fieldOptions = this.fields.map(x => {
						return [{
							key: 'visible',
							schema: 'switch',
							label: 'Visible',
						}, {
							key: 'editable',
							schema: 'switch',
							label: 'Editable',
						}, {
							key: 'required',
							schema: 'switch',
							label: 'Required',
						}];
						return this.formService.getOptions(
							this.storeService.mapOptions(
								this.storeService.getScalarFields(x.fields)
							)
						);
					});
					this.form.addControl('fields', this.formBuilder.array(
						fieldOptions.map(x => this.formService.getFormGroup(x))
					));
					this.fieldOptions = fieldOptions;
					this.form.patchValue(item);
					this.tabService.setState({
						tabFields: this.tabFields,
						type: this.type,
						id: this.id,
						definition: this.definition,
						fields: this.fields,
						fieldOptions: this.fieldOptions,
						item: this.item,
						options: this.options,
						form: this.form,
					});
				});
			});
			/*
			this.storeService.getDefinition(this.type).subscribe(definition => {
				// console.log('definition', definition);
				this.definition = definition;
				this.sortFields(this.definition.fields);
				this.fields = this.definition.fields.slice().map(x => Object.assign({}, x));
			});
			*/
		});
	}

	onDelete() {
		console.log('DefinitionComponent.onDelete', this.type, this.id);
	}

	onReset() {
		// console.log('DefinitionComponent.onReset', this.type, this.id);
		this.form.reset(this.item);
	}

	onSubmit(model: any) {
		console.log('DefinitionComponent.onSubmit', this.type, this.id, model);
		return;
		model.fields = this.fields;
		const changedItem = this.storeService.getChangedValues(this.item, model);
		console.log('onSubmit.changedItem', changedItem ? Object.assign({}, changedItem) : changedItem);
		if (changedItem) {
			changedItem.id = this.item.id;
			this.storeService.patchDetail('definition', changedItem).subscribe(item => {
				this.item = item;
				this.form.patchValue(item);
			});
		}
		/*
		const changedDefinition = this.storeService.getChangedValues(this.item.fields, this.fields);
		if (changedDefinition) {

		}
		*/
	}

}
