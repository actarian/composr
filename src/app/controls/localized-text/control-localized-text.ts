import { ControlOption } from '@designr/control';
import { Observable } from 'rxjs';

export interface ControlLocalizedTextOption {
	id: any;
	name: string;
	code: string;
}

export class ControlLocalizedText extends ControlOption<string> {
	schema: string = 'localized-text';
	options?: ControlLocalizedTextOption[] | Observable<ControlLocalizedTextOption[]>;
	asObject: boolean;
}
