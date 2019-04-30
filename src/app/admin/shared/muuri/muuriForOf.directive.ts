import { NgForOf } from '@angular/common';
import { NgForOfContext } from '@angular/common/src/directives/ng_for_of';
import { AfterContentChecked, Directive, Input, IterableDiffers, NgIterable, NgZone, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import * as muuri from 'muuri';

@Directive({
	selector: '[muuriFor][muuriForOf]'
})
// tslint:disable-next-line: directive-class-suffix
export class MuuriForOf<T> extends NgForOf<T> implements OnChanges, AfterContentChecked {

	private muuri_: any;

	@Input() set muuriForOf(ngForOf: NgIterable<T>) {
		this.ngForOf = ngForOf;
	}

	constructor(
		private viewContainerRef: ViewContainerRef,
		private templateRef: TemplateRef<NgForOfContext<T>>,
		private differs: IterableDiffers,
		private zone: NgZone,
		// cdr: ChangeDetectorRef
	) {
		// super(viewContainer, template, differs, cdr);
		super(viewContainerRef, templateRef, differs);
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log('MuuriForOf.ngOnChanges', changes);
	}

	ngAfterContentChecked(): void {
		console.log('MuuriForOf.ngAfterContentChecked');
		this.zone.runOutsideAngular(() => {
			this.onMuuri();
		});
		/*
		if ('ngForIn' in changes) {
			this.ngForOf = Object.keys(this.ngForIn);
			const currentValue: any[] = Object.keys(changes['ngForIn'].currentValue);
			const previousValue: any[] = Object.keys(changes['ngForIn'].previousValue);
			changes['ngForOf'] = new SimpleChange(previousValue, currentValue);
			super.ngOnChanges(changes);
		}
		*/
	}

	onMuuri() {
		const node = this.viewContainerRef.element.nativeElement.parentNode;
		if (!this.muuri_) {
			this.muuri_ = new muuri(node, {
				layoutDuration: 0,
				layoutEasing: 'ease-in-out',
				layout: {
					fillGaps: true,
					horizontal: false,
					alignRight: false,
					alignBottom: false,
					rounding: false
				}
			});
		} else {
			const previousItems = this.muuri_.getItems().map(x => x.getElement());
			// console.log('MuuriDirective.previousItems', previousItems);
			const items = Array.from(node.querySelectorAll('.listing__item'));
			const newItems = items.filter(x => previousItems.indexOf(x) === -1);
			const removeItems = previousItems.filter(x => items.indexOf(x) === -1);
			console.log('MuuriDirective', 'newItems', newItems, 'removeItems', removeItems);
			this.muuri_.remove(removeItems);
			this.muuri_.add(newItems);
			// this.muuri_.refreshItems(items).layout();
		}
	}

	// img responsive placeholder
	// width="500" [height]="asset.height / asset.width * 500"

}
