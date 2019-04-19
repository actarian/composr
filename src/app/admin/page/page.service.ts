

import { Injectable, Injector } from '@angular/core';
import { EntityService } from '@designr/core';
import { Observable, of } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { Prestazione, PrestazioneAlias, PrestazioneDomanda } from './page';

@Injectable({
	providedIn: 'root',
})
export class PageService extends EntityService<Prestazione> {

	get collection(): string {
		return 'https://pucbm-hub.wslabs.it/api/Prenoting/Prestazioni';
	}

	constructor(
		protected injector: Injector,
	) {
		super(injector);
	}

	getAll(): Observable<Prestazione[]> {
		return this.get().pipe(
			shareReplay(),
		);
	}

	prestazioni$(): Observable<{ value: any; label: string; }[]> {
		return this.getAll().pipe(
			shareReplay(),
			map(array => array.map(x => {
				return { value: x.id, label: x.descrizione };
			}))
		);
	}

	getDomande(prestazione: Prestazione) {
		return this.get(`/${prestazione.id}/Domande`).pipe(
			map(x => x || []),
			first(),
		);
	}

	addAlias(alias: { nome: string }, prestazione: Prestazione): Observable<PrestazioneAlias> {
		// console.log('PageService.addAlias', alias, prestazione);
		// return of(null);
		return this.post(`/${prestazione.id}/Alias`, alias);
	}

	removeAlias(alias: PrestazioneAlias): Observable<PrestazioneAlias> {
		return this.delete(`/${alias.prestazioneId}/Alias/${alias.id}`);
	}

	addAliasToMany(alias: { nome: string, prestazioni: string[] }): Observable<PrestazioneAlias> {
		// console.log('PageService.addAliasToMany', alias);
		// return of(null);
		return this.post(`/Alias`, alias);
	}

	addDomanda(domanda: { nome: string }, prestazione: Prestazione): Observable<PrestazioneDomanda> {
		return this.post(`/${prestazione.id}/Domanda`, domanda); // !!!
	}

	removeDomanda(domanda: PrestazioneDomanda): Observable<PrestazioneDomanda> {
		return this.delete(`/${domanda.prestazioneId}/Domanda/${domanda.id}`); // !!!
	}

	addDomandaToMany(domanda: { nome: string, prestazioni: string[] }): Observable<PrestazioneDomanda> {
		return of(null);
	}

	update(prestazione: Prestazione): Observable<PrestazioneAlias> {
		return this.put(`/${prestazione.id}`, prestazione);
	}

}

