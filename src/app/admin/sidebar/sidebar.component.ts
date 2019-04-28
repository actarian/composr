// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DisposableComponent, LocalStorageService, MenuItem } from '@designr/core';
import { ModalCompleteEvent, ModalService } from '@designr/ui';
import { first } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { StoreService } from '../core/store.service';
import { DefinitionAddComponent } from '../definition/definition-add.component';
import { DetailAddComponent } from '../detail/detail-add.component';

@Component({
	selector: 'sidebar-component',
	styleUrls: ['./sidebar.component.scss'],
	templateUrl: './sidebar.component.html',
	encapsulation: ViewEncapsulation.Emulated,
	/*
	animations: [
		trigger('fadeIn', [
			state('in', style({ opacity: 1, transform: 'scaleY(1)' })),
			transition('void => *', [
				style({ opacity: 0, transform: 'scaleY(0)' }),
				animate('.5s cubic-bezier(.57, 0.08, .18, .99)')
			]),
			transition('* => void', [
				animate('.3s cubic-bezier(.57, 0.08, .18, .99)', style({ opacity: 0, transform: 'scaleY(0)' }))
			])
		])
	]
	*/
})

export class SidebarComponent extends DisposableComponent implements OnInit {

	expanded: boolean = false;
	@Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>(true);

	shortName: string;

	types: any[] = [];

	constructor(
		private router: Router,
		private storage: LocalStorageService,
		private modalService: ModalService,
		public adminService: AdminService,
		public storeService: StoreService,
	) {
		super();
		this.shortName = this.adminService.admin.firstName.substr(0, 1) + this.adminService.admin.lastName.substr(0, 1);
	}

	ngOnInit() {
		this.expanded = this.storage.get('expanded') || false;
		this.expand.emit(this.expanded);
		this.storeService.getTypes('definition', 'page').subscribe(types => this.types = types);
	}

	onClickNav(event: MouseEvent) {
		const node = event.target as HTMLElement;
		if (node.classList.contains('active')) {
			this.expanded = !this.expanded;
		} else {
			this.expanded = true;
		}
		this.storage.set('expanded', this.expanded);
		this.expand.emit(this.expanded);
	}

	onEditType(event: MouseEvent, item: MenuItem) {
		event.preventDefault();
		event.stopPropagation();
		this.router.navigate(['/admin/content', 'page', 'definition', item.id]);
	}

	onAddItem(event: MouseEvent) {
		// this.router.navigate(['/admin/content', 'page', 'add']);
		this.modalService.open({ component: DetailAddComponent, data: 'page' }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('onAddItem.ModalCompleteEvent', e.data);
			}
		});
	}

	onAddType(event: MouseEvent) {
		// this.router.navigate(['/admin/content', 'page', 'definition', 'add']);
		this.modalService.open({ component: DefinitionAddComponent, data: 'page' }).pipe(
			first()
		).subscribe(e => {
			if (e instanceof ModalCompleteEvent) {
				console.log('onAddType.ModalCompleteEvent', e.data);
			}
		});
	}

	onSign(): void {

	}

	onSignOut(): void {

	}

}
