import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';

@Component({
	selector: 'detail-component',
	templateUrl: 'detail.component.html',
	styleUrls: ['detail.component.scss'],
})
export class DetailComponent extends DisposableComponent implements OnInit {

	nonScalarFields: Definition[];
	tabIndex: number = -1;

	type: string;
	id: number;
	definition: Definition;
	item: any;

	options: ControlOption<any>[];
	form: FormGroup;
	submitted: boolean = false;
	busy: boolean = false;

	constructor(
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
			this.id = parseInt(data.id, 0);
			this.storeService.getDefinition(this.type).subscribe(definition => {
				this.definition = definition;
				this.options = this.formService.getOptions(
					this.storeService.mapOptions(
						this.storeService.getScalarFields(this.definition.fields)
					)
				);
				this.form = this.formService.getFormGroup(this.options);
				this.storeService.getDetail(this.type, this.id).subscribe(item => {
					this.item = item;
					this.form.patchValue(item);
				});
				this.nonScalarFields = this.storeService.getNonScalarFields(this.definition.fields);
			});
		});
	}

	onReset() {
		this.form.reset(this.item);
	}

	onSubmit(model: any) {
		console.log('onSubmit', model, this.id);
	}

	onPreview() {
		console.log('onPreview', this.type, this.id);
	}

}
