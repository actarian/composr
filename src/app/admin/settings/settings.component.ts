import { Component } from '@angular/core';
import { DisposableComponent } from '@designr/core';

@Component({
	selector: 'settings-component',
	templateUrl: 'settings.component.html',
	styleUrls: ['settings.component.scss'],
})
export class SettingsComponent extends DisposableComponent {
	constructor(
	) {
		super();
	}
}
