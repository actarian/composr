import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinitionComponent } from '../shared/definition/definition.component';
import { DetailComponent } from '../shared/detail/detail.component';
import { FieldComponent } from '../shared/fields/field.component';
import { DetailGuard } from '../shared/guards/detail.guard';
import { TabGuard } from '../shared/guards/tab.guard';
import { IndexComponent } from '../shared/index/index.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ScalarComponent } from '../shared/scalar/scalar.component';
import { TabComponent } from '../shared/tabs/tab.component';
import { PagesComponent } from './pages.component';

const ROUTES: Routes = [{
	path: '', component: PagesComponent, children: [
		{ path: '', redirectTo: 'data/page', pathMatch: 'full' },
		{ path: 'data/:type', component: IndexComponent },
		{
			path: 'data/:type/:id', component: DetailComponent, children: [
				{ path: '', redirectTo: 'detail', pathMatch: 'full' },
				{ path: 'detail', component: ScalarComponent, data: { tab: true } },
				/*
				{ path: 'meta', component: ObjectComponent },
				{ path: 'contents', component: ContentComponent },
				{ path: 'assets', component: AssetComponent },
				{ path: 'related', component: RelationComponent },
				{ path: 'features', component: RelationComponent },
				{ path: 'taxonomies', component: RelationComponent },
				{ path: ':key', component: ObjectComponent },
				*/
				{ path: ':key', component: TabComponent, data: { tab: true }, canActivate: [TabGuard] },
			], canActivate: [DetailGuard]
		},
		{
			path: 'definition/:type/:id', component: DefinitionComponent, children: [
				{ path: '', redirectTo: 'detail', pathMatch: 'full' },
				{ path: 'detail', component: ScalarComponent },
				{ path: 'fields', component: FieldComponent },
			]
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

