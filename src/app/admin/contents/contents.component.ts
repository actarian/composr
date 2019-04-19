import { Component } from '@angular/core';
import { DisposableComponent } from '@designr/core';

@Component({
	selector: 'contents-component',
	templateUrl: 'contents.component.html',
	styleUrls: ['contents.component.scss'],
})
export class ContentsComponent extends DisposableComponent {
	constructor(
	) {
		super();
	}
}
