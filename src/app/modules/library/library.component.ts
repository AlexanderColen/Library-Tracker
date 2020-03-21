import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { MenuOption } from 'src/app/models/MenuOption';
import { UserBookService } from 'src/app/services/userbook.service';
import { UserBook } from 'src/app/models/UserBook';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
    username: string;
    userBookCollection: UserBook[];
    loading = false;
    shownUserBooks: Book[];
    menuOptions: MenuOption[] = [
        {value: 'all', viewValue: 'All'},
        {value: 'owned', viewValue: 'Owned'},
        {value: 'wanted', viewValue: 'Wishlist'}
    ];

    constructor(private userBookService: UserBookService,
                private router: Router,
                private titleService: Title) {
        this.titleService.setTitle('Book Collection - Library Tracker');
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.loading = true;
        this.userBookService.getUserBooksForUser(localStorage.getItem('user_id'))
            .subscribe(res => { this.userBookCollection = res;
                                this.shownUserBooks = res;
                                this.loading = false;
                        },
                        err => { console.log(err);
                                 this.loading = false;
                        });
    }

    displayBooks(event: any): void {
        // this.shownUserBooks = [];
        console.log('Operation Not Yet Implemented.');
    }

    deleteBook(index: number): void {
        this.userBookService.deleteUserBook(this.userBookCollection[index].id)
            .subscribe(res => {
                            this.userBookCollection.splice(index, 1);
                        },
                        err => { console.log(err); });
    }
}
