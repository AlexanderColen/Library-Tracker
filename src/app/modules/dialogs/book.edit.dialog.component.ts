import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserBook } from 'src/app/models/UserBook';

@Component({
    selector: 'app-book-edit-dialog',
    templateUrl: 'book.edit.dialog.html',
})
export class BookEditDialogComponent {
    userBook: UserBook;
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
    editForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<BookEditDialogComponent>,
                @Inject(MAT_DIALOG_DATA) data: UserBook,
                private formBuilder: FormBuilder) {
        this.userBook = data;
        this.editForm = this.formBuilder.group({
            location : [null, Validators.required],
            progress : [null, Validators.required],
            comment : [null, null]
        });
        this.editForm.value.location = this.userBook.locationStatus;
        this.editForm.value.progress = this.userBook.progressStatus;
        this.editForm.value.comment = this.userBook.comment;
    }

    onEditClick(form: NgForm): void {
        this.dialogRef.close(['EDIT', form.value.location, form.value.progress, form.value.comment]);
    }

    onCancelClick(): void {
      this.dialogRef.close('CANCEL');
    }
}
