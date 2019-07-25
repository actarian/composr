import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisposableComponent } from '@designr/core';
import { takeUntil } from 'rxjs/operators';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'resolver-component',
	templateUrl: 'resolver.component.html',
	styleUrls: ['resolver.component.scss'],
})
export class ResolverComponent extends DisposableComponent implements OnInit {

	public definition: any;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private storeService: StoreService,
	) {
		super();
	}

	ngOnInit() {
		this.route.data.pipe(
			takeUntil(this.unsubscribe),
		).subscribe(data => {
			const model = data.model;
			this.definition = model;
			this.storeService.getDefinitionsOfType(model).subscribe(types => {
				const type = types.find(x => x.model === model);
				this.router.navigate(['../', type.model, type.id, 'items'], { relativeTo: this.route });
			});
		});
	}

}
