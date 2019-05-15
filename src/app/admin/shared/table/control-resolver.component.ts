import { NgForOfContext } from '@angular/common';
import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ContentChild, Input, OnDestroy, OnInit, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlComponent, ControlService, IControlOption } from '@designr/control';
import { DisposableComponent } from '@designr/core';

@Component({
	selector: 'control-resolver',
	template: '<ng-template #outlet></ng-template>',
})
export class ControlResolverComponent extends DisposableComponent implements OnInit, OnDestroy, AfterViewInit {

	@ContentChild('inputRef') inputRef: TemplateRef<NgForOfContext<ControlComponent>>;
	@ContentChild('errorRef') errorRef: TemplateRef<NgForOfContext<ControlComponent>>;
	@ViewChild('outlet', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

	@Input() option: IControlOption<any>;
	@Input() form: FormGroup;

	private componentRef: ComponentRef<ControlComponent>;

	get context(): ControlResolverComponent {
		return this;
	}

	get classes(): { [key: string]: boolean } {
		// console.log('control', this.option.key, this.form.controls);
		return this.componentRef ? this.componentRef.instance.classes : null;
	}

	get control(): AbstractControl {
		// console.log('control', this.option.key, this.form.controls);
		return this.componentRef ? this.componentRef.instance.control : null;
	}

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private controlService: ControlService,
	) {
		super();
	}

	ngAfterViewInit() {
	}

	ngOnInit() {
		const component: Type<ControlComponent> = this.controlService.resolve(this.option);
		const factory: ComponentFactory<ControlComponent> = this.componentFactoryResolver.resolveComponentFactory(component);
		this.viewContainerRef.clear();
		const componentRef = this.viewContainerRef.createComponent(factory);
		const instance = componentRef.instance;
		instance.option = this.option;
		instance.form = this.form;
		instance.inputRef = this.inputRef;
		instance.errorRef = this.errorRef;
		// instance.labelRef = this.labelRef || this.labelDef;
		if (typeof instance['ControlInit'] === 'function') {
			instance['ControlInit']();
		}
		this.componentRef = componentRef;
	}

	ngOnDestroy() {
		this.componentRef.destroy();
	}

}
