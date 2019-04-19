// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { AdminService } from '../admin.service';
import { ReflectionService } from '../core/reflection.service';

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
	@Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();

	shortName: string;

	types: any[] = [];

	constructor(
		public adminService: AdminService,
		public reflectionService: ReflectionService,
	) {
		super();
		this.shortName = this.adminService.admin.firstName.substr(0, 1) + this.adminService.admin.lastName.substr(0, 1);
	}

	ngOnInit() {
		this.reflectionService.getPageTypes().subscribe(types => this.types = types);
	}

	onClickNav(event: MouseEvent) {
		const node = event.target as HTMLElement;
		console.log(node, node.classList);
		if (node.classList.contains('active')) {
			this.expanded = !this.expanded;
		} else {
			this.expanded = true;
		}
		this.expand.emit(this.expanded);
	}

	onSign(): void {

	}

	onSignOut(): void {

	}

}
