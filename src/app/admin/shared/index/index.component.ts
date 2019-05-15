import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { delay, first, takeUntil, tap } from 'rxjs/operators';
import { DetailAddComponent } from '../detail/detail-add.component';
import { Definition } from '../store/store';
import { StoreService } from '../store/store.service';
import { ActionItem, Column } from '../table/table.component';

@Component({
	selector: 'index-component',
	templateUrl: 'index.component.html',
	styleUrls: ['index.component.scss'],
})
export class IndexComponent extends DisposableComponent implements OnInit {

	typeModel: string;
	typeId: number;
	definition: Definition;
	columns: Column[] = [];
	items: any[] = [];
	actionItems: ActionItem[] = [{
		label: 'Delete', action: (items: any[]): boolean => {
			return true;
		}
	}];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private modalService: ModalService,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
			tap(x => this.definition = null),
			delay(1),
		).subscribe(data => {
			this.typeModel = data.typeModel;
			this.typeId = parseInt(data.typeId, 0);
			this.storeService.getDefinitionById(this.typeId).subscribe(definition => {
				// console.log('definition', definition);
				this.definition = definition;
				this.columns = definition.fields.filter(x => x.indexable);
			});
			this.storeService.getIndexById(this.typeId).subscribe(items => {
				// console.log('items', items.length, items[0]);
				this.items = items;
			});
		});
	}

	onEditRow(item: any) {
		// console.log(this.route.snapshot.root);
		this.router.navigate([item.id, 'edit'], { relativeTo: this.route });
	}

	onDeleteRow(item: any) {
		console.log('IndexComponent.onDeleteRow', item);
	}

	onClearCache() {
		console.log('onClearCache', this.typeModel);
	}

	onAddItem() {
		console.log('onAddItem', this.typeId);
		// !!! make it generic
		this.modalService.open({ component: DetailAddComponent, data: this.typeId }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('IndexComponent.onAddItem.ModalCompleteEvent', e.data);
			}
		});
	}

}
