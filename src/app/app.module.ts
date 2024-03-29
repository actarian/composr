import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { DisposableComponent } from '@designr/core';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppControls } from './app.controls';
import { AppCore } from './app.core';
import { AppDatas } from './app.datas';
import { AppEditor } from './app.editor';
import { AppPages, layouts, pages } from './app.pages';
import { AppPlugins } from './app.plugins';
import { AppRouting } from './app.routing';
import { AppSections, sections } from './app.sections';
import { AppUI } from './app.ui';
import { AuthForgottenComponent } from './auth/auth-forgotten.component';
import { AuthSignInComponent } from './auth/auth-sign-in.component';
import { AuthSignUpComponent } from './auth/auth-sign-up.component';
import { AuthComponent } from './auth/auth.component';
import { CookieComponent } from './shared/cookie/cookie.component';
import { DebugComponent } from './shared/debug/debug.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { PictureComponent } from './shared/picture/picture.component';
import { SpritesComponent } from './shared/sprites/sprites.component';

const modules = [
	CommonModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	AdminModule, // first
	AppRouting, // second
	AppCore,
	AppDatas,
	AppControls,
	AppEditor,
	AppPages,
	AppPlugins,
	AppSections,
	AppUI,
];

const services = [
	// UserService,
];

const shared: Type<DisposableComponent>[] = [
	CookieComponent,
	DebugComponent,
	FooterComponent,
	// HeaderComponent,
	LoaderComponent,
	PictureComponent,
	SpritesComponent,
];

const auth = [
	AuthForgottenComponent,
	AuthSignInComponent,
	AuthSignUpComponent,
	AuthComponent,
];

const directives = [
];

const pipes = [
];

const validators = [
];

const guards = [
];

@NgModule({
	imports: [
		BrowserModule.withServerTransition(environment.core.transition),
		BrowserTransferStateModule,
		...modules,
	],
	providers: [
		...pipes,
		...validators,
		...guards,
	],
	declarations: [
		AppComponent,
		...directives,
		...layouts,
		...pages,
		...sections,
		...shared,
		...auth,
		...pipes,
		...validators,
	],
	entryComponents: [
		...layouts,
		...pages,
		...sections,
		...auth,
	]
})

export class AppModule { }
