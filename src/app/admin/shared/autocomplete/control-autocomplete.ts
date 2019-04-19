import { ControlOption } from '@designr/control';
import { Observable } from 'rxjs';

export class ControlAutocomplete extends ControlOption<string> {
	schema: string = 'autocomplete';
	source: Observable<{ value: any; label: string; }[]>;
}
