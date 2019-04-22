import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgForOfContext } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DisposableComponent } from '@designr/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

export enum FilterTypeEnum {
	Search = 0,
	Select = 1,
}

export interface Option {
	value: any;
	label: string;
}

export interface Column {
	key: string;
	label: any;
	getter?: (row: any, col: Column) => any;
	filterType?: FilterTypeEnum;
	filter?: any;
	values?: Option[];
	sort?: number;
}

export interface RowContext {
	keys: { [key: string]: Column };
	columns: Column[];
	rows: any[];
	row: any;
	getValue: Function;
}

export interface ActionItem {
	label: string;
	action?: (items: any[]) => boolean;
	enableOnSelect?: boolean;
	selectedItems?: any[];
}

@Component({
	selector: 'table-component',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent extends DisposableComponent implements OnInit {

	@ContentChild(TemplateRef) templateRef: TemplateRef<NgForOfContext<RowContext>>;

	@Input('items') set items(items: any[]) {
		this.items$.next(items);
	}

	@Input('columns') set columns(columns: Column[]) {
		this.columns$.next(columns);
	}

	@Input() sortable: boolean = false;
	@Input() filterable: boolean = false;
	@Input() selectable: boolean = false;
	@Input() editable: boolean = false;
	@Input() visible: boolean = false;
	@Input() duplicable: boolean = false;
	@Input() deletable: boolean = false;
	@Input() draggable: boolean = false;
	@Input() virtualized: boolean = false;
	@Input() itemSize: number = 32;
	@Input() actionItems: ActionItem[] = undefined;

	@Output() editRow: EventEmitter<any> = new EventEmitter<any>();
	@Output() viewRow: EventEmitter<any> = new EventEmitter<any>();
	@Output() copyRow: EventEmitter<any> = new EventEmitter<any>();
	@Output() deleteRow: EventEmitter<any> = new EventEmitter<any>();
	@Output() dropRow: EventEmitter<any[]> = new EventEmitter<any[]>();
	@Output() clickItem: EventEmitter<ActionItem> = new EventEmitter<ActionItem>();

	items$ = new BehaviorSubject<any[]>([]);
	columns$ = new BehaviorSubject<Column[]>([]);
	filters$ = new BehaviorSubject<{ key: string, value: any }[]>([]);
	sorts$ = new BehaviorSubject<{ key: string, value: any }[]>([]);

	public readonly filterTypes = FilterTypeEnum;
	public form: FormGroup = new FormGroup({});
	public keys: { [key: string]: Column };
	public rows: any[];
	public pagedRows: any[];
	public isActionsActive: boolean = false;
	public checkedAll: boolean = false;
	private selectedItems_: any[] = [];
	private formSubscription_;

	get columns(): Column[] {
		return this.columns$.getValue();
	}

	get visibleRows(): any[] {
		return (this.draggable || !this.virtualized) ? this.pagedRows : this.rows;
	}

	constructor() {
		super();
	}

	ngOnInit() {
		this.itemsAndColumns$().pipe(
			takeUntil(this.unsubscribe),
		).subscribe();
		this.rows$().pipe(
			takeUntil(this.unsubscribe),
		).subscribe(rows => this.rows = rows);
	}

	protected itemsAndColumns$(): Observable<any> {
		return combineLatest(this.items$, this.columns$).pipe(
			filter(x => x[0] !== undefined && x[1] !== undefined),
			// tap(x => console.log(x)),
			map(x => this.mapItemsAndColumns_(...x)),
		);
	}

	protected rows$(): Observable<any[]> {
		return combineLatest(this.items$, this.columns$, this.filters$, this.sorts$).pipe(
			filter(x => x[0] !== undefined && x[1] !== undefined),
			// tap(x => console.log(x)),
			map(x => this.filterAndSortRows_(...x)),
		);
	}

	private mapItemsAndColumns_(items, columns) {
		const values = {};
		const keys = {};
		columns.forEach(column => {
			if (column.filterType === FilterTypeEnum.Select) {
				const options = {};
				items.forEach(x => options[x[column.key]] = x[column.key]);
				const values = Object.keys(options).map(x => {
					return { value: options[x], label: x.toString() };
				});
				column.values = [{ value: undefined, label: 'All' }, ...values];
				values[column.key] = column.values[0].value;
			} else {
				column.values = null;
			}
			column.sort = column.sort || 0;
			keys[column.key] = column;
		});
		this.keys = keys;
		const form = {};
		columns.forEach(x => {
			form[x.key] = new FormControl();
		});
		this.form = new FormGroup(form);
		if (this.formSubscription_) {
			this.formSubscription_.unsubscribe();
		}
		this.formSubscription_ = this.form.valueChanges.pipe(
			debounceTime(100),
			map(values => {
				const filters = columns.map(x => {
					const value = values[x.key];
					x.filter = value;
					return { key: x.key, value: value };
				}).filter(x => x.value !== undefined && x.value !== null && x.value !== '');
				// console.log(values, filters);
				return filters;
			}),
			takeUntil(this.unsubscribe),
		).subscribe((values) => {
			// console.log('values', values);
			this.filters$.next(values);
		});
		this.form.patchValue(values);
		return columns;
	}

	private filterAndSortRows_(items, columns, filters, sorts): any[] {
		// console.log(filters);
		items = items.slice();
		if (this.filterable && filters.length) {
			items = items.filter(item => {
				let has = true;
				filters.forEach(x => {
					const value = this.getValue(item, this.keys[x.key]); // item[x.key];
					if (typeof value === 'number' || typeof value === 'boolean') {
						has = has && value === x.value;
					} else {
						has = has && value && value.toString().toLowerCase().indexOf(x.value.toLowerCase()) !== -1;
					}
				});
				return has;
			});
		}
		if (this.sortable && sorts.length) {
			items = items.sort((a, b) => {
				let s = 0;
				sorts.forEach(x => {
					if (s === 0) {
						const av = this.getValue(a, this.keys[x.key]); // a[x.key];
						const bv = this.getValue(b, this.keys[x.key]); // b[x.key];
						if (typeof av === 'number' && typeof bv === 'number') {
							s = (av - bv) * x.value;
						} else {
							s = ('' + av).localeCompare(bv) * x.value;
						}
					}
				})
				return s;
			});
		}
		return items;
	}

	public isDisabledItem(item: ActionItem): boolean {
		return item.enableOnSelect && !this.selectedItems_.length;
	}

	public toggleCheckAll() {
		this.checkedAll = !this.checkedAll;
		this.selectedItems_ = this.checkedAll ? this.visibleRows.slice() : [];
	}

	public toggleCheck(row: any) {
		const index = this.selectedItems_.indexOf(row);
		if (index !== -1) {
			this.selectedItems_.splice(index, 1);
		} else {
			this.selectedItems_.push(row);
		}
		this.checkedAll = this.selectedItems_.length === this.visibleRows.length;
	}

	public isSelected(row: any): boolean {
		return this.selectedItems_.indexOf(row) !== -1;
	}

	public doSort(col: Column) {
		const value = col.sort || 0;
		const values = [1, -1, 0];
		const index = values.indexOf(value) + 1;
		col.sort = values[index % values.length];
		/*
		const sorts = this.columns.map(col => {
			return { key: col.key, value: col.sort };
		}).filter(col => col.value !== 0);
		*/
		const sorts = [{ key: col.key, value: col.sort }].filter(col => col.value !== 0);
		this.sorts$.next(sorts);
	}

	public doClearFilters() {
		this.form.reset();
	}

	public doEditRow(row: any) {
		console.log('doEditRow', row);
		this.editRow.emit(row);
	}

	public doViewRow(row: any) {
		console.log('doViewRow', row);
		this.viewRow.emit(row);
	}

	public doCopyRow(row: any) {
		console.log('doCopyRow', row);
		this.copyRow.emit(row);
	}

	public doDeleteRow(row: any) {
		console.log('doDeleteRow', row);
		this.deleteRow.emit(row);
	}

	public onDropRow(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.pagedRows, event.previousIndex, event.currentIndex);
		console.log('onDropRow', event.previousIndex, event.currentIndex);
		this.dropRow.emit(this.pagedRows);
	}

	public doClickItem(event: MouseEvent, item: ActionItem) {
		const copy = Object.assign({}, item);
		copy.selectedItems = this.selectedItems_;
		this.clickItem.emit(copy);
		if (typeof item.action === 'function') {
			const clear = item.action(this.selectedItems_);
			if (clear) {
				this.checkedAll = false;
				this.selectedItems_ = [];
			}
		}
		this.isActionsActive = false;
	}

	public getValue(row: any, col: Column): any {
		if (typeof col.getter === 'function') {
			return col.getter(row, col);
		} else {
			return row[col.key];
		}
	}

	public getContext(row: any): RowContext {
		return {
			row: row,
			rows: this.rows,
			columns: this.columns,
			keys: this.keys,
			getValue: this.getValue
		};
	}

}
