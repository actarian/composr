import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { StoreService } from '../store/store.service';

@Injectable({
	providedIn: 'root',
})
export class DetailGuard implements CanActivate {

	constructor(
		@Inject(PLATFORM_ID) private platformId: string,
		private router: Router,
		private storeService: StoreService,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		if (isPlatformBrowser(this.platformId)) {
			const params = route.params;
			const type = params.type;
			const id = parseInt(params.id, 0);
			this.storeService.getDetail(type, id).pipe(
				first(),
			).subscribe(item => {
				if (item !== undefined) {
					return of(true);
				} else {
					this.router.navigate(['/admin/not-found']);
					return of(false);
				}
			}, error => {
				this.router.navigate(['/admin/not-found']);
				return of(false);
			});
			return of(true);
		}
		return of(true);
	}
}
