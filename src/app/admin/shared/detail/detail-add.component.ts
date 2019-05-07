import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { ModalData, ModalService } from '@designr/ui';
import { finalize, first } from 'rxjs/operators';
import { Definition } from '../store/store';
import { StoreService } from '../store/store.service';

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
	error: any;
	busy: boolean = false;
	submitted: boolean = false;

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
		this.type = this.modalData as string;
		this.storeService.getDefinition(this.type).subscribe(definition => {
			this.definition = definition;
			this.options = this.formService.getOptions(
				this.storeService.mapOptions(
					this.storeService.getCreationFields(this.definition.fields)
				)
			);
			this.form = this.formService.getFormGroup(this.options);
			this.form.reset({
				pageType: { id: null },
			});
		});
		/*
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			this.type = data.type;
		});
		*/
	}

	onReset() {
		this.form.reset();
	}

	onSubmit(model: any) {
		console.log('DetailAddComponent.onSubmit', model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		this.storeService.addItem(this.type, model).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			created => {
				this.modalService.complete(null, created);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('DetailAddComponent.onSubmit.error', this.error);
			}
		);
	}


}
