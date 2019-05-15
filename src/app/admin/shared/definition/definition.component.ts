import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { first, takeUntil } from 'rxjs/operators';
import { Definition, Field } from '../store/store';
import { StoreService } from '../store/store.service';
import { differs } from '../store/utils';
import { TabItem, TabService } from '../tabs/tab.service';

@Component({
	selector: 'definition-component',
	templateUrl: 'definition.component.html',
	styleUrls: ['definition.component.scss'],
})
export class DefinitionComponent extends DisposableComponent implements OnInit {

	tabFields: TabItem[];
	tabIndex: number = -1;

	typeModel: string;
	typeId: number;
	definition: Definition;
	fields: Field[];
	fieldOptions: ControlOption<any>[][];
	item: any;
	initialValue: any;

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
			this.typeModel = data.typeModel;
			this.typeId = parseInt(data.typeId, 0);
			// console.log('definition', this.type, this.id);
			// !!! make PageType dynamic (name + type ???)
			// console.log(this.type + 'Type');

			this.storeService.getDefinitionById(this.typeId).pipe(
				first(),
			).subscribe(item => {
				console.log('DefinitionComponent.getDefinitionById', item);
				this.item = item;
				this.fields = this.item.fields.map(x => Object.assign({}, x));
				const fields = this.formBuilder.array(item.fields.map(x => {
					return this.formBuilder.group({
						key: x.key,
						type: x.type,
						name: x.name,
						description: x.description,
						primaryKey: x.primaryKey,
						required: x.required,
						visible: x.visible,
						editable: x.editable,
						indexable: x.indexable,
						control: x.control,
						order: x.order,
					});
				}));
				const baseType = item.extend + 'Type';
				this.storeService.getDefinition(baseType).pipe(
					first(),
				).subscribe(definition => {
					this.definition = definition;
					this.options = this.formService.getOptions(
						this.storeService.mapOptions(
							this.storeService.getScalarFields(this.definition.fields)
						)
					);
					this.form = this.formService.getFormGroup(this.options);
					this.tabFields = this.tabService.getTabs(this.definition);
					this.tabService.setState({
						tabFields: this.tabFields,
						type: this.typeModel,
						id: this.typeId,
						definition: this.definition,
						fields: this.fields,
						item: this.item,
						options: this.options,
						form: this.form,
					});
					// console.log(fields);
					this.form.setControl('fields', fields);
					this.form.reset(item);
					this.initialValue = this.form.value;
				});

			});


		});
	}

	get hasDiff() {
		const diff = differs(this.initialValue, this.form.value);
		// console.log(diff);
		return diff;
		/*
		const diff = compare(this.initialValue, this.form.value);
		console.log(diff);
		return (diff || []).length > 0;
		*/
	}

	onDelete() {
		console.log('DefinitionComponent.onDelete', this.typeModel, this.typeId);
	}

	onReset() {
		// console.log('DefinitionComponent.onReset', this.typeModel, this.typeId);
		this.form.reset(this.item);
	}

	onSubmit(model: any) {
		console.log('DefinitionComponent.onSubmit', this.typeModel, this.typeId, model);
		// model.fields = this.fields;
		const changedItem = this.storeService.getChangedValues(this.item, model);
		console.log('onSubmit.changedItem', changedItem ? Object.assign({}, changedItem) : changedItem);
		if (changedItem) {
			changedItem.id = this.item.id;
			this.storeService.patchDetail('definition', changedItem).subscribe(item => {
				this.item = item;
				this.form.patchValue(item);
			});
		}
	}

}
