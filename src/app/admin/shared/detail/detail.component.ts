import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { finalize, first, takeUntil } from 'rxjs/operators';
import { Definition } from '../store/store';
import { StoreService } from '../store/store.service';
import { TabItem, TabService } from '../tabs/tab.service';

@Component({
	selector: 'detail-component',
	templateUrl: 'detail.component.html',
	styleUrls: ['detail.component.scss'],
})
export class DetailComponent extends DisposableComponent implements OnInit {

	tabFields: TabItem[];

	type: string;
	id: number;
	definition: Definition;
	item: any;

	options: ControlOption<any>[];
	form: FormGroup;
	error: any;
	busy: boolean = false;
	submitted: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private formService: FormService,
		private storeService: StoreService,
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			this.type = data.type;
			this.id = parseInt(data.id, 0);
			console.log('detail', this.type, this.id);
			this.storeService.getDefinition(this.type).pipe(
				first(),
			).subscribe(definition => {
				this.definition = definition;
				this.options = this.formService.getOptions(
					this.storeService.mapOptions(
						this.storeService.getScalarFields(this.definition.fields)
					)
				);
				this.form = this.formService.getFormGroup(this.options);
				this.tabFields = this.tabService.getTabs(this.definition);
				this.storeService.getDetail(this.type, this.id).pipe(
					first(),
				).subscribe(item => {
					console.log('getDetail', this.type, this.id, item);
					this.item = item;
					this.form.patchValue(item);
					this.tabService.setState({
						tabFields: this.tabFields,
						type: this.type,
						id: this.id,
						definition: this.definition,
						item: this.item,
						options: this.options,
						form: this.form,
					});
				});
			});
		});
	}

	onDelete() {
		console.log('DetailComponent.onDelete', this.type, this.id);
	}

	onReset() {
		console.log('DetailComponent.onReset', this.type, this.id);
		this.form.reset(this.item);
	}

	onSubmit(model: any) {
		console.log('DetailComponent.onSubmit', this.type, this.id, model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		const item = Object.assign({ id: this.id }, model);
		this.storeService.patchDetail(this.type, item).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			patched => {
				console.log('patched!!!', patched);
				Object.assign(this.item, patched);
				console.log(this.form);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('AssetEditComponent.onSubmit.error', this.error);
			}
		);
	}

	onPreview() {
		console.log('DetailComponent.onPreview', this.type, this.id);
	}

}
