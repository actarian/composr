import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
		this.storeService.getTypes('definition', 'Entity').subscribe(types => {
			this.types = types;
		});
	}

	onEditType(event: MouseEvent, type: string) {
		event.preventDefault();
		event.stopPropagation();
		const typeItem: any = this.types.find(x => x.key === type);
		this.router.navigate(['/admin/settings', 'definition', typeItem.key, typeItem.id]);
	}

	onAddType(event: MouseEvent) {
		// !!! make PageType dynamic
		this.modalService.open({ component: DefinitionAddComponent, data: 'Entity' }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('onAddType.ModalCompleteEvent', e.data);
			}
		});
	}

}
