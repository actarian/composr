import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { first, takeUntil } from 'rxjs/operators';
import { Field } from '../store/store';
import { TabService, TabState } from './tab.service';

@Component({
	selector: 'tab-component',
	templateUrl: 'tab.component.html',
	styleUrls: ['tab.component.scss'],
})
export class TabComponent extends DisposableComponent implements OnInit {

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
			this.state = state;
			this.route.params.pipe(
				takeUntil(this.unsubscribe),
			).subscribe(data => {
				const path = this.route.snapshot.url[0].path;
				const field = state.definition.fields.find(x => x.key === path);
				this.field = field;
				// console.log('TabComponent', path', path, 'field', field);
			});
		});
	}

}
