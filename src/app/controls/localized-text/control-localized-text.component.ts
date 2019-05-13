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
	private values_: Localization[];
	private language_: string;

	get language(): string {
		return this.language_;
	}

	set language(language: string) {
		this.language_ = language;
		this.setValue();
	}

	get values(): Localization[] {
		return this.values_;
	}

	set values(values: Localization[]) {
		this.values_ = values ? values.slice().map(x => Object.assign({}, x)) : [];
		this.setFallbackLanguage(this.values_);
		this.setValue();
	}

	get activeLanguages(): ControlLocalizedTextOption[] {
		if (this.options && this.values_) {
			const o = this.options.filter(x => this.values_.find(v => v.code === x.code) !== undefined);
			return o;
		} else {
			return [];
		}
	}

	setFallbackLanguage(values: Localization[]) {
		const languages = values.filter(v => v.text !== undefined).map(v => v.code);
		const language = languages.find(x => x === this.language_);
		if (!language && languages.length) {
			this.language_ = languages[0];
		}
	}

	setValue() {
		const values = this.values_;
		const language = this.language_;
		let text;
		if (values && language) {
			let value = values.find(v => v.code === language);
			if (value === undefined) {
				value = { code: language, text: '' };
				values.push(value);
			}
			text = value.text;
		}
		this.value = text || null;
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

	onInput(text: string) {
		const values = this.values_;
		const value = values.find(v => v.code === this.language_);
		value.text = text;
		this.control.patchValue(values);
	}

	onSetLanguage(language: string) {
		this.language = language;
	}

	onRemoveLanguage(language: string) {
		const values = (this.control.value || []).slice();
		const value = values.find(v => v.code === language);
		const index = values.indexOf(value);
		if (index !== -1) {
			values.splice(index, 1);
		}
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
