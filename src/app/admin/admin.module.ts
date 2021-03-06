import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { AdminComponent } from './admin.component';
import { AdminHttpInterceptor } from './admin.interceptor';
import { AdminResolve } from './admin.resolve';
import { AdminRouting } from './admin.routing';
import { AdminService } from './admin.service';
import { AuthSigninComponent } from './auth/auth-signin.component';
import { AuthComponent } from './auth/auth.component';
import { CustomRouteReuseStrategy } from './custom-route-reuse.strategy';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestComponent } from './test/test.component';
import { TestService } from './test/test.service';
import { UsersComponent } from './users/users.component';

const modules = [
	SharedModule,
	AdminRouting,
	// PageModule // last
];

const services = [
	{ provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
	AdminService,
	AdminResolve,
	TestService,
];

const entryComponents: Type<DisposableComponent>[] = [
	AuthSigninComponent,
	TestComponent,
];

const components: Type<DisposableComponent>[] = [
	AdminComponent,
	AuthComponent,
	DashboardComponent,
	SidebarComponent,
	TestComponent,
	UsersComponent,
	...entryComponents,
];

const directives = [
];

const pipes = [
];

const validators = [
];

const guards = [
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
