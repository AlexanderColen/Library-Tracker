import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Book } from 'src/app/models/Book';
import { UserBook } from 'src/app/models/UserBook';
import { SearchService } from 'src/app/services/search.service';
import { UserBookService } from 'src/app/services/userbook.service';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.scss']
})
export class ScanningComponent implements OnInit {
    foundBooks: Book[];
    loading: boolean;
    searchCriteria: string;
    subject: Subject<any> = new Subject();

    constructor(private titleService: Title,
                private searchService: SearchService,
                private userBookService: UserBookService) {
        this.titleService.setTitle('Book Finder - Library Tracker');
    }

    ngOnInit() {
        this.subject
            .pipe(debounceTime(800))
            .subscribe(() => {
                this.findBook();
            }
        );
    }

    decodeImage(event: any): void {
        this.loading = true;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.searchService.decodeBarcode((reader.result as string).split(',')[1])
                .subscribe(res => { this.searchCriteria = res;
                                    this.findBook();
                                    this.loading = false; },
                           err => { console.log(err);
                                    this.loading = false; },
                        );
        };
    }

    onSearchKeyUp(): void {
        this.subject.next();
    }

    findBook(): void {
        if (this.searchCriteria) {
            this.loading = true;
            this.searchService.searchGoogleBooks(this.searchCriteria)
                .subscribe(res => { this.foundBooks = res;
                                    this.loading = false; },
                           err => { console.log(err);
                                    this.loading = false; },
                        );
        }
    }

    addBook(index: number, status: string): void {
        const userBook = new UserBook();
        userBook.user_id = localStorage.getItem('user_id');
        userBook.book = this.foundBooks[index];
        userBook.status = status;

        this.userBookService.postUserBook(userBook)
            .subscribe(res => { console.log(res); },
                       err => { console.log(err); }
                    );
    }
}
