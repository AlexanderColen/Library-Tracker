import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Book } from 'src/app/models/Book';
import { UserBook } from 'src/app/models/UserBook';
import { SearchService } from 'src/app/services/search.service';
import { UserBookService } from 'src/app/services/userbook.service';
import { BookAdditionDialogComponent } from '../dialogs/book.addition.dialog.component';

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
                private userBookService: UserBookService,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
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

    /**
     * Decode a barcode within an image.
     * @param event The event that gets thrown when the selected file changes.
     */
    decodeImage(event: any): void {
        this.loading = true;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.searchService.decodeBarcode((reader.result as string).split(',')[1])
                .subscribe(res => { this.searchCriteria = res;
                                    this.findBook();
                                    this.loading = false; },
                           err => { this.snackBar.open('Something went wrong while decoding the barcode.', 'Dismiss', {
                                        duration: 2000,
                                    });
                                    console.log(err);
                                    this.loading = false; },
                        );
        };
    }

    /**
     * Key-up event for setting up delay on search.
     */
    onSearchKeyUp(): void {
        this.subject.next();
    }

    /**
     * Find a Book based on search criteria.
     */
    findBook(): void {
        if (this.searchCriteria) {
            this.loading = true;
            this.searchService.searchGoogleBooks(this.searchCriteria)
                .subscribe(res => { this.foundBooks = res;
                                    this.loading = false; },
                           err => { this.snackBar.open('Something went wrong while looking for books.', 'Dismiss', {
                                        duration: 2000,
                                    });
                                    console.log(err);
                                    this.loading = false; },
                        );
        } else {
            this.foundBooks = null;
        }
    }

    /**
     * Add a new Book.
     * @param index The index of the Book in the foundBook collection that needs to be added.
     * @param locationStatus The location status that the entry should have.
     * @param progressStatus The progress status that the entry should have.
     * @param comment The comment that User put with the UserBook.
     */
    addUserBook(index: number, locationStatus: string, progressStatus: string, comment: string): void {
        const userBook = new UserBook();
        userBook.userId = localStorage.getItem('userId');
        userBook.book = this.foundBooks[index];
        userBook.locationStatus = locationStatus;
        userBook.progressStatus = progressStatus;
        userBook.comment = comment;

        this.userBookService.postUserBook(userBook)
            .subscribe(res => { this.snackBar.open('Book added to personal library.', 'Dismiss', {
                                    duration: 2000,
                                }); },
                       err => { console.log(err);
                                this.snackBar.open('Something went wrong while adding the book.', 'Dismiss', {
                                    duration: 2000,
                                });
                            }
                    );
    }

    /**
     * Open the dialog for adding a Book.
     * @param index The index of the Book in the foundBook collection that needs to be added.
     * @param book The Book that needs to be added.
     */
    openAddBookDialog(index: number, book: Book): void {
        const dialogRef = this.dialog.open(BookAdditionDialogComponent, {
            data: book,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result[0] === 'ADD') {
                this.addUserBook(index, result[1], result[2], result[3]);
            }
        });
    }
}
