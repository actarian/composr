import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisposableComponent, LocalStorageService } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first } from 'rxjs/operators';
import { DefinitionAddComponent } from '../shared/definition/definition-add.component';
import { StoreService } from '../shared/store/store.service';

@Component({
	selector: 'settings-menu-component',
	templateUrl: 'settings-menu.component.html',
	styleUrls: ['settings-menu.component.scss'],
})
export class SettingsMenuComponent extends DisposableComponent implements OnInit {

	expanded: boolean = false;
	@Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>(true);

	types: any[] = [];

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
		this.storeService.getDefinitionsOfType('Entity').subscribe(types => {
			if (!this.types) {
				const firstType = types[0];
				this.router.navigate([firstType.model, firstType.id, 'items'], { relativeTo: this.route });
			}
			this.types = types;
		});
	}

	onEditType(event: MouseEvent, item: any) {
		event.preventDefault();
		event.stopPropagation();
		this.router.navigate([item.model, item.id, 'edit'], { relativeTo: this.route });
	}

	/*
	onAddItem(event: MouseEvent) {
		// !!! make it generic
		this.modalService.open({ component: DetailAddComponent, data: this.type.id }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('SettingsMenuComponent.onAddItem.ModalCompleteEvent', e.data);
			}
		});
	}
	*/

	onAddType(event: MouseEvent) {
		// !!! make PageType dynamic
		this.modalService.open({
			component: DefinitionAddComponent, data: {
				definitionModel: 'Definition',
				typeModel: 'Entity',
			}
		}).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('SettingsMenuComponent.onAddType.ModalCompleteEvent', e.data);
			}
		});
	}

}
