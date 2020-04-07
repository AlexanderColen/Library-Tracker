import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-book-addition-dialog',
    templateUrl: 'book.addition.dialog.html',
})
export class BookAdditionDialogComponent {
    constructor(public dialogRef: MatDialogRef<BookAdditionDialogComponent>) {}

    onAdditionClick(): void {
        this.dialogRef.close('ADD');
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
}
