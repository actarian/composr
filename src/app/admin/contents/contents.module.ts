import { NgModule, Type } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { SharedModule } from '../shared/shared.module';
import { ContentsMenuComponent } from './contents-menu.component';
import { ContentsComponent } from './contents.component';
import { ContentsRouting } from './contents.routing';

const modules = [
	SharedModule,
	ContentsRouting,
];

const services = [
];

const entryComponents: Type<DisposableComponent>[] = [
];

const components: Type<DisposableComponent>[] = [
	ContentsComponent,
	ContentsMenuComponent,
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

export class ContentsModule { }
