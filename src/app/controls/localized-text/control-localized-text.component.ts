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
	value: string;
	// compareWith: Function = this.compareWith_.bind(this);
	private values_: Localization;
	private language_: string;

	get language(): string {
		return this.language_;
	}

	set language(language: string) {
		this.language_ = language;
		this.setValue();
		// console.log(language, this.value);
	}

	get values(): Localization {
		return this.values_;
	}

	set values(values: Localization) {
		this.values_ = values;
		this.setValue();
		// console.log(values, this.value);
	}

	setValue() {
		const values = this.values;
		const language = this.language;
		let value;
		if (values && language) {
			value = values[this.language];
		}
		this.value = value || null;
	}

	ngOnInit() {
		this.values = this.control.value;
		this.options$().pipe(
			takeUntil(this.unsubscribe)
		).subscribe(options => {
			options = options.filter(x => x.id !== null);
			this.options = options;
			this.language = options ? options[0].code : null;
		});
		this.control.valueChanges.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(values => {
			this.values = values;
		});
	}

	onInput(value: string) {
		// console.log('onInput', value);
		const values = Object.assign({}, this.control.value || {});
		values[this.language] = value;
		// console.log('values', values);
		this.control.patchValue(values);
	}

	onSelect(language: string) {
		this.language = language;
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

	/*
	compareWith_(a: ControlLocalizedTextOption | number, b: ControlLocalizedTextOption | number) {
		if (this.option.asObject) {
			a = a as ControlLocalizedTextOption;
			b = b as ControlLocalizedTextOption;
			return b ? a.id === b.id : a.id === null;
		} else {
			return b ? a === b : a === null;
		}
	}
	*/

}
