import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private decodeApi = environment.api_url + 'barcode/';
    private booksApi = environment.api_url + 'books/';

    constructor(private httpClient: HttpClient) { }

    /**
     * Search the Google Books API for books based on criteria.
     * @param criteria The criteria that needs to be searched for.
     */
    searchGoogleBooks(criteria: string): Observable<any> {
        const formData = new FormData();
        formData.append('criteria', criteria);

        return this.httpClient.post(this.booksApi + 'find', formData);
    }

    /**
     * Decode a barcode that is part of an image.
     * @param image The image with the barcode.
     */
    decodeBarcode(image: any): Observable<any> {
        const formData = new FormData();
        formData.append('image', image);

        return this.httpClient.post(this.decodeApi + 'decode', formData);
    }
}
