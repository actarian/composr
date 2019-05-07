import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DisposableComponent, Entity } from '@designr/core';
import { ModalData, ModalService } from '@designr/ui';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlMulti, ControlMultiOption } from './control-multi';

@Component({
	selector: 'control-multi-modal.component',
	templateUrl: 'control-multi-modal.component.html',
	styleUrls: ['control-multi-modal.component.scss'],
})
export class ControlMultiModalComponent extends DisposableComponent implements OnInit {

	control: FormControl;
	option: ControlMulti;
	options: Observable<ControlMultiOption[]>;
	items: ControlMultiOption[];

	constructor(
		private modalService: ModalService,
		private modalData: ModalData,
	) {
		super();
	}

	ngOnInit() {
		const data = this.modalData as any;
		this.control = data.control as FormControl;
		this.option = data.option as ControlMulti;
		this.options = this.option.options as Observable<ControlMultiOption[]>;
		this.options.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(items => {
			items = items.filter(x => x.id !== null);
			const values = this.control.value as Entity[];
			if (values) {
				items.forEach(x => x.active = (values.find(v => v.id === x.id)) !== undefined);
			}
			this.items = items;
		});
	}

	onToggleAll() {
		this.items.forEach(x => x.active = true);
	}

	onToggleNone() {
		this.items.forEach(x => x.active = false);
	}

	onToggle(item) {
		item.active = !item.active;
	}

	onDone() {
		this.modalService.complete(null, this.items.filter(x => x.active).map(x => {
			return {
				id: x.id,
				name: x.name,
			};
		}));
	}

	onReset() {

	}

	onSubmit(model: any) {

	}

}
