import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Localization } from '../store/store';

@Pipe({
	name: 'localization',
	// pure: false
})

@Injectable({
	providedIn: 'root'
})
export class LocalizationPipe implements PipeTransform {

	transform(localization: Localization[]): string {
		return localization && localization.length ? localization[0].text : 'missing text';
	}

}
