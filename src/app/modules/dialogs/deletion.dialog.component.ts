import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-deletion-dialog',
    templateUrl: 'deletion.dialog.html',
})
export class DeletionDialogComponent {
    constructor(public dialogRef: MatDialogRef<DeletionDialogComponent>) {}

    onDeleteClick(): void {
        this.dialogRef.close('DELETE');
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
}
