import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlModule } from '@designr/control';
import { CoreModule, DisposableComponent } from '@designr/core';
import { MuuriForOf } from '../shared/muuri/muuriForOf.directive';
import { PagerComponent } from '../shared/pager/pager.component';
import { TableComponent } from '../shared/table/table.component';
import { AssetEditComponent } from './asset/asset-edit.component';
import { AssetComponent } from './asset/asset.component';
import { ContentItemComponent } from './content/content-item.component';
import { ContentComponent } from './content/content.component';
import { DefinitionAddComponent } from './definition/definition-add.component';
import { DefinitionComponent } from './definition/definition.component';
import { DetailAddComponent } from './detail/detail-add.component';
import { DetailComponent } from './detail/detail.component';
import { FieldEditComponent } from './fields/field-edit.component';
import { FieldComponent } from './fields/field.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ObjectComponent } from './object/object.component';
import { RelationComponent } from './relation/relation.component';
import { ScalarComponent } from './scalar/scalar.component';
import { ControlResolverComponent } from './table/control-resolver.component';
import { TabComponent } from './tabs/tab.component';
import { ToggleComponent } from './toggle/toggle.component';

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
	ContentItemComponent,
	ControlResolverComponent,
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
	TabComponent,
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
		ToggleComponent,
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
		ToggleComponent,
		...components,
		...directives,
		...pipes,
		...validators,
	]
})

export class SharedModule { }
