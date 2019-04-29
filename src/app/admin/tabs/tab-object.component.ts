import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';
import { TabService, TabState } from './tab.serice';

@Component({
	selector: 'tab-object-component',
	templateUrl: 'tab-object.component.html',
	styleUrls: ['tab-object.component.scss'],
})
export class TabObjectComponent extends DisposableComponent implements OnInit {

	state: TabState;
	field: Definition;
	definition: Definition;

	options: ControlOption<any>[];
	form: FormGroup;
	group: FormGroup;
	submitted: boolean = false;
	busy: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private tabService: TabService,
		private storeService: StoreService,
		private formService: FormService,
	) {
		super();
	}

	ngOnInit() {
		const path = this.route.snapshot.url[0].path;
		this.tabService.state$.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(state => {
			this.state = state;
			// console.log('TabObjectComponent.state', state);
			const field = state.definition.fields.find(x => x.key === path);
			this.field = field;
			// console.log('TabObjectComponent.field', field);
			const form = this.state.form;
			this.storeService.getDefinition(field.model).subscribe(definition => {
				this.definition = definition;
				// console.log(definition);
				this.options = this.formService.getOptions(
					this.storeService.mapOptions(
						this.storeService.getScalarFields(definition.fields)
					)
				);
				let group = this.state.form.get(field.key) as FormGroup;
				if (!group) {
					group = this.formService.getFormGroup(this.options);
					form.setControl(field.key, group);
				}
				this.group = group;
				// this.form = this.formService.getFormGroup(this.options);
				const item = state.item[field.key];
				if (item) {
					// console.log('TabObjectComponent.item', item);
					const patch = {};
					patch[field.key] = item[field.key];
					this.form.patchValue(patch);
				}
				// this.form.patchValue(state.item[field.key]);
			});
		});
	}

	onSubmit(value) {

	}

}
