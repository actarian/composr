import { Component } from '@angular/core';
import { DisposableComponent } from '@designr/core';

@Component({
	selector: 'users-component',
	templateUrl: 'users.component.html',
	styleUrls: ['users.component.scss'],
})
export class UsersComponent extends DisposableComponent {
	constructor(
	) {
		super();
	}
}
