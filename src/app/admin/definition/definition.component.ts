import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent, MenuItem } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first, takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';
import { DefinitionEditComponent } from './definition-edit.component';

export const TABS: MenuItem[] = [
	{ id: 1, name: 'Detail' },
	{ id: 2, name: 'Fields' },
];

@Component({
	selector: 'definition-component',
	templateUrl: 'definition.component.html',
	styleUrls: ['definition.component.scss'],
})
export class DefinitionComponent extends DisposableComponent implements OnInit {

	tabs: MenuItem[] = TABS;
	tab: MenuItem = this.tabs[0];

	type: string;
	id: number;
	definition: Definition;
	fields: Definition[];
	item: any;

	options: ControlOption<any>[];
	form: FormGroup;
	submitted: boolean = false;
	busy: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private formService: FormService,
		private modalService: ModalService,
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
			// console.log(this.type, this.id);
			this.storeService.getDefinition('definition').subscribe(definition => {
				// console.log('definition', definition);
				this.definition = definition;
				this.options = this.formService.getOptions(
					this.storeService.mapOptions(
						this.storeService.getScalarFields(this.definition.fields)
					)
				);
				this.form = this.formService.getFormGroup(this.options);
				this.storeService.getDetail('definition', this.id).subscribe(item => {
					// console.log('item', item);
					this.item = item;
					this.sortFields(this.item.fields);
					this.fields = this.item.fields.slice().map(x => Object.assign({}, x));
					this.form.patchValue(item);
				});
			});
			/*
			this.storeService.getDefinition(this.type).subscribe(definition => {
				console.log('definition', definition);
				this.definition = definition;
				this.sortFields(this.definition.fields);
				this.fields = this.definition.fields.slice().map(x => Object.assign({}, x));
			});
			*/
		});
	}

	onSetControl(value, field: Definition) {
		console.log('onDelete', value, field);
	}

	onEditField(event: MouseEvent, field: Definition) {
		console.log('onEditField', event, field);
		this.modalService.open({ component: DefinitionEditComponent, data: field }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('onEditField.ModalCompleteEvent', e.data);
			}
		});
	}

	onDropField(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
		console.log('DefinitionComponent.onDropField', event.previousIndex, event.currentIndex);
		this.sortFields(this.fields);
		// this.dropField.emit(this.fields);
	}

	sortFields(fields: Definition[]) {
		fields.sort((a, b) => {
			if (a.primaryKey || b.primaryKey) {
				return (a.primaryKey && !b.primaryKey) ? -1 : 1;
			} else if (a.required || b.required) {
				return (a.required && !b.required) ? -1 : 1;
			} else {
				return 0;
			}
		});
		fields.forEach((x, i) => x.order = i * 10);
	}

	onDelete() {
		console.log('onDelete', this.id);
	}

	onReset() {
		this.form.reset(this.item);
	}

	onSubmit(model: any) {
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
