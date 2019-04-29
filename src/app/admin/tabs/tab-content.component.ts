import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { TabService, TabState } from './tab.serice';

@Component({
	selector: 'tab-content-component',
	templateUrl: 'tab-content.component.html',
	styleUrls: ['tab-content.component.scss'],
})
export class TabContentComponent extends DisposableComponent implements OnInit {

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
			console.log('TabContentComponent', state);
			this.state = state;
		});
	}

}
