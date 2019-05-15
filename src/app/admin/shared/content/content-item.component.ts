import { Component, Input, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { TabState } from '../tabs/tab.service';

@Component({
	selector: 'content-item-component',
	templateUrl: 'content-item.component.html',
	styleUrls: ['content-item.component.scss'],
})
export class ContentItemComponent extends DisposableComponent implements OnInit {

	@Input() state: TabState;

	constructor(
	) {
		super();
	}

	ngOnInit() {

	}

}
