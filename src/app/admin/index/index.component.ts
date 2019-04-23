import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { Definition } from '../core/definition';
import { StoreService } from '../core/store.service';
import { ActionItem, Column } from '../shared/table/table.component';

@Component({
	selector: 'index-component',
	templateUrl: 'index.component.html',
	styleUrls: ['index.component.scss'],
})
export class IndexComponent extends DisposableComponent implements OnInit {

	type: string;
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
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.type = this.route.snapshot.params.type;
		this.storeService.getDefinition(this.type).subscribe(definition => {
			console.log('definition', definition);
			this.definition = definition;
			this.columns = definition.fields.filter(x => x.indexable);
		});
		this.storeService.getIndex(this.type).subscribe(items => {
			console.log('items', items.length, items[0]);
			this.items = items;
		});
	}

	onEditRow(item: any) {
		this.router.navigate(['/admin/content', this.definition.key, item.id]);
	}

	onClearCache() {
		console.log('onClearCache', this.type);
	}

}
