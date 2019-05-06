import { NgModule, Type } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsMenuComponent } from './settings-menu.component';
import { SettingsComponent } from './settings.component';
import { SettingsRouting } from './settings.routing';

const modules = [
	SharedModule,
	SettingsRouting,
];

const services = [
];

const entryComponents: Type<DisposableComponent>[] = [
];

const components: Type<DisposableComponent>[] = [
	SettingsComponent,
	SettingsMenuComponent,
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

export class SettingsModule { }
