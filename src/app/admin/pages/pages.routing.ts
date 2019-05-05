import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { DefinitionComponent } from '../definition/definition.component';
import { DetailComponent } from '../detail/detail.component';
import { IndexComponent } from '../index/index.component';
import { AssetComponent } from '../tabs/asset/asset.component';
import { ContentComponent } from '../tabs/content/content.component';
import { FieldComponent } from '../tabs/fields/field.component';
import { ObjectComponent } from '../tabs/object/object.component';
import { RelationComponent } from '../tabs/relation/relation.component';
import { ScalarComponent } from '../tabs/scalar/scalar.component';
import { PagesComponent } from './pages.component';

const ROUTES: Routes = [{
	path: '', component: PagesComponent, children: [
		// { path: '', redirectTo: 'data/page', pathMatch: 'full' },
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

