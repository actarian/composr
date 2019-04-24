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
import { DefinitionEditComponent } from './definition/definition-edit.component';
import { DetailAddComponent } from './detail/detail-add.component';
import { PagerComponent } from './shared/pager/pager.component';
import { TableComponent } from './shared/table/table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
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
	TestService,
];

const entryComponents: Type<DisposableComponent>[] = [
	AuthSigninComponent,
	DefinitionEditComponent,
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
