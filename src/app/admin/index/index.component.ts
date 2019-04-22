import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { Definition } from '../core/definition';
import { DefinitionService } from '../core/definition.service';
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
		private definitionService: DefinitionService,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.type = this.route.snapshot.params.type;
		this.definitionService.getIndexDefinition(this.type).subscribe(definition => this.definition = definition);
		this.storeService.getIndex(this.type).subscribe(items => this.items = items);
	}

	onEditRow(item: any) {
		this.router.navigate(['/admin/content', this.definition.key, item.id]);
	}

}
