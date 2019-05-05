import { NgModule, Type } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { SharedModule } from '../shared/shared.module';
import { PagesMenuComponent } from './pages-menu.component';
import { PagesComponent } from './pages.component';
import { PagesRouting } from './pages.routing';

const modules = [
	SharedModule,
	PagesRouting,
];

const services = [
];

const entryComponents: Type<DisposableComponent>[] = [
];

const components: Type<DisposableComponent>[] = [
	PagesComponent,
	PagesMenuComponent,
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

const interceptors = [];

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

export class PagesModule { }
