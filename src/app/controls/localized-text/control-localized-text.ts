import { ControlOption } from '@designr/control';
import { Observable } from 'rxjs';

export interface ControlLocalizedTextOption {
	id: any;
	name: string;
	code: string;
}

export class ControlLocalizedText extends ControlOption<string> {
	schema: string = 'localized-text';
	minlength?: number;
	maxlength?: number;
	options?: ControlLocalizedTextOption[] | Observable<ControlLocalizedTextOption[]>;
}
