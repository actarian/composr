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
import { TabAssetComponent } from './tabs/tab-asset.component';
import { TabContentComponent } from './tabs/tab-content.component';
import { TabDetailComponent } from './tabs/tab-detail.component';
import { TabFieldsComponent } from './tabs/tab-fields.component';
import { TabObjectComponent } from './tabs/tab-object.component';
import { TabRelationComponent } from './tabs/tab-relation.component';
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
	TabAssetComponent,
	TabContentComponent,
	TabDetailComponent,
	TabFieldsComponent,
	TabObjectComponent,
	TabRelationComponent,
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
					{ path: '', redirectTo: 'data/page', pathMatch: 'full' },
					{ path: 'data/:type', component: IndexComponent },
					{
						path: 'data/:type/:id', component: DetailComponent, children: [
							{ path: '', redirectTo: 'detail', pathMatch: 'full' },
							{ path: 'detail', component: TabDetailComponent },
							{ path: 'meta', component: TabObjectComponent },
							{ path: 'contents', component: TabContentComponent },
							{ path: 'assets', component: TabAssetComponent },
							{ path: 'related', component: TabRelationComponent },
							{ path: 'features', component: TabRelationComponent },
							{ path: 'taxonomies', component: TabRelationComponent },
							{ path: ':key', component: TabObjectComponent },
						]
					},
					{
						path: 'definition/:type/:id', component: DefinitionComponent, children: [
							{ path: '', redirectTo: 'detail', pathMatch: 'full' },
							{ path: 'detail', component: TabDetailComponent },
							{ path: 'fields', component: TabFieldsComponent },
						]
					}
				]
			},
			{ path: 'models', component: DashboardComponent },
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

