import { Component, Input, OnInit } from '@angular/core';
import { ControlComponent } from '@designr/control';
import { isObservable, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Localization } from '../../admin/shared/store/store';
import { ControlLocalizedText, ControlLocalizedTextOption } from './control-localized-text';

@Component({
	selector: 'control-localized-text-component',
	styleUrls: ['control-localized-text.component.scss'],
	templateUrl: 'control-localized-text.component.html',
})
export class ControlLocalizedTextComponent extends ControlComponent implements OnInit {

	@Input() option: ControlLocalizedText;
	options: ControlLocalizedTextOption[] = [];
	value: string;
	compareWith: Function = this.compareWith_.bind(this);
	private values_: Localization;
	private language_: string;

	get language(): string {
		return this.language_;
	}

	set language(language: string) {
		this.language_ = language;
		this.setValue();
	}

	get values(): Localization {
		return this.values_;
	}

	set values(values: Localization) {
		this.values_ = Object.assign({}, values);
		this.setFallbackLanguage(this.values_);
		this.setValue();
	}

	get activeLanguages(): ControlLocalizedTextOption[] {
		if (this.options && this.values_) {
			const o = this.options.filter(x => this.values_[x.code] !== undefined);
			return o;
		} else {
			return [];
		}
	}

	setFallbackLanguage(values: Localization) {
		const languages = Object.keys(values).filter(code => values[code] !== undefined);
		const language = languages.find(x => x === this.language_);
		if (!language && languages.length) {
			this.language_ = languages[0];
		}
	}

	setValue() {
		const values = this.values_;
		const language = this.language_;
		let value;
		if (values && language) {
			values[language] = values[language] || '';
			value = values[language];
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
		const values = Object.assign({}, this.control.value || {});
		values[this.language] = value;
		this.control.patchValue(values);
	}

	onSetLanguage(language: string) {
		this.language = language;
	}

	onRemoveLanguage(language: string) {
		const values = Object.assign({}, this.control.value || {});
		delete values[this.language];
		this.setFallbackLanguage(values);
		this.control.patchValue(values);
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
		return b ? a === b : a === null;
	}

}
