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
import { AssetComponent } from './tabs/asset/asset.component';
import { ContentComponent } from './tabs/content/content.component';
import { FieldComponent } from './tabs/fields/field.component';
import { ObjectComponent } from './tabs/object/object.component';
import { RelationComponent } from './tabs/relation/relation.component';
import { ScalarComponent } from './tabs/scalar/scalar.component';
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
	AssetComponent,
	ContentComponent,
	ScalarComponent,
	FieldComponent,
	ObjectComponent,
	RelationComponent,
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
							{ path: 'detail', component: ScalarComponent },
							{ path: 'meta', component: ObjectComponent },
							{ path: 'contents', component: ContentComponent },
							{ path: 'assets', component: AssetComponent },
							{ path: 'related', component: RelationComponent },
							{ path: 'features', component: RelationComponent },
							{ path: 'taxonomies', component: RelationComponent },
							{ path: ':key', component: ObjectComponent },
						]
					},
					{
						path: 'definition/:type/:id', component: DefinitionComponent, children: [
							{ path: '', redirectTo: 'detail', pathMatch: 'full' },
							{ path: 'detail', component: ScalarComponent },
							{ path: 'fields', component: FieldComponent },
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

