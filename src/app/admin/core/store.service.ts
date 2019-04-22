

import { Injectable } from '@angular/core';
import { LocalStorageService } from '@designr/core';
import { Observable, of } from 'rxjs';
import { DATA } from './store';

let UID = 1;

@Injectable({
	providedIn: 'root',
})
export class StoreService {

	store: { [key: string]: any };

	constructor(
		private storage: LocalStorageService,
	) {
		this.createStore();
	}

	getList(type: string): Observable<any[]> {
		return of(this.store[type]);
	}

	getIndex(type: string): Observable<any[]> {
		return of(this.store[type]);
	}

	getDetail(type: string, id: number): Observable<any> {
		// console.log(type, id, this.store[type]);
		return of(this.store[type].find(x => x.id === id));
	}

	addType(type: string, model: any): Observable<any> {
		const item = this.createItem(type, model);
		return of(item);
	}

	//

	createStore() {
		let store = this.storage.get('store');
		if (!store) {
			store = Object.assign({}, DATA);
			store.page = this.createPages(10000);
			this.storage.set('store', store);
		}
		this.store = store;
	}

	createPages(count: number = 100): any[] {
		return new Array(count).fill(null).map((x, i) => {
			const id = UID++;
			const pageType = DATA.pagetype[Math.floor(Math.random() * DATA.pagetype.length)];
			const title = pageType.name + (pageType.isIndex ? `` : ` ${id}`);
			return {
				id,
				title,
				//
				pageType: pageType.name,
				pageTypeId: pageType.id,
				//
				template: pageType.name,
				templateId: 100 + pageType.id,
				//
				category: pageType.name,
				categoryId: 200 + pageType.id,
				//
				market: 'en',
				marketId: 1,
				//
				active: Math.random() > 0.5,
				visible: Math.random() > 0.5,
				order: Math.floor(Math.random() * 100000),
				actions: [],
			};
		});
	}

	createItem(type: string, item: any): any {
		const items = this.store[type];
		item.id = items.length;
		items.push(item);
		this.storage.set('store', this.store);
		return item;
	}

}

