import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Admin } from './admin';
import { AdminService } from './admin.service';

@Injectable()
export class AdminResolve implements Resolve<Admin> {

	constructor(
		private adminService: AdminService
	) { }

	resolve(route: ActivatedRouteSnapshot) {
		return this.adminService.me();
	}

}
