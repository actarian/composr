import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first } from 'rxjs/operators';
import { Field } from '../../../core/definition';
import { TabService, TabState } from '../tab.service';
import { FieldEditComponent } from './field-edit.component';

@Component({
	selector: 'field-component',
	templateUrl: 'field.component.html',
	styleUrls: ['field.component.scss'],
})
export class FieldComponent extends DisposableComponent implements OnInit {

	state: TabState;
	field: Field;

	constructor(
		private route: ActivatedRoute,
		private tabService: TabService,
		private modalService: ModalService,
	) {
		super();
	}

	ngOnInit() {
		const path = this.route.snapshot.url[0].path;
		this.tabService.state$.pipe(
			first(),
		).subscribe(state => {
			console.log('FieldComponent', state);
			this.state = state;
			const field = state.definition.fields.find(x => x.key === path);
			this.field = field;
			this.sortFields(this.state.fields);
		});
	}

	onSetControl(value, field: Field) {
		console.log('onDelete', value, field);
	}

	onEditField(event: MouseEvent, field: Field) {
		console.log('FieldComponent.onEditField', event, field);
		this.modalService.open({
			component: FieldEditComponent,
			data: {
				id: this.state.id,
				field: field,
			},
		}).pipe(
			first()
		).subscribe(e => {
			console.log('onEditField', e);
			if (e instanceof ModalCompleteEvent) {
				console.log('FieldComponent.onEditField.ModalCompleteEvent', e.data);
				Object.assign(field, e.data as Field);
			}
		});
	}

	onDropField(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.state.fields, event.previousIndex, event.currentIndex);
		console.log('FieldComponent.onDropField', event.previousIndex, event.currentIndex);
		this.sortFields(this.state.fields);
		// this.dropField.emit(this.fields);
	}

	sortFields(fields: Field[]) {
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

}
