import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cloned = req.clone({
      headers: req.headers.append('Auth', 'SOME LOREM')
    });
    return next.handle(cloned);
  }

}
