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

    /**
     * Fetch all the Books.
     */
    getBooks(): Observable<any> {
        return this.httpClient.get(this.booksApi);
    }

    /**
     * Fetch a specific Book.
     * @param id The ID of the Book.
     */
    getSpecificBook(id: string): Observable<any> {
        return this.httpClient.get(this.booksApi + id);
    }

    /**
     * Delete an existing Book.
     * @param id The ID of the Book.
     */
    deleteBook(id: string): Observable<any> {
        return this.httpClient.delete(this.booksApi + id);
    }
}
