import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { TabService, TabState } from './tab.serice';

@Component({
	selector: 'tab-detail-component',
	templateUrl: 'tab-detail.component.html',
	styleUrls: ['tab-detail.component.scss'],
})
export class TabDetailComponent extends DisposableComponent implements OnInit {

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
			console.log('TabDetailComponent', state);
			this.state = state;
		});
	}

}
