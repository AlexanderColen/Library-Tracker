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

    /**
     * Fetch all UserBooks.
     */
    getUserBooks(): Observable<any> {
        return this.httpClient.get(this.userBooksApi);
    }

    /**
     * Fetch a specific UserBook.
     * @param id The ID of the UserBook.
     */
    getSpecificUserBook(id: string): Observable<any> {
        return this.httpClient.get(this.userBooksApi + id);
    }

    /**
     * Delete an existing UserBook.
     * @param id The ID of the UserBook.
     */
    deleteUserBook(id: string): Observable<any> {
        return this.httpClient.delete(this.userBooksApi + id);
    }

    /**
     * Fetch all UserBooks that belong to a User.
     * @param userId The ID of the User.
     */
    getUserBooksForUser(userId: string): Observable<any> {
        return this.httpClient.get(this.userBooksApi + 'user/' + userId);
    }

    /**
     * Post a new UserBook.
     * @param userBook The UserBook that needs to be posted.
     */
    postUserBook(userBook: UserBook): Observable<any> {
        return this.httpClient.post(this.userBooksApi, userBook);
    }

    /**
     * Edit an existing UserBook.
     * @param userBook The UserBook that needs to be updated.
     */
    editUserBook(userBook: UserBook): Observable<any> {
        return this.httpClient.put(this.userBooksApi + userBook.id, userBook);
    }

    /**
     * Get statistics for a particular User.
     * @param username The username of the User.
     */
    getStatisticsForUser(username: string): Observable<any> {
        return this.httpClient.get(this.userBooksApi + 'user/' + username + '/statistics');
    }
}
