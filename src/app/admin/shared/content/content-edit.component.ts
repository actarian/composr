import { Component, Input, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
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
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {

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
