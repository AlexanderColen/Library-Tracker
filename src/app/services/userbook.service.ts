import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserBook } from '../models/UserBook';

@Injectable({
    providedIn: 'root'
})
export class UserBookService {
    private userBooksApi = environment.api_url + 'userbooks/';

    constructor(private httpClient: HttpClient) { }

    getUserBooks(): Observable<any> {
        return this.httpClient.get(this.userBooksApi);
    }

    getSpecificUserBook(id: string): Observable<any> {
        return this.httpClient.get(this.userBooksApi + id);
    }

    deleteUserBook(id: string): Observable<any> {
        return this.httpClient.delete(this.userBooksApi + id);
    }

    getUserBooksForUser(user_id: string): Observable<any> {
        return this.httpClient.get(this.userBooksApi + 'user/' + user_id);
    }

    postUserBook(userBook: UserBook): Observable<any> {
        return this.httpClient.post(this.userBooksApi + '', userBook);
    }
}
