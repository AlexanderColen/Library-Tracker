import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private booksApi = environment.api_url + 'books/';

    constructor(private httpClient: HttpClient) { }

    getBooks(): Observable<any> {
        return this.httpClient.get(this.booksApi);
    }

    getSpecificBook(id: string): Observable<any> {
        return this.httpClient.get(this.booksApi + id);
    }

    deleteBook(id: string): Observable<any> {
        return this.httpClient.delete(this.booksApi + id);
    }
}
