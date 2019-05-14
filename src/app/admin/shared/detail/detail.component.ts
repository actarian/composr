import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlOption, FormService } from '@designr/control';
import { DisposableComponent } from '@designr/core';
import { finalize, first, takeUntil } from 'rxjs/operators';
import { Definition } from '../store/store';
import { StoreService } from '../store/store.service';
import { differs } from '../store/utils';
import { TabItem, TabService } from '../tabs/tab.service';

@Component({
	selector: 'detail-component',
	templateUrl: 'detail.component.html',
	styleUrls: ['detail.component.scss'],
})
export class DetailComponent extends DisposableComponent implements OnInit {

	tabFields: TabItem[];
	typeModel: string;
	typeId: number;
	itemId: number;
	definition: Definition;
	item: any;
	initialValue: any;

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
			this.typeModel = data.typeModel;
			this.typeId = parseInt(data.typeId, 0);
			this.itemId = parseInt(data.itemId, 0);
			// console.log('detail', this.type, this.id);
			this.storeService.getDefinitionById(this.typeId).pipe(
				first(),
			).subscribe(definition => {
				this.definition = definition;
				console.log('DetailComponent.getDefinitionById', definition);
				this.options = this.formService.getOptions(
					this.storeService.mapOptions(
						this.storeService.getScalarFields(this.definition.fields)
					)
				);
				this.form = this.formService.getFormGroup(this.options);
				this.tabFields = this.tabService.getTabs(this.definition);
				this.storeService.getDetail(this.typeModel, this.itemId).pipe(
					takeUntil(this.unsubscribe),
				).subscribe(item => {
					// console.log('getDetail', this.type, this.id, item);
					this.item = item;
					this.form.reset(item);
					this.initialValue = this.form.value;
					this.tabService.setState({
						tabFields: this.tabFields,
						type: this.typeModel,
						// typeId: this.typeId,
						id: this.itemId,
						definition: this.definition,
						item: this.item,
						options: this.options,
						form: this.form,
					});
				});
			});
		});
	}

	get hasDiff() {
		/*
		console.log(skipEmpties({
			a: null,
			b: [{ c: null }],
			d: [{ e: null, f: 1 }],
			g: {
				h: null
			},
			i: {
				l: 1,
				m: { n: null }
			},
			o: 'ciccio',
			n: [true, false, 2, 'pippo', 3, null, 5, { a: null }]
		}));
		*/
		const diff = differs(this.initialValue, this.form.value);
		// console.log(diff);
		return diff;
		/*
		const diff = compare(this.initialValue, this.form.value);
		// console.log(diff);
		return (diff || []).length > 0;
		*/
	}

	onDelete() {
		console.log('DetailComponent.onDelete', this.typeModel, this.itemId);
	}

	onReset() {
		// console.log('DetailComponent.onReset', this.typeModel, this.itemId);
		this.form.reset(this.item);
	}

	onSubmit(model: any) {
		// console.log('DetailComponent.onSubmit', this.typeModel, this.itemId, model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		const item = Object.assign({ id: this.itemId }, model);
		this.storeService.patchDetail(this.typeModel, item).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			patched => {
				// console.log('patched!!!', patched);
				Object.assign(this.item, patched);
				// console.log(this.form);
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('AssetEditComponent.onSubmit.error', this.error);
			}
		);
	}

	onPreview() {
		console.log('DetailComponent.onPreview', this.typeModel, this.itemId);
	}

}
