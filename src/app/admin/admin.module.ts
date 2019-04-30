import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from '@designr/control';
import { CoreModule, DisposableComponent } from '@designr/core';
import { PageModule } from '@designr/page';
import { UIModule } from '@designr/ui';
import { AdminGuard } from './admin.guard';
import { AdminHttpInterceptor } from './admin.interceptor';
import { AdminResolve } from './admin.resolve';
import { AdminRouting, PAGES } from './admin.routing';
import { AdminService } from './admin.service';
import { AuthSigninComponent } from './auth/auth-signin.component';
import { DefinitionAddComponent } from './definition/definition-add.component';
import { DetailAddComponent } from './detail/detail-add.component';
import { MuuriForOf } from './shared/muuri/muuriForOf.directive';
import { PagerComponent } from './shared/pager/pager.component';
import { TableComponent } from './shared/table/table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AssetEditComponent } from './tabs/asset/asset-edit.component';
import { FieldEditComponent } from './tabs/fields/field-edit.component';
import { TabService } from './tabs/tab.service';
import { TestComponent } from './test/test.component';
import { TestService } from './test/test.service';

const modules = [
	CommonModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	DragDropModule,
	ScrollingModule,
	CoreModule,
	ControlModule,
	UIModule,
	AdminRouting,
	PageModule // last
];

const services = [
	AdminService,
	AdminResolve,
	TabService,
	TestService,
];

const entryComponents: Type<DisposableComponent>[] = [
	AssetEditComponent,
	AuthSigninComponent,
	DefinitionAddComponent,
	FieldEditComponent,
	DetailAddComponent,
	TableComponent,
	TestComponent,
];

const components: Type<DisposableComponent>[] = [
	...PAGES,
	PagerComponent,
	SidebarComponent,
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
	AdminGuard
];

const interceptors = [{
	provide: HTTP_INTERCEPTORS,
	useClass: AdminHttpInterceptor,
	multi: true
}];

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
	]
})

export class AdminModule { }
