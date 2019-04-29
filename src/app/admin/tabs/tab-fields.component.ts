import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first, takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { DefinitionEditComponent } from '../definition/definition-edit.component';
import { TabService, TabState } from './tab.serice';

@Component({
	selector: 'tab-fields-component',
	templateUrl: 'tab-fields.component.html',
	styleUrls: ['tab-fields.component.scss'],
})
export class TabFieldsComponent extends DisposableComponent implements OnInit {

	state: TabState;

	constructor(
		private tabService: TabService,
		private modalService: ModalService,
	) {
		super();
	}

	ngOnInit() {
		this.tabService.state$.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(state => {
			console.log('TabFieldsComponent', state);
			this.state = state;
			this.sortFields(this.state.fields);
		});
	}

	onSetControl(value, field: Definition) {
		console.log('onDelete', value, field);
	}

	onEditField(event: MouseEvent, field: Definition) {
		console.log('TabFieldsComponent.onEditField', event, field);
		this.modalService.open({ component: DefinitionEditComponent, data: field }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('TabFieldsComponent.onEditField.ModalCompleteEvent', e.data);
			}
		});
	}

	onDropField(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.state.fields, event.previousIndex, event.currentIndex);
		console.log('TabFieldsComponent.onDropField', event.previousIndex, event.currentIndex);
		this.sortFields(this.state.fields);
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

}
