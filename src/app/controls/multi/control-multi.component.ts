import { Component, Input, OnInit } from '@angular/core';
import { ControlComponent } from '@designr/control';
import { Entity } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { takeUntil } from 'rxjs/operators';
import { ControlMulti } from './control-multi';
import { ControlMultiModalComponent } from './control-multi-modal.component';

@Component({
	selector: 'control-multi-component',
	templateUrl: 'control-multi.component.html',
})
export class ControlMultiComponent extends ControlComponent implements OnInit {

	@Input() option: ControlMulti;
	items: Entity[] = [];

	get names(): string {
		return this.items.map(x => x.name).join(', ');
	}

	constructor(
		private modalService: ModalService,
	) {
		super();
	}

	onEditField() {
		this.modalService.open({
			component: ControlMultiModalComponent,
			data: {
				option: this.option, control: this.control
			}
		}).pipe(
			takeUntil(this.unsubscribe),
		).subscribe(event => {
			console.log('onEditField', event);
			if (event instanceof ModalCompleteEvent) {
				const items = event.data as Entity[];
				this.control.setValue(items);
			}
		});
	}

	ngOnInit() {
		this.items = this.control.value || [];
		this.control.valueChanges.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(items => {
			this.items = items;
			console.log(items);
		});
	}

}
