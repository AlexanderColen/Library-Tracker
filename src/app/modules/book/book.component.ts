import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
    book: Book;
    loading = false;

    constructor(private route: ActivatedRoute,
                private bookService: BookService,
                private router: Router,
                private titleService: Title) { }

    ngOnInit() {
        this.loading = true;
        this.route.paramMap.subscribe( paramMap => {
            this.bookService.getSpecificBook(paramMap.get('id'))
                .subscribe(
                    res => { this.book = res;
                             this.titleService.setTitle(this.book.title + ' - Library Tracker');
                             this.loading = false; },
                    err => { console.log(err);
                             this.titleService.setTitle('Unknown Book - Library Tracker');
                             this.loading = false; },
                );
        });
    }

    navigateToLibrary(): void {
        this.router.navigate(['/library']);
    }
}
