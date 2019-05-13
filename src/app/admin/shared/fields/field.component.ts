import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first, takeUntil } from 'rxjs/operators';
import { Field } from '../store/store';
import { TabService, TabState } from '../tabs/tab.service';
import { FieldEditComponent } from './field-edit.component';

@Component({
	selector: 'field-component',
	templateUrl: 'field.component.html',
	styleUrls: ['field.component.scss'],
})
export class FieldComponent extends DisposableComponent implements OnInit {

	state: TabState;
	field: Field;
	fields: FormArray;

	constructor(
		private route: ActivatedRoute,
		private modalService: ModalService,
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			const path = this.route.snapshot.url[0].path;
			this.tabService.state$.pipe(
				first(),
			).subscribe(state => {
				// console.log('FieldComponent', state);
				this.state = state;
				const field = state.definition.fields.find(x => x.key === path);
				this.field = field;
				const form = this.state.form;
				const item = state.item[field.key];
				this.fields = form.get(field.key) as FormArray;
				// this.sortFields(this.fields.controls);
				this.fields.reset(item);
			});
		});
	}

	onSetControl(value, field: Field) {
		console.log('onDelete', value, field);
	}

	onEditField(event: MouseEvent, field: Field) {
		// console.log('FieldComponent.onEditField', event, field);
		this.modalService.open({
			component: FieldEditComponent,
			data: {
				id: this.state.id,
				field: field,
			},
		}).pipe(
			first()
		).subscribe(e => {
			// console.log('onEditField', e);
			if (e instanceof ModalCompleteEvent) {
				// console.log('FieldComponent.onEditField.ModalCompleteEvent', e.data);
				Object.assign(field, e.data as Field);
			}
		});
	}

	onDropField(event: CdkDragDrop<string[]>) {
		// !!! move form array;
		moveItemInArray(this.fields.controls, event.previousIndex, event.currentIndex);
		// console.log('FieldComponent.onDropField', event.previousIndex, event.currentIndex);
		this.sortFields(this.fields.controls);
		// this.dropField.emit(this.fields);
	}

	sortFields(fields: AbstractControl[]) {
		fields.sort((a, b) => {
			if (a.get('primaryKey').value || b.get('primaryKey').value) {
				return (a.get('primaryKey').value && !b.get('primaryKey').value) ? -1 : 1;
			} else if (a.get('required').value || b.get('required').value) {
				return (a.get('required').value && !b.get('required').value) ? -1 : 1;
			} else {
				return 0;
			}
		});
		fields.forEach((x, i) => x.get('order').setValue(i * 10));
	}

}
