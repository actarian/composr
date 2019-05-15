import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisposableComponent, LocalStorageService } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first, takeUntil } from 'rxjs/operators';
import { DefinitionAddComponent } from '../shared/definition/definition-add.component';
import { DetailAddComponent } from '../shared/detail/detail-add.component';
import { StoreService } from '../shared/store/store.service';

@Component({
	selector: 'contents-menu-component',
	templateUrl: 'contents-menu.component.html',
	styleUrls: ['contents-menu.component.scss'],
})
export class ContentsMenuComponent extends DisposableComponent implements OnInit {

	expanded: boolean = false;
	@Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>(true);
	types: any[] = [];
	otherTypes: any[] = [];
	type: any;

	constructor(
		private route: ActivatedRoute,
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
		this.route.params.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			// console.log('PagesMenuComponent', data);
		});
		this.storeService.getDefinitionsOfType('Content').subscribe(types => {
			this.types = types;
			this.otherTypes = types.filter(x => x.model !== 'Content');
			if (!this.type) {
				this.type = types.find(x => x.model === 'Content');
				this.router.navigate([this.type.model, this.type.id, 'items'], { relativeTo: this.route });
			}
		});
	}

	onEditType(event: MouseEvent, item: any) {
		event.preventDefault();
		event.stopPropagation();
		this.router.navigate([item.model, item.id, 'edit'], { relativeTo: this.route });
	}

	onAddItem(event: MouseEvent) {
		this.modalService.open({ component: DetailAddComponent, data: this.type.id }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('ContentsMenuComponent.onAddItem.ModalCompleteEvent', e.data);
			}
		});
	}

	onAddType(event: MouseEvent) {
		this.modalService.open({
			component: DefinitionAddComponent, data: {
				definitionModel: 'ContentType',
				typeModel: 'Content',
			}
		}).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('ContentsMenuComponent.onAddType.ModalCompleteEvent', e.data);
			}
		});
	}

}
