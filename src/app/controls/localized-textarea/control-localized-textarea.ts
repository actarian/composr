import { ControlOption } from '@designr/control';
import { Observable } from 'rxjs';
import { ControlLocalizedTextOption } from '../localized-text/control-localized-text';

export class ControlLocalizedTextarea extends ControlOption<string> {
	schema: string = 'localized-textarea';
	minlength?: number;
	maxlength?: number;
	options?: ControlLocalizedTextOption[] | Observable<ControlLocalizedTextOption[]>;
}
