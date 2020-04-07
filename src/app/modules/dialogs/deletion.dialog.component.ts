import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from 'src/app/models/Book';

@Component({
    selector: 'app-deletion-dialog',
    templateUrl: 'deletion.dialog.html',
})
export class DeletionDialogComponent {
    book: Book;

    constructor(public dialogRef: MatDialogRef<DeletionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) data: Book) {
        this.book = data;
    }

    onDeleteClick(): void {
        this.dialogRef.close('DELETE');
    }

    onCancelClick(): void {
      this.dialogRef.close('CANCEL');
    }
}
