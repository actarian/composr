import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
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
			const typeModel = params.typeModel;
			const typeId = parseInt(params.typeId, 0);
			const itemId = parseInt(params.itemId, 0);
			console.log('DetailGuard.canActivate', typeModel, typeId, itemId);
			return this.storeService.getDefinitionById(typeId).pipe(
				switchMap(definition => {
					console.log('DetailGuard.definition', definition.extend, definition.model, itemId);
					return this.storeService.getDetail(definition.extend, definition.model, itemId).pipe(
						map(item => {
							if (item !== undefined) {
								return true;
							} else {
								this.router.navigate(['/admin/not-found']);
								return false;
							}
						}),
						catchError(x => of(false)),
						first(),
					)
				})
			);
		}
		return of(true);
	}
}
