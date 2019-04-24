import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { ModalService } from '@designr/ui';
import { takeUntil } from 'rxjs/operators';
import { AuthSigninComponent } from './auth-signin.component';

@Component({
	selector: 'auth-component',
	styleUrls: ['auth.component.scss'],
	templateUrl: 'auth.component.html',
})
export class AuthComponent extends DisposableComponent implements OnInit {

	constructor(
		private router: Router,
		private modalService: ModalService,
	) {
		super();
	}

	ngOnInit() {
		this.modalService.open({ component: AuthSigninComponent }).pipe(
			takeUntil(this.unsubscribe),
		).subscribe(event => {
			console.log(event);
			if (event.data && event.data.accessToken) {
				this.router.navigate(['/admin']);
			}
		});
	}

}
