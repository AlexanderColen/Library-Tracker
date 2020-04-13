import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Attaching token to request...');
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
          });
        }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({
        //         setHeaders: {
        //             'content-type': 'application/json'
        //         }
        //     });
        // }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                if (error.status === 401) {
                    this.router.navigate(['login']);
                    this.snackBar.open('Session timed out.', 'Dismiss', {
                        duration: 2000,
                    });
                }
                return throwError(error);
            })
        );
    }
}
