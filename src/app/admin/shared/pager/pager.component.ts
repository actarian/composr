import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisposableComponent } from '@designr/core';
import { BehaviorSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'pager-component',
	templateUrl: 'pager.component.html',
	styleUrls: ['pager.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerComponent extends DisposableComponent implements OnInit {

	perpages = [25, 50, 75, 100, 150, 200];

	protected rows_ = new BehaviorSubject<any[]>(undefined);
	get rows(): any[] {
		return this.rows_.getValue();
	}
	@Input('rows') set rows(value: any[]) {
		this.rows_.next(value);
	}
	@Input() perpage: number = this.perpages[0];
	@Input() maxPages: number = 10;
	@Output() pagedRows: EventEmitter<any[]> = new EventEmitter<any[]>(true);

	totalPages: number[] = [];
	visiblePages: number[] = [];

	pageCount: number;
	page: number;
	pageIndex: number;

	get from(): number {
		return this.page * this.perpage;
	}

	get to(): number {
		return this.rows ? Math.min(this.rows.length, this.page * this.perpage + this.perpage) : 0;
	}

	constructor(
		// protected changeDetector: ChangeDetectorRef,
	) {
		super();
	}

	ngOnInit() {
		this.rows_.pipe(
			filter(x => x !== undefined),
			// delay(1),
			takeUntil(this.unsubscribe),
		).subscribe(rows => {
			this.setPages(rows);
			// console.log('rows', rows.length);
		});
	}

	onSetPerPage(perpage) {
		// console.log('onSetPerPage', perpage);
		this.setPages(this.rows);
	}

	setPages(rows: any[]) {
		this.pageCount = Math.ceil(rows.length / this.perpage);
		this.totalPages = new Array(this.pageCount).fill(null).map((x, i) => i);
		// console.log('PagerComponent.setPages', 'rows', rows.length, 'pages', this.pageCount, 'perPage', this.perpage);
		this.setPageIndex(0);
		this.setPage(0);
	}

	setPageIndex(pageIndex: number) {
		this.pageIndex = pageIndex;
		const index = this.pageIndex * this.maxPages;
		this.visiblePages = this.totalPages.slice(index, index + this.maxPages);
		// console.log('PagerComponent.setPageIndex', pageIndex);
	}

	setPage(page: number = 0) {
		this.page = page;
		const pagedRows = this.rows.slice(this.page * this.perpage, this.page * this.perpage + this.perpage);
		// console.log('PagerComponent.setPage', page, pagedRows.length);
		this.pagedRows.emit(pagedRows);
		// console.log('setPage', page, pagedRows.length);
		// this.changeDetector.markForCheck();
	}

	hasPagesBefore(): boolean {
		return this.pageIndex > 0;
	}

	hasPagesAfter(): boolean {
		return (this.pageIndex + 1) * this.maxPages < this.pageCount;
	}

	showPreviousPages(): void {
		this.setPageIndex(this.pageIndex - 1);
		this.setPage(this.pageIndex * this.maxPages);
	}

	showNextPages(): void {
		this.setPageIndex(this.pageIndex + 1);
		this.setPage(this.pageIndex * this.maxPages);
	}

	showFirstPage(): void {
		this.setPageIndex(0);
		this.setPage(this.pageIndex * this.maxPages);
	}

	showLastPage(): void {
		this.setPageIndex(Math.ceil(this.pageCount / this.maxPages) - 1);
		this.setPage(this.pageCount - 1);
	}

}
