import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { first, takeUntil } from 'rxjs/operators';
import { Definition, Field } from '../store/store';
import { StoreService } from '../store/store.service';
import { TabService, TabState } from '../tabs/tab.service';

@Component({
	selector: 'object-component',
	templateUrl: 'object.component.html',
	styleUrls: ['object.component.scss'],
})
export class ObjectComponent extends DisposableComponent implements OnInit {

	state: TabState;
	field: Field;
	definition: Definition;
	options: ControlOption<any>[];
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
		this.tabService.state$.pipe(
			first(),
		).subscribe(state => {
			this.state = state;
			// console.log('ObjectComponent.state', state);
			this.route.params.pipe(
				takeUntil(this.unsubscribe),
			).subscribe(data => {
				const path = this.route.snapshot.url[0].path;
				const field = state.definition.fields.find(x => x.key === path);
				this.field = field;
				// console.log('ObjectComponent.field', field);
				const form = this.state.form;
				this.storeService.getDefinition(field.model).pipe(
					first(),
				).subscribe(definition => {
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
					const item = state.item[field.key];
					this.group.reset(item);
				});
			});
		});
	}

}
