import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';

@Component({
	selector: 'not-found-component',
	templateUrl: 'not-found.component.html',
	styleUrls: ['not-found.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent extends DisposableComponent implements OnInit {

	constructor(
	) {
		super();
	}

	ngOnInit() {
	}

}
