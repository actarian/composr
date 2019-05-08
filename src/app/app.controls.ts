import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule, Controls } from '@designr/control';
import { CoreModule } from '@designr/core';
import { ControlCustom } from './controls/custom/control-custom';
import { ControlCustomComponent } from './controls/custom/control-custom.component';
import { CustomAccessorDirective } from './controls/custom/custom.accessor';
import { ControlLocalizedText } from './controls/localized-text/control-localized-text';
import { ControlLocalizedTextComponent } from './controls/localized-text/control-localized-text.component';
import { ControlLocalizedTextarea } from './controls/localized-textarea/control-localized-textarea';
import { ControlLocalizedTextareaComponent } from './controls/localized-textarea/control-localized-textarea.component';
import { ControlMulti } from './controls/multi/control-multi';
import { ControlMultiModalComponent } from './controls/multi/control-multi-modal.component';
import { ControlMultiComponent } from './controls/multi/control-multi.component';
import { ControlSwitch } from './controls/switch/control-switch';
import { ControlSwitchComponent } from './controls/switch/control-switch.component';
import { SwitchComponent } from './controls/switch/switch.component';

export const directives = [
	CustomAccessorDirective,
];

export const controls = [
	ControlCustomComponent,
	ControlSwitchComponent,
	SwitchComponent,
	ControlMultiComponent,
	ControlLocalizedTextComponent,
	ControlLocalizedTextareaComponent,
];

export const entryComponents = [
	ControlMultiModalComponent,
];

export const CONTROLS: Controls = {
	'custom': { component: ControlCustomComponent, model: ControlCustom },
	'switch': { component: ControlSwitchComponent, model: ControlSwitch },
	'multi': { component: ControlMultiComponent, model: ControlMulti },
	'localized-text': { component: ControlLocalizedTextComponent, model: ControlLocalizedText },
	'localized-textarea': { component: ControlLocalizedTextareaComponent, model: ControlLocalizedTextarea },
};

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		ControlModule.forRoot({
			controls: CONTROLS,
		}),
	],
	declarations: [
		...directives,
		...controls,
		...entryComponents,
	],
	exports: [
		ControlModule,
		...directives,
		...controls,
		...entryComponents,
	],
	entryComponents: [
		...controls,
		...entryComponents,
	],
})

export class AppControls { }
