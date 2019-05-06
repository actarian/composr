import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { AdminResolve } from './admin.resolve';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';

const ROUTES: Routes = [
	{
		path: 'admin', component: AdminComponent, children: [
			{ path: '', redirectTo: 'pages', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent },
			{
				path: 'pages', loadChildren: '../admin/pages/pages.module#PagesModule',
				data: { preload: true }
			},
			{
				path: 'contents', loadChildren: '../admin/contents/contents.module#ContentsModule',
				data: { preload: true }
			},
			{
				path: 'settings', loadChildren: '../admin/settings/settings.module#SettingsModule',
				data: { preload: true }
			},
			{ path: 'users', component: UsersComponent },
			{ path: 'test', component: TestComponent }
		], canActivate: [AdminGuard], resolve: { admin: AdminResolve }
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

