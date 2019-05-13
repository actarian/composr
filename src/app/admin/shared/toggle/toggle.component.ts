
import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlAccessor } from '@designr/control';

export const SWITCH_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	// tslint:disable-next-line:no-use-before-declare
	useExisting: forwardRef(() => ToggleComponent),
	multi: true
};

@Component({
	selector: 'toggle-component',
	styleUrls: ['./toggle.component.scss'],
	templateUrl: './toggle.component.html',
	providers: [SWITCH_VALUE_ACCESSOR],
	encapsulation: ViewEncapsulation.Emulated,
})

export class ToggleComponent extends ControlAccessor<boolean> {

	@Input() off: string = 'off';
	@Input() on: string = 'on';
	innerValue: boolean;

	protected formatValue(value: boolean): string {
		this.innerValue = value;
		return value ? 'true' : 'false';
	}

	protected parseValue(value: any): boolean {
		this.innerValue = Boolean(value);
		return this.innerValue;
	}

	toggle() {
		this.innerValue = !this.innerValue;
		this.onChange(this.innerValue);
	}

}
