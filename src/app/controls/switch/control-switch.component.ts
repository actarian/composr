import { Component, Input, OnInit } from '@angular/core';
import { ControlComponent } from '@designr/control';
import { ControlSwitch } from './control-switch';

@Component({
	selector: 'control-switch-component',
	templateUrl: 'control-switch.component.html',
})
export class ControlSwitchComponent extends ControlComponent implements OnInit {

	@Input() option: ControlSwitch;

	ngOnInit() {
		/*
		this.form.valueChanges.pipe(
			tap(value => {
				value[this.control.key] = value[this.control.key].replace('a', '');
			}),
			takeUntil(this.unsubscribe),
		).subscribe((value) => {
		});
		*/
	}

	onInput(event) {
		// event.target.value = this.form.value[this.control.key];
	}

	/*
	protected onChange(event) {
		event.target.value = this.form.value[this.control.key];
	}
	*/

}
