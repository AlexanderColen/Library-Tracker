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

    /**
     * Login to the application.
     * @param data The authentication data.
     */
    login(data: any): Observable<any> {
        return this.http.post<any>(this.authApi + 'login', data)
            .pipe(
                tap(_ => this.isLoggedIn = true)
            );
    }

    /**
     * Logout the currently logged in User.
     */
    logout() {
        this.isLoggedIn = false;
    }

    /**
     * Register a new User.
     * @param data The authentication data.
     */
    register(data: any): Observable<any> {
        return this.http.post<any>(this.authApi + 'register', data);
    }
}
