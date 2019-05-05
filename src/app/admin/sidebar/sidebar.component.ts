// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisposableComponent, LocalStorageService } from '@designr/core';
import { AdminService } from '../admin.service';

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
		private storage: LocalStorageService,
		public adminService: AdminService,
	) {
		super();
		this.shortName = this.adminService.admin.firstName.substr(0, 1) + this.adminService.admin.lastName.substr(0, 1);
	}

	ngOnInit() {
		this.expanded = this.storage.get('expanded') || false;
		this.expand.emit(this.expanded);
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

	onSign(): void {

	}

	onSignOut(): void {

	}

}
