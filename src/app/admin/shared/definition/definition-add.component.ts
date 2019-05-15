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
	selector: 'definition-add-component',
	templateUrl: 'definition-add.component.html',
	styleUrls: ['definition-add.component.scss'],
})
export class DefinitionAddComponent extends DisposableComponent implements OnInit {

	definitionModel: string;
	typeModel: string;
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
		const data = this.modalData as any;
		this.definitionModel = data.definitionModel;
		this.typeModel = data.typeModel;
		// console.log('DefinitionAddComponent.ngOnInit', this.type);
		this.storeService.getDefinition(this.definitionModel).subscribe(definition => {
			this.definition = definition;
			this.options = this.formService.getOptions(
				this.storeService.mapOptions(
					this.storeService.getCreationFields(this.definition.fields)
				)
			);
			this.form = this.formService.getFormGroup(this.options);
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

	onSubmit(item: any) {
		// console.log('DefinitionAddComponent.onSubmit', model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		const field = this.definition.fields.find(x => x.key === 'model');
		this.storeService.addDefinition(this.definitionModel, field.model, item).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			created => {
				this.modalService.complete(null, created);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('DefinitionAddComponent.onSubmit.error', this.error);
			}
		);
	}

}
