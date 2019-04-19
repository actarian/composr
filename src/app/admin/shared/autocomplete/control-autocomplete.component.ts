import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlComponent } from '@designr/control';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ControlAutocomplete } from './control-autocomplete';

@Component({
	selector: 'control-autocomplete-component',
	templateUrl: 'control-autocomplete.component.html',
})
export class ControlAutocompleteComponent extends ControlComponent implements AfterViewInit {

	@ViewChild('query') query: ElementRef;
	@Input() option: ControlAutocomplete;
	items: { value: any; label: string; }[] = [];
	focus: boolean = false;
	busy: boolean = true;

	ngAfterViewInit() {
		this.autocomplete$().pipe(
			takeUntil(this.unsubscribe),
		).subscribe(items => {
			// console.log('ControlAutocompleteComponent', items.length);
			this.items = items;
			this.busy = false;
		});
		this.control.valueChanges.pipe(
			tap(value => console.log(value)),
			switchMap(value => this.option.source.pipe(
				map(items => {
					const item = items.find(item => item.value === value);
					return item ? item.label : '';
				}),
			)),
			takeUntil(this.unsubscribe),
		).subscribe((label) => {
			console.log('control.valueChanges', label);
			this.query.nativeElement.value = label;
		});
	}

	onFocus() {
		this.focus = true;
	}

	onBlur() {
		this.focus = false;
	}

	onSelect(item) {
		// console.log('ControlAutocompleteComponent.onSelect', item.value, item.label);
		this.control.setValue(item.value);
		this.query.nativeElement.value = item.label;
		this.focus = false;
	}

	autocomplete$(): Observable<{ value: any; label: string; }[]> {
		return this.input$().pipe(
			switchMap(x => {
				return this.option.source.pipe(
					map(items => {
						const value = this.control.value;
						if (value && x === '') {
							const item = items.find(x => x.value === value);
							const label = item ? item.label : '';
							this.query.nativeElement.value = label;
						}
						return items.filter(item => item.label.toLowerCase().indexOf(x) !== -1);
					}),
				);
			}),
			tap(x => console.log('ControlAutocompleteComponent.autocomplete$', x.length))
		);
	}

	input$(): Observable<string> {
		return fromEvent<any>(this.query.nativeElement, 'keyup').pipe(
			map(event => event.target.value),
			startWith(''),
			debounceTime(400),
			distinctUntilChanged(),
			tap(x => console.log('ControlAutocompleteComponent.input$', x))
		);
	}

}
