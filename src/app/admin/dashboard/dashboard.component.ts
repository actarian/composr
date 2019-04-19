import { Component } from '@angular/core';
import { DisposableComponent } from '@designr/core';

@Component({
	selector: 'dashboard-component',
	templateUrl: 'dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent extends DisposableComponent {
	constructor(
	) {
		super();
	}
}
