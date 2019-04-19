import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable()
export class AdminGuard implements CanActivate {

	constructor(
		@Inject(PLATFORM_ID) private platformId: string,
		private router: Router,
		private adminService: AdminService,
	) { }

	canActivate(e): Observable<boolean> {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.adminService.isAuthenticated()) {
				this.router.navigate(['/admin/login']);
				return of(false);
			}
			return of(true);
		}
		return of(true);
	}
}
