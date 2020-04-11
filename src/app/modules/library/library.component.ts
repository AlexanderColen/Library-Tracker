import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuOption } from 'src/app/models/MenuOption';
import { UserBook } from 'src/app/models/UserBook';
import { UserBookService } from 'src/app/services/userbook.service';
import { BookEditDialogComponent } from '../dialogs/book.edit.dialog.component';
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
    shownUserBooks: UserBook[];
    menuOptions: MenuOption[] = [
        { value: 'ALL', viewValue: 'All' },
        { value: 'OWNED', viewValue: 'Owned' },
        { value: 'LOANED', viewValue: 'Loaned Out' },
        { value: 'BORROWED', viewValue: 'Borrowed' },
        { value: 'WISHED', viewValue: 'Wishlist' },
    ];

    constructor(private userBookService: UserBookService,
                private router: Router,
                private titleService: Title,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
        this.titleService.setTitle('Book Collection - Library Tracker');
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.loading = true;
        this.userBookService.getUserBooksForUser(localStorage.getItem('userId'))
            .subscribe(res => { this.userBookCollection = res;
                                this.shownUserBooks = res;
                                this.loading = false;
                        },
                        err => { this.snackBar.open('Something went wrong while fetching the books.', 'Dismiss', {
                                    duration: 2000,
                                 });
                                 console.log(err);
                                 this.loading = false;
                        });
    }

    /**
     * Displays the correct books based on what filter was activated.
     * @param event The event thrown by changing the menuOptions select.
     */
    displayBooks(event: any): void {
        this.shownUserBooks = [];
        if (event.value === 'ALL') {
            this.shownUserBooks = this.userBookCollection;
        } else {
            this.userBookCollection.forEach(book => {
                if (book.locationStatus === event.value) {
                    this.shownUserBooks.push(book);
                }
            });
        }
    }

    /**
     * Edit a UserBook for the logged in User.
     * @param index The index of the UserBook in the userBookCollection that needs to be edited.
     * @param userBook The UserBook that needs to be edited.
     */
    editUserBook(index: number, userBook: UserBook) {
        this.userBookService.editUserBook(userBook)
            .subscribe(res => {
                            this.userBookCollection[index] = res;
                            this.snackBar.open('Book successfully edited.', 'Dismiss', {
                                duration: 2000,
                            });
                        },
                        err => {
                            this.snackBar.open('Something went wrong while editing the book.', 'Dismiss', {
                                duration: 2000,
                            });
                            console.log(err);
                        });
    }

    /**
     * Delete a UserBook for the logged in User.
     * @param index The index of the UserBook in the userBookCollection that needs to be deleted.
     */
    deleteUserBook(index: number): void {
        this.userBookService.deleteUserBook(this.userBookCollection[index].id)
            .subscribe(res => {
                            this.userBookCollection.splice(index, 1);
                            this.snackBar.open('Book successfully deleted.', 'Dismiss', {
                                duration: 2000,
                            });
                        },
                        err => {
                            this.snackBar.open('Something went wrong while deleting the book.', 'Dismiss', {
                                duration: 2000,
                            });
                            console.log(err);
                            });
    }

    /**
     * Open the dialog for editing a UserBook.
     * @param index The index of the UserBook in the userBookCollection that needs to be edited.
     * @param userBook The UserBook that needs to be edited.
     */
    openEditDialog(index: number, userBook: UserBook) {
        const dialogRef = this.dialog.open(BookEditDialogComponent, {
            data: userBook,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result[0] === 'EDIT') {
                userBook.locationStatus = result[1];
                userBook.progressStatus = result[2];
                userBook.comment = result[3];
                this.editUserBook(index, userBook);
            }
        });
    }

    /**
     * Open the confirmation dialog for deleting a UserBook.
     * @param index The index of the UserBook in the userBookCollection that needs to be deleted.
     * @param userBook The UserBook that needs to be deleted.
     */
    openDeletionDialog(index: number, userBook: UserBook): void {
        const dialogRef = this.dialog.open(DeletionDialogComponent, {
            data: userBook.book,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'DELETE') {
                this.deleteUserBook(index);
            }
        });
    }
}
