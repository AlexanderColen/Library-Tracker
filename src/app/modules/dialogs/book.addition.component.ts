import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
    selectForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<BookAdditionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) data: Book,
                private formBuilder: FormBuilder) {
        this.book = data;
        this.selectForm = this.formBuilder.group({
            selectedLocation : [null, Validators.required],
            selectedProgress : [null, Validators.required]
        });
    }

    onAdditionClick(form: NgForm): void {
        this.dialogRef.close(['ADD', form['selectedLocation'], form['selectedProgress']]);
    }

    onCancelClick(): void {
      this.dialogRef.close('CANCEL');
    }
}
