import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { AdminResolve } from './admin.resolve';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefinitionAddComponent } from './definition/definition-add.component';
import { DefinitionComponent } from './definition/definition.component';
import { DetailComponent } from './detail/detail.component';
import { IndexComponent } from './index/index.component';
import { PageComponent } from './page/page.component';
import { SettingsComponent } from './setting/settings.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';

export const PAGES = [
	AdminComponent,
	DashboardComponent,
	DefinitionAddComponent,
	DefinitionComponent,
	DetailComponent,
	IndexComponent,
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
			{ path: 'dashboard', component: DashboardComponent },
			{
				path: 'content', children: [
					{ path: '', redirectTo: 'page', pathMatch: 'full' },
					{ path: ':type', component: IndexComponent },
					{ path: ':type/:id', component: DetailComponent },
					{ path: ':type/definition/add', component: DefinitionAddComponent },
					{ path: ':type/definition/:id', component: DefinitionComponent },
					{ path: 'category', component: DashboardComponent },
				]
			},
			{ path: 'user', component: UsersComponent },
			{ path: 'setting', component: SettingsComponent },
			//
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

