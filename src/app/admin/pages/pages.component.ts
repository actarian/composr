import { Component, OnInit } from '@angular/core';
import { DisposableComponent } from '@designr/core';

@Component({
	selector: 'pages-component',
	templateUrl: 'pages.component.html',
	styleUrls: ['pages.component.scss'],
})
export class PagesComponent extends DisposableComponent implements OnInit {

	constructor(
	) {
		super();
	}

	ngOnInit() {
	}

}
