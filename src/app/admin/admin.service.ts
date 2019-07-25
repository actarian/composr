import { isPlatformBrowser } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { AuthStrategy, EntityService, LocalStorageService, StorageService } from '@designr/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Admin, AdminAuth, AdminToken } from './admin';

@Injectable({
	providedIn: 'root',
})
export class AdminService extends EntityService<Admin> {

	get collection(): string {
		return 'https://pucbm-myhospital.wslabs.it/api/identity';
	}

	protected storage: StorageService;

	public accessToken$: BehaviorSubject<AdminToken> = new BehaviorSubject<AdminToken>(null);
	get accessToken(): AdminToken {
		return this.accessToken$.getValue();
	}
	set accessToken(accessToken: AdminToken) {
		if (environment.core.authStrategy === AuthStrategy.Bearer) {
			this.storage.set('accessToken', accessToken);
		}
		this.accessToken$.next(accessToken);
	}

	public admin$: BehaviorSubject<Admin> = new BehaviorSubject<Admin>(null);
	get admin(): Admin {
		return this.admin$.getValue();
	}
	set admin(admin: Admin) {
		if (environment.core.authStrategy === AuthStrategy.Bearer) {
			this.storage.set('admin', admin);
		}
		this.admin$.next(admin);
	}

	constructor(
		protected injector: Injector,
		private storageService: LocalStorageService,
		// private dispatcher: EventDispatcherService,
	) {
		super(injector);
		this.storage = this.storageService.tryGet();
		if (isPlatformBrowser(this.platformId)) {
			this.accessToken = this.storage.get('accessToken') || null;
			this.admin = this.storage.get('admin') || null;
			// console.log('AdminService', this.accessToken);
		}
	}

	public signin(admin: AdminAuth): Observable<AdminAuth> {
		return of({ id: '12345' }).pipe(
			map((data: { id: string }) => {
				// console.log('AdminService.signin', data);
				if (data && data.id) {
					const accessToken = { accessToken: data.id };
					this.accessToken = accessToken;
					return accessToken;
				} else {
					return null;
				}
			})
		);
		return this.post(`/signin`, admin).pipe(
			map((data: { id: string }) => {
				// console.log('AdminService.signin', data);
				if (data && data.id) {
					const accessToken = { accessToken: data.id };
					this.accessToken = accessToken;
					return accessToken;
				} else {
					return null;
				}
			})
		);
	}

	public logout(): Observable<AdminAuth> {
		return this.get(`/logout`).pipe(
			tap(() => {
				this.accessToken = null;
				this.admin = null;
			})
		);
	}

	public me(): Observable<Admin> {
		return of({
			email: 'mdipaolo@websolute.it',
			firstName: 'Massimo',
			id: 'd3f8fd7c-2524-4fd3-a4ed-3a2342476303',
			lastName: 'Di Paolo'
		}).pipe(
			tap(x => {
				this.admin = x;
			})
		);
		return this.get(`/me`).pipe(
			catchError(error => {
				this.accessToken = null;
				this.admin = null;
				return error;
			}),
			tap(admin => this.admin = admin)
		);
		/*
		const admin: AdminAuth = this.admin$.getValue();
		if (admin && !force) {
			return of(admin);
		} else {
			return this.get(`/me`);
		}
		*/
	}

	public isAuthenticated(): boolean {
		// console.log('AdminService.isAuthenticated', this.accessToken);
		return this.accessToken !== null;
	}

	/*
	public signUp(admin: AdminAuth): Observable<Admin> {
		// console.log('AdminService.signUp', admin);
		return this.post(`/register`, admin).pipe(
			map(admin => new Admin(admin)),
			tap(admin => {
				// api auto-login
				this.admin = admin;
			})
		);
	}

	public signOut(): Observable<Admin> {
		return this.get(`/logout`).pipe(
			switchMap(response => {
				this.admin = null;
				return of(null);
			})
		);
	}
	*/

}

