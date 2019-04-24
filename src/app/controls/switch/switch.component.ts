
import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlAccessor } from '@designr/control';

export const SWITCH_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	// tslint:disable-next-line:no-use-before-declare
	useExisting: forwardRef(() => SwitchComponent),
	multi: true
};

@Component({
	selector: 'switch-component',
	templateUrl: './switch.component.html',
	styleUrls: ['./switch.component.scss'],
	providers: [SWITCH_VALUE_ACCESSOR],
	encapsulation: ViewEncapsulation.Emulated,
})

export class SwitchComponent extends ControlAccessor<boolean> {

	innerValue: boolean;

	protected formatValue(value: boolean): string {
		// console.log('formatValue', value);
		this.innerValue = value;
		return value ? 'true' : 'false';
	}

	protected parseValue(value: any): boolean {
		// console.log('parseValue', value);
		this.innerValue = Boolean(value);
		return this.innerValue;
	}

	toggle() {
		this.innerValue = !this.innerValue;
		this.onChange(this.innerValue);
	}

}
