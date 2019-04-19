import { Component, Input, TemplateRef } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { ILayoutComponent, Page } from '@designr/page';

@Component({
	selector: 'main-layout-component',
	templateUrl: 'main-layout.component.html',
	styleUrls: ['main-layout.component.scss'],
})
export class MainLayoutComponent extends DisposableComponent implements ILayoutComponent {
	@Input() template: TemplateRef<any>;
	page?: Page;
}
