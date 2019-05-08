import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { TabService, TabState } from '../tab.service';

@Component({
	selector: 'scalar-component',
	templateUrl: 'scalar.component.html',
	styleUrls: ['scalar.component.scss'],
})
export class ScalarComponent extends DisposableComponent implements OnInit {

	state: TabState;

	constructor(
		private route: ActivatedRoute,
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		this.tabService.state$.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(state => {
			// console.log('ScalarComponent', state);
			this.state = state;
		});
	}

}
