import { Component, Input, OnInit } from '@angular/core';
import { ControlComponent } from '@designr/control';
import { isObservable, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Localization } from '../../admin/shared/store/store';
import { ControlLocalizedText, ControlLocalizedTextOption } from './control-localized-text';

@Component({
	selector: 'control-localized-text-component',
	templateUrl: 'control-localized-text.component.html',
})
export class ControlLocalizedTextComponent extends ControlComponent implements OnInit {

	@Input() option: ControlLocalizedText;
	options: ControlLocalizedTextOption[] = [];
	values: Localization;
	value: string;
	language: ControlLocalizedTextOption;
	compareWith: Function = this.compareWith_.bind(this);

	ngOnInit() {
		this.values = this.control.value;
		this.control.valueChanges.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(values => {
			this.values = values;
			this.value = this.values && this.language ? this.values[this.language.code] : null;
			console.log(values, this.value);
		});
		this.options$().pipe(
			takeUntil(this.unsubscribe)
		).subscribe(options => {
			options = options.filter(x => x.id !== null);
			this.options = options;
			this.language = options ? options[0] : null;
			// console.log(this.language);
			this.value = this.values && this.language ? this.values[this.language.code] : null;
			console.log(options, this.values, this.value);
		});
	}

	onInput(value: string) {
		console.log('onInput', value);
	}

	onSelect(value: string) {
		console.log('onSelect', value);
	}

	options$(): Observable<ControlLocalizedTextOption[]> {
		const options = this.option.options;
		if (options) {
			if (isObservable(options)) {
				return options;
			} else if (Array.isArray(options)) {
				return of(options);
			} else {
				return of([]);
			}
		} else {
			return of([]);
		}
	}

	compareWith_(a: ControlLocalizedTextOption | number, b: ControlLocalizedTextOption | number) {
		if (this.option.asObject) {
			a = a as ControlLocalizedTextOption;
			b = b as ControlLocalizedTextOption;
			return b ? a.id === b.id : a.id === null;
		} else {
			return b ? a === b : a === null;
		}
	}

}
