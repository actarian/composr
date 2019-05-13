import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { first, takeUntil } from 'rxjs/operators';
import { Field } from '../store/store';
import { TabService, TabState } from '../tabs/tab.service';

@Component({
	selector: 'relation-component',
	templateUrl: 'relation.component.html',
	styleUrls: ['relation.component.scss'],
})
export class RelationComponent extends DisposableComponent implements OnInit {

	state: TabState;
	field: Field;

	constructor(
		private route: ActivatedRoute,
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		this.tabService.state$.pipe(
			first(),
		).subscribe(state => {
			// console.log('RelationComponent', state);
			this.state = state;
			this.route.params.pipe(
				takeUntil(this.unsubscribe),
			).subscribe(data => {
				const path = this.route.snapshot.url[0].path;
				const field = state.definition.fields.find(x => x.key === path);
				this.field = field;
			});
		});
	}

}
