import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';

@Component({
	selector: 'definition-add-component',
	templateUrl: 'definition-add.component.html',
	styleUrls: ['definition-add.component.scss'],
})
export class DefinitionAddComponent extends DisposableComponent implements OnInit {

	type: string;
	definition: Definition;

	options: ControlOption<any>[];
	form: FormGroup;
	submitted: boolean = false;
	busy: boolean = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formService: FormService,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			this.type = data.type;
			this.storeService.getDefinition('definition').subscribe(definition => {
				this.definition = definition;
				this.onInitOptions();
			});
		});
	}

	onInitOptions() {
		this.options = this.formService.getOptions(this.definition.fields.filter(x => !x.primaryKey).map(x => {
			return {
				key: x.key,
				schema: this.storeService.getControlWithType(x.type),
				label: x.key,
				placeholder: x.key,
			};
		}));
		this.form = this.formService.getFormGroup(this.options);
	}

	onReset() {
		this.form.reset();
	}

	onSubmit(model: any) {
		console.log('onSubmit', model);
		this.storeService.addType(this.type, model).subscribe(item => {
			this.router.navigate(['/admin/content', this.type, 'definition', item.id]);
		});
	}

}
