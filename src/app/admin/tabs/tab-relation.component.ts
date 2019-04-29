import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { TabService, TabState } from './tab.serice';

@Component({
	selector: 'tab-relation-component',
	templateUrl: 'tab-relation.component.html',
	styleUrls: ['tab-relation.component.scss'],
})
export class TabRelationComponent extends DisposableComponent implements OnInit {

	state: TabState;

	constructor(
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		this.tabService.state$.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(state => {
			console.log('TabRelationComponent', state);
			this.state = state;
		});
	}

}
