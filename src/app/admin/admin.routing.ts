import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { AdminResolve } from './admin.resolve';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './page/page.component';
import { SettingsComponent } from './setting/settings.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';

export const PAGES = [
	AdminComponent,
	DashboardComponent,
	PageComponent,
	UsersComponent,
	SettingsComponent,
	//
	AuthComponent,
	//
	TestComponent,
	//
];

const ROUTES: Routes = [
	{
		path: 'admin', component: AdminComponent, children: [
			{ path: '', redirectTo: 'content', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent, resolve: { admin: AdminResolve } },
			{
				path: 'content', children: [
					{ path: '', redirectTo: 'page', pathMatch: 'full' },
					{ path: 'page', component: PageComponent, resolve: { admin: AdminResolve } },
					{ path: 'pagetype', component: PageComponent, resolve: { admin: AdminResolve } },
					{ path: 'pagetype/:pageTypeId', component: PageComponent, resolve: { admin: AdminResolve } },
					{ path: 'category', component: DashboardComponent, resolve: { admin: AdminResolve } },
				], canActivate: [AdminGuard]
			},
			{ path: 'user', component: UsersComponent, resolve: { admin: AdminResolve } },
			{ path: 'setting', component: SettingsComponent, resolve: { admin: AdminResolve } },
			//
			{ path: 'test', component: TestComponent, resolve: { admin: AdminResolve } }
		], canActivate: [AdminGuard]
	},
	{ path: 'admin/login', component: AuthComponent },
	{ path: '', redirectTo: 'admin', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [RouterModule]
})

export class AdminRouting { }

