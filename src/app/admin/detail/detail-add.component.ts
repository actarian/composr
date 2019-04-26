import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { ModalData, ModalService } from '@designr/ui';
import { takeUntil } from 'rxjs/operators';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';

@Component({
	selector: 'detail-add-component',
	templateUrl: 'detail-add.component.html',
	styleUrls: ['detail-add.component.scss'],
})
export class DetailAddComponent extends DisposableComponent implements OnInit {

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
		private modalService: ModalService,
		private modalData: ModalData,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			this.type = data.type;
			this.storeService.getDefinition('page').subscribe(definition => {
				this.definition = definition;
				this.options = this.formService.getOptions(
					this.storeService.mapOptions(
						this.storeService.getCreationFields(this.definition.fields)
					)
				);
				this.form = this.formService.getFormGroup(this.options);
			});
		});
	}

	onReset() {
		this.form.reset();
	}

	onSubmit(model: any) {
		console.log('onSubmit', model);
		this.storeService.addItem(this.type, model).subscribe(item => {
			console.log('onSubmit.success', item);
			// this.router.navigate(['/admin/content', this.type, item.id]);
		});
	}

}
