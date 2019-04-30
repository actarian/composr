import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { first } from 'rxjs/operators';
import { Field } from '../../core/definition';
import { TabService, TabState } from '../tab.service';

@Component({
	selector: 'relation-component',
	templateUrl: 'relation.component.html',
	styleUrls: ['relation.component.scss'],
})
export class RelationComponent extends DisposableComponent implements OnInit {

	state: TabState;
	field: Field;

	constructor(
		private route: ActivatedRoute,
		private tabService: TabService,
	) {
		super();
	}

	ngOnInit() {
		const path = this.route.snapshot.url[0].path;
		this.tabService.state$.pipe(
			first(),
		).subscribe(state => {
			console.log('RelationComponent', state);
			this.state = state;
			const field = state.definition.fields.find(x => x.key === path);
			this.field = field;
		});
	}

}
