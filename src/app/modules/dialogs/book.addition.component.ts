import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from 'src/app/models/Book';

@Component({
    selector: 'app-book-addition-dialog',
    templateUrl: 'book.addition.dialog.html',
})
export class BookAdditionDialogComponent {
    book: Book;
    locationStatuses: string[] = [
        'OWNED',
        'LOANED',
        'BORROWED',
        'WISHED',
    ];
    progressStatuses: string[] = [
        'READ',
        'UNREAD',
        'READING',
        'PLAN_TO_READ',
        'ABANDONED',
    ];
    selectedLocation: string;
    selectedProgress: string;

    constructor(public dialogRef: MatDialogRef<BookAdditionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) data: Book) {
        this.book = data;
    }

    onAdditionClick(): void {
        this.dialogRef.close(['ADD', this.selectedLocation, this.selectedProgress]);
    }

    onCancelClick(): void {
      this.dialogRef.close('CANCEL');
    }
}
