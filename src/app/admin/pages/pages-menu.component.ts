import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DisposableComponent, LocalStorageService } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first } from 'rxjs/operators';
import { DefinitionAddComponent } from '../shared/definition/definition-add.component';
import { DetailAddComponent } from '../shared/detail/detail-add.component';
import { StoreService } from '../shared/store/store.service';

@Component({
	selector: 'pages-menu-component',
	templateUrl: 'pages-menu.component.html',
	styleUrls: ['pages-menu.component.scss'],
})
export class PagesMenuComponent extends DisposableComponent implements OnInit {

	expanded: boolean = false;
	@Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>(true);
	types: any[] = [];
	type: any;

	constructor(
		private router: Router,
		private storage: LocalStorageService,
		private modalService: ModalService,
		public storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.expanded = this.storage.get('expanded') || false;
		this.expand.emit(this.expanded);
		this.storeService.getTypes('definition', 'Page').subscribe(types => {
			this.types = types;
			this.type = types.find(x => x.model === 'Page');
		});
	}

	onEditType(event: MouseEvent, type: any) {
		event.preventDefault();
		event.stopPropagation();
		this.router.navigate(['/admin/pages', 'definition', type.model, type.id]);
	}

	onAddItem(event: MouseEvent) {
		// !!! make it generic
		this.modalService.open({ component: DetailAddComponent, data: 'Page' }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('onAddItem.ModalCompleteEvent', e.data);
			}
		});
	}

	onAddType(event: MouseEvent) {
		// !!! make PageType dynamic
		this.modalService.open({ component: DefinitionAddComponent, data: 'PageType' }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('onAddType.ModalCompleteEvent', e.data);
			}
		});
	}

}
