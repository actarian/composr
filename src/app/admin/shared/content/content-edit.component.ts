import { Component, Input, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { TabState } from '../tabs/tab.service';

@Component({
	selector: 'content-edit-component',
	templateUrl: 'content-edit.component.html',
	styleUrls: ['content-edit.component.scss'],
})
export class ContentEditComponent extends DisposableComponent implements OnInit {

	@Input() state: TabState;

	constructor(
	) {
		super();
	}

	ngOnInit() {

	}

}
