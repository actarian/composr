import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinitionComponent } from '../shared/definition/definition.component';
import { DefinitionGuard } from '../shared/definition/definition.guard';
import { DetailComponent } from '../shared/detail/detail.component';
import { DetailGuard } from '../shared/detail/detail.guard';
import { FieldComponent } from '../shared/fields/field.component';
import { IndexComponent } from '../shared/index/index.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ResolverComponent } from '../shared/resolver/resolver.component';
import { ScalarComponent } from '../shared/scalar/scalar.component';
import { TabComponent } from '../shared/tabs/tab.component';
import { TabGuard } from '../shared/tabs/tab.guard';
import { PagesComponent } from './pages.component';

const ROUTES: Routes = [{
	path: '', component: PagesComponent, children: [
		{ path: '', redirectTo: 'resolver', pathMatch: 'full' },
		{ path: 'resolver', component: ResolverComponent, data: { model: 'Page' } },
		{
			path: ':typeModel/:typeId/edit', component: DefinitionComponent, children: [
				{ path: '', redirectTo: 'detail', pathMatch: 'full' },
				{ path: 'detail', component: ScalarComponent },
				{ path: 'fields', component: FieldComponent },
			], canActivate: [DefinitionGuard]
		},
		{ path: ':typeModel/:typeId/items', component: IndexComponent },
		{
			path: ':typeModel/:typeId/items/:itemId/edit', component: DetailComponent, children: [
				{ path: '', redirectTo: 'detail', pathMatch: 'full' },
				{ path: 'detail', component: ScalarComponent, data: { tab: true } },
				{ path: ':key', component: TabComponent, data: { tab: true }, canActivate: [TabGuard] },
			], canActivate: [DetailGuard]
		},
		{ path: '**', component: NotFoundComponent },
	]
}];

@NgModule({
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [RouterModule]
})

export class PagesRouting { }

