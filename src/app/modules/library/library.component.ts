import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { MenuOption } from 'src/app/models/MenuOption';
import { UserBook } from 'src/app/models/UserBook';
import { UserBookService } from 'src/app/services/userbook.service';
import { DeletionDialogComponent } from '../dialogs/deletion.dialog.component';

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
        { value: 'all', viewValue: 'All' },
        { value: 'owned', viewValue: 'Owned' },
        { value: 'wanted', viewValue: 'Wishlist' }
    ];

    constructor(private userBookService: UserBookService,
                private router: Router,
                private titleService: Title,
                private dialog: MatDialog) {
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

    openDeletionDialog(index: number, book: Book): void {
        const dialogRef = this.dialog.open(DeletionDialogComponent, {
            data: book,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'DELETE') {
                this.deleteBook(index);
            }
        });
    }
}
