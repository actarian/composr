import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { ModalData } from '@designr/ui';
import { StoreService } from '../store/store.service';
import { TabState } from '../tabs/tab.service';

@Component({
	selector: 'content-edit-component',
	templateUrl: 'content-edit.component.html',
	styleUrls: ['content-edit.component.scss'],
})
export class ContentEditComponent extends DisposableComponent implements OnInit {

	@Input() state: TabState;
	submitted: boolean = false;
	busy: boolean = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private storeService: StoreService,
		private modalData: ModalData,
	) {
		super();
	}

	ngOnInit() {
		if (!this.state && this.modalData) {
			this.state = this.modalData as TabState;
		}
		/*
		this.route.data.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			console.log(data);
			if (!this.state) {
				this.state = data as TabState;
			}
		});
		*/
	}

	onReset() {
		// console.log('DefinitionComponent.onReset', this.typeModel, this.typeId);
		this.state.form.reset(this.state.item);
	}

	onSubmit(model: any) {
		console.log('DefinitionComponent.onSubmit', this.state.definition.model, this.state.definition.id, model);
		// model.fields = this.fields;
		const changedItem = this.storeService.getChangedValues(this.state.item, model);
		console.log('onSubmit.changedItem', changedItem ? Object.assign({}, changedItem) : changedItem);
		if (changedItem) {
			changedItem.id = this.state.item.id;
			this.storeService.patchDetail('definition', changedItem).subscribe(item => {
				this.state.item = item;
				this.state.form.patchValue(item);
			});
		}
	}

}
