import { isPlatformBrowser } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forwardRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthStrategy, LocalStorageService, StorageService } from '@designr/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AdminToken } from './admin';

@Injectable({
	providedIn: 'root',
})
export class AdminHttpInterceptor implements HttpInterceptor {

	storage: StorageService;

	constructor(
		@Inject(PLATFORM_ID) private platformId: string,
		@Inject(forwardRef(() => LocalStorageService)) private storageService: LocalStorageService,
	) {
		this.storage = this.storageService.tryGet();
	}

	intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
		if (environment.core.authStrategy === AuthStrategy.Bearer && isPlatformBrowser(this.platformId)) {
			const accessToken = this.storage.get('accessToken') as AdminToken;
			if (accessToken) {
				request = request.clone({
					headers: request.headers.set('Authorization', `Bearer ${accessToken.accessToken}`)
				});
			}
		}
		return handler.handle(request).pipe(
			catchError((error) => {
				return throwError(error);
			})
		);
	}
}
