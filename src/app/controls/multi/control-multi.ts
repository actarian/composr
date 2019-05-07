import { ControlOption } from '@designr/control';
import { Observable } from 'rxjs';

export interface ControlMultiOption {
	id: any;
	name: string;
	active: boolean;
}

export class ControlMulti extends ControlOption<string> {
	schema: string = 'multi';
	options?: ControlMultiOption[] | Observable<ControlMultiOption[]>;
	asObject: boolean;
}
