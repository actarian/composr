import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlOption, FormService } from '@designr/control';
import { AuthService, AuthToken, DisposableComponent } from '@designr/core';
import { ModalService } from '@designr/ui';
import { finalize, first } from 'rxjs/operators';
import { AdminAuth } from '../admin';
import { AdminService } from '../admin.service';
// import { ControlOption } from '../../store/forms';

@Component({
	selector: 'auth-signin-component',
	templateUrl: './auth-signin.component.html',
	styleUrls: ['./auth-signin.component.scss'],
	encapsulation: ViewEncapsulation.Emulated,
})

export class AuthSigninComponent extends DisposableComponent implements OnInit {

	options: ControlOption<any>[];
	form: FormGroup;
	error: any;
	busy: boolean = false;
	submitted: boolean = false;

	// model: AdminAuthSignin = new AdminAuthSignin({ passwordReveal: true });

	constructor(
		private formService: FormService,
		private authService: AuthService,
		private modalService: ModalService,
		private adminService: AdminService,
	) {
		super();
	}

	ngOnInit() {
		this.options = this.formService.getOptions([{
			key: 'username',
			schema: 'text',
			label: 'Username',
			placeholder: 'username',
			required: true,
			order: 1
		}, {
			key: 'password',
			schema: 'password',
			label: 'Password',
			placeholder: 'password',
			required: true,
			order: 2
		}, {
			key: 'isPersisted',
			schema: 'checkbox',
			label: 'Ricordati di me',
			placeholder: '',
			order: 3
		}]);
		this.form = this.formService.getFormGroup(this.options);
	}

	onSubmit(model): void {
		// console.log('AuthSigninComponent.onSubmit', model);
		this.submitted = true;
		this.error = null;
		this.busy = true;
		this.adminService.signin(model).pipe(
			first(),
			finalize(() => this.busy = false),
		).subscribe(
			admin => {
				if (admin) {
					this.onAuth(admin);
				} else {
					this.error = {
						message: 'Invalid admin'
					};
				}
			},
			error => {
				this.error = error;
				this.submitted = false;
				console.log('AuthSigninComponent.onSubmit.error', this.error);
			}
		);
	}

	onAuth(admin: AdminAuth) {
		if (admin && admin.accessToken) {
			const authToken = new AuthToken(admin.accessToken);
			this.authService.setToken(authToken);
		}
		this.modalService.close(null, admin);
		// error 401!
	}

}
