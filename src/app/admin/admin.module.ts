import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { AdminHttpInterceptor } from './admin.interceptor';
import { AdminResolve } from './admin.resolve';
import { AdminRouting } from './admin.routing';
import { AdminService } from './admin.service';
import { AuthSigninComponent } from './auth/auth-signin.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
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
	SettingsComponent,
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
