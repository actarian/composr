import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'loader-component',
	templateUrl: 'loader.component.html',
	styleUrls: ['loader.component.scss']
})
export class LoaderComponent extends DisposableComponent implements AfterViewInit {

	// @ViewChild('element', { read: ElementRef }) element: ElementRef;

	private loading_: boolean = false;

	set loading(loading: boolean) {
		if (this.loading_ !== loading) {
			this.zone.runOutsideAngular(() => {
				this.loading_ = loading;
				if (loading) {
					this.renderer.removeClass(this.elementRef.nativeElement, 'finish');
					this.renderer.addClass(this.elementRef.nativeElement, 'active');
				} else {
					this.renderer.removeClass(this.elementRef.nativeElement, 'active');
					this.renderer.addClass(this.elementRef.nativeElement, 'finish');
					setTimeout(() => {
						this.renderer.removeClass(this.elementRef.nativeElement, 'finish');
					}, 600);
				}
			});
			console.log('LoaderComponent.loading', loading);
		}
	}

	constructor(
		@Inject(PLATFORM_ID) private platformId: string,
		private zone: NgZone,
		private renderer: Renderer2,
		private elementRef: ElementRef,
		private router: Router,
	) {
		super();
	}

	ngAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.loading = true;
			this.router.events.pipe(
				takeUntil(this.unsubscribe),
			).subscribe((event: RouterEvent) => {
				switch (true) {
					case event instanceof NavigationStart: {
						this.loading = true;
						break;
					}
					case event instanceof NavigationEnd:
					case event instanceof NavigationCancel:
					case event instanceof NavigationError: {
						this.loading = false;
						break;
					}
					default: {
						break;
					}
				}
			});
		}
	}

}
