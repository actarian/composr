import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '@designr/control';
import { DisposableComponent, Entity } from '@designr/core';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, first, map, takeUntil, tap } from 'rxjs/operators';
import { Content, ContentType, Field } from '../store/store';
import { StoreService } from '../store/store.service';
import { TabService, TabState } from '../tabs/tab.service';

@Component({
	selector: 'content-component',
	templateUrl: 'content.component.html',
	styleUrls: ['content.component.scss'],
})
export class ContentComponent extends DisposableComponent implements OnInit {

	contentTypes: ContentType[];
	contentStates: TabState[];
	contents: Content[];

	state: TabState;
	field: Field;

	modes: Entity[] = [{
		id: 1,
		name: 'View'
	}, {
		id: 2,
		name: 'Edit'
	}];

	mode: number = 1;

	constructor(
		private route: ActivatedRoute,
		private formService: FormService,
		private tabService: TabService,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.tabService.state$.pipe(
			first(),
		).subscribe(state => {
			// console.log('ContentComponent', state);
			this.state = state;
			this.route.params.pipe(
				takeUntil(this.unsubscribe),
			).subscribe(data => {
				const path = this.route.snapshot.url[0].path;
				const field = state.definition.fields.find(x => x.key === path);
				this.field = field;
				this.contents = this.state.item[field.key] as Content[];
				this.getContentStates$(this.contents).pipe(
					first(),
				).subscribe(
					x => this.contentStates = x,
					err => console.log('Error:', err),
					() => console.log('Completed')
				);
				// console.log('ContentComponent', field);
			});
			this.storeService.getDefinitionsOfType('Content').pipe(
				first(),
			).subscribe(x => this.contentTypes = x as ContentType[]);
		});
	}

	getContentStates$(contents: Content[]): Observable<TabState[]> {
		const definitions$ = contents.map(x => this.storeService.getDefinitionById(x.type.id as number));
		console.log(contents);
		return combineLatest(definitions$).pipe(
			tap(x => console.log(x)),
			map(definitions => {
				console.log(definitions);
				// return of([]);
				return definitions.map((definition, i) => {
					const options = this.formService.getOptions(
						this.storeService.mapOptions(
							this.storeService.getScalarFields(definition.fields)
						)
					);
					const form = this.formService.getFormGroup(options);
					const tabFields = this.tabService.getTabs(definition);
					const item = contents[i];
					console.log(definition);
					// console.log('getDetail', this.type, this.id, item);
					form.reset(item);
					const initialValue = form.value;
					return {
						tabFields: tabFields,
						type: item.type.model,
						id: item.type.id,
						definition: definition,
						item: item,
						options: options,
						form: form,
					} as TabState;
				});
			}),
			catchError(x => {
				console.log('error', x);
				return of(null);
			})
		);
	}

	onAddContent(type: ContentType) {
		console.log('ContentComponent.onAddContent', type);
	}
}
