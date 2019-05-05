import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './contents.component';

const ROUTES: Routes = [{
	path: '', component: ContentsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(ROUTES)
	],
	exports: [RouterModule]
})

export class ContentsRouting { }

