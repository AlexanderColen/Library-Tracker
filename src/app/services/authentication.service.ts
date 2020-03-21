import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    authApi = environment.api_url + 'auth/';
    isLoggedIn = false;
    redirectUrl: string;

    constructor(private http: HttpClient) {
        if (localStorage.getItem('token')) {
            this.isLoggedIn = true;
        }
    }

    login(data: any): Observable<any> {
        return this.http.post<any>(this.authApi + 'login', data)
            .pipe(
                tap(_ => this.isLoggedIn = true)
            );
    }

    logout() {
        this.isLoggedIn = false;
        // return this.http.get<any>(this.authApi + 'signout')
        //     .pipe(
        //         tap(_ => this.isLoggedIn = false),
        //         catchError(this.handleError('logout', []))
        //     );
    }

    register(data: any): Observable<any> {
        return this.http.post<any>(this.authApi + 'register', data);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }
}
