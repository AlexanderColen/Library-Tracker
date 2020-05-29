import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
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
export class LibraryComponent implements OnInit, AfterViewInit {
    loading = false;
    username: string;
    userBookCollection: UserBook[];
    shownUserBooks: UserBook[];
    // Table properties.
    dataSource = new MatTableDataSource<UserBook>();
    displayedColumns: string[] = ['isbn', 'title', 'author', 'pages', 'location', 'progress', 'comment', 'edit', 'delete'];
    // Filter properties.
    filterOptionsForm: FormGroup;
    locationStatusMenuOptions: MenuOption[] = [
        { value: 'ALL', viewValue: 'All' },
        { value: 'OWNED', viewValue: 'Owned' },
        { value: 'LOANED', viewValue: 'Loaned Out' },
        { value: 'BORROWED', viewValue: 'Borrowed' },
        { value: 'WISHED', viewValue: 'Wishlist' },
    ];
    progressStatusMenuOptions: MenuOption[] = [
        { value: 'ALL', viewValue: 'All' },
        { value: 'READ', viewValue: 'Read' },
        { value: 'UNREAD', viewValue: 'Unread' },
        { value: 'READING', viewValue: 'Reading' },
        { value: 'PLAN_TO_READ', viewValue: 'Planning To Read' },
        { value: 'ABANDONED', viewValue: 'Stopped Reading' },
    ];
    selectedLocationStatus = 'ALL';
    selectedProgressStatus = 'ALL';
    // View properties.
    viewToggle = 'CARD';
    listViewVisible = false;
    cardViewVisible = true;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userBookService: UserBookService,
                private titleService: Title,
                private dialog: MatDialog,
                private snackBar: MatSnackBar,
                private formBuilder: FormBuilder) {
        this.titleService.setTitle('Book Collection - Library Tracker');
        this.filterOptionsForm = this.formBuilder.group({
            filterCriteria : [null, null]
        });
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.loading = true;
        this.userBookService.getUserBooksForUser(localStorage.getItem('userId'))
            .subscribe(res => { this.userBookCollection = res;
                                this.shownUserBooks = res;
                                this.dataSource.data = res as UserBook[];
                                this.loading = false;
                        },
                        err => { this.snackBar.open('Something went wrong while fetching the books.', 'Dismiss', {
                                    duration: 2000,
                                 });
                                 console.log(err);
                                 this.loading = false;
                        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    /**
     * Change the display view from card to table or vice versa.
     * @param event The event thrown by changing the view toggle button.
     */
    ChangeView(event: any): void {
        this.cardViewVisible = event.value === 'CARD' ? true : false;
        this.listViewVisible = event.value === 'LIST' ? true : false;
    }

    /**
     * Displays the correct books based on what filters were activated.
     * @param event The event thrown by changing the location/progress status menu options select.
     */
    displayBooks(event: any, filter: string, reset: boolean = false): void {
        // Reset search criteria when changing these filters, but not when it gets called otherwise.
        if (reset) {
            this.filterOptionsForm.get('filterCriteria').setValue('');
        }

        this.shownUserBooks = [];
        let tempUserBooks: UserBook[] = [];

        if (filter === 'PROGRESS') {
            this.selectedProgressStatus = event.value;
        } else if (filter === 'LOCATION') {
            this.selectedLocationStatus = event.value;
        }

        // Start with filtering on progress.
        if (this.selectedProgressStatus === 'ALL') {
            tempUserBooks = this.userBookCollection;
        } else {
            this.userBookCollection.forEach(userBook => {
                if (userBook.progressStatus === this.selectedProgressStatus) {
                    tempUserBooks.push(userBook);
                }
            });
        }

        // Then filter remaining on location.
        if (this.selectedLocationStatus === 'ALL') {
            this.shownUserBooks = tempUserBooks;
        } else {
            tempUserBooks.forEach(userBook => {
                if (userBook.locationStatus === this.selectedLocationStatus) {
                    this.shownUserBooks.push(userBook);
                }
            });
        }

        // Also set it for the table data.
        this.dataSource.data = this.shownUserBooks;
    }

    /**
     * Filter books based on entered filter criteria. 
     * @param event The event thrown by typing in the filter criteria input.
     */
    filterUserBooks(event: any): void {
        const filteredBooks: UserBook[] = [];

        this.displayBooks(null, null);

        this.shownUserBooks.forEach(userBook => {
            // Merge all searchable fields into one string while ignoring null values.
            const userBookString = [userBook.book.isbn,
                                    userBook.book.title,
                                    userBook.book.author,
                                    userBook.book.pages,
                                    userBook.locationStatus,
                                    userBook.progressStatus,
                                    userBook.comment].join('').toLowerCase().trim();
            // Lowercase the strings and trim to ignore extra spaces and capitalization before filtering.
            if (userBookString.indexOf(event.target.value.toLowerCase().trim()) !== -1) {
                filteredBooks.push(userBook);
            }
        });

        this.shownUserBooks = filteredBooks;
        this.dataSource.data = this.shownUserBooks;
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
