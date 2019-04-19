import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { Admin } from './admin';

@Component({
	selector: 'admin-component',
	templateUrl: 'admin.component.html',
	styleUrls: ['admin.component.scss'],
})
export class AdminComponent extends DisposableComponent {

	admin: Admin;

	constructor(
		private route: ActivatedRoute,
	) {
		super();
		this.admin = this.route.snapshot.data['admin'];
	}

}
