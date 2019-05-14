import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinitionComponent } from '../shared/definition/definition.component';
import { DetailComponent } from '../shared/detail/detail.component';
import { DetailGuard } from '../shared/detail/detail.guard';
import { FieldComponent } from '../shared/fields/field.component';
import { IndexComponent } from '../shared/index/index.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ScalarComponent } from '../shared/scalar/scalar.component';
import { TabComponent } from '../shared/tabs/tab.component';
import { TabGuard } from '../shared/tabs/tab.guard';
import { ContentsComponent } from './contents.component';

const ROUTES: Routes = [{
	path: '', component: ContentsComponent, children: [
		{ path: '', redirectTo: 'data/component', pathMatch: 'full' },
		{ path: 'data/:type', component: IndexComponent },
		{
			path: 'data/:type/:id', component: DetailComponent, children: [
				{ path: '', redirectTo: 'detail', pathMatch: 'full' },
				{ path: 'detail', component: ScalarComponent, data: { tab: true } },
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

export class ContentsRouting { }

