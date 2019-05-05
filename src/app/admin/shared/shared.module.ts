import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlModule } from '@designr/control';
import { CoreModule, DisposableComponent } from '@designr/core';
import { DefinitionAddComponent } from '../definition/definition-add.component';
import { DefinitionComponent } from '../definition/definition.component';
import { DetailAddComponent } from '../detail/detail-add.component';
import { DetailComponent } from '../detail/detail.component';
import { IndexComponent } from '../index/index.component';
import { MuuriForOf } from '../shared/muuri/muuriForOf.directive';
import { PagerComponent } from '../shared/pager/pager.component';
import { TableComponent } from '../shared/table/table.component';
import { AssetEditComponent } from '../tabs/asset/asset-edit.component';
import { AssetComponent } from '../tabs/asset/asset.component';
import { ContentComponent } from '../tabs/content/content.component';
import { FieldEditComponent } from '../tabs/fields/field-edit.component';
import { FieldComponent } from '../tabs/fields/field.component';
import { ObjectComponent } from '../tabs/object/object.component';
import { RelationComponent } from '../tabs/relation/relation.component';
import { ScalarComponent } from '../tabs/scalar/scalar.component';
import { TabService } from '../tabs/tab.service';
import { NotFoundComponent } from './not-found/not-found.component';

const modules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule,
	DragDropModule,
	ScrollingModule,
	CoreModule,
	ControlModule,
];

const services = [
	TabService,
];

const entryComponents: Type<DisposableComponent>[] = [
	AssetEditComponent,
	DefinitionAddComponent,
	DetailAddComponent,
	FieldEditComponent,
];

const components: Type<DisposableComponent>[] = [
	AssetComponent,
	ContentComponent,
	DefinitionComponent,
	DetailComponent,
	FieldComponent,
	IndexComponent,
	NotFoundComponent,
	ObjectComponent,
	PagerComponent,
	RelationComponent,
	ScalarComponent,
	TableComponent,
	...entryComponents,
];

const directives = [
	MuuriForOf,
];

const pipes = [
];

const validators = [
];

const guards = [
];

const interceptors = [
];

@NgModule({
	imports: [
		...modules
	],
	providers: [
		...services,
		...pipes,
		...validators,
		...guards,
		...interceptors
	],
	declarations: [
		...components,
		...directives,
		...pipes,
		...validators,
	],
	entryComponents: [
		...entryComponents,
	],
	exports: [
		...modules,
		...components,
		...directives,
		...pipes,
		...validators,
	]
})

export class SharedModule { }
