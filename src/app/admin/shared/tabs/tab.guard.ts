import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { StoreService } from '../store/store.service';

@Injectable({
	providedIn: 'root',
})
export class TabGuard implements CanActivate {

	constructor(
		@Inject(PLATFORM_ID) private platformId: string,
		private router: Router,
		private storeService: StoreService,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		if (isPlatformBrowser(this.platformId)) {
			const params = route.params;
			const key = params.key;
			const parent = route.parent;
			const parentParams = parent.params;
			const typeModel = parentParams.typeModel;
			const typeId = parseInt(parentParams.typeId, 0);
			const itemId = parseInt(parentParams.itemId, 0);
			// console.log('TabGuard', route, typeModel, typeId, itemId);
			return this.storeService.getDefinitionById(typeId).pipe(
				map(definition => {
					// console.log('TabGuard', definition);
					if (definition.fields.find(x => x.key === key) !== undefined) {
						return true;
					} else {
						this.router.navigate(['/admin/not-found']);
						return false;
					}
				}),
				catchError(x => of(false)),
				first(),
			);
		}
		return of(true);
	}
}
