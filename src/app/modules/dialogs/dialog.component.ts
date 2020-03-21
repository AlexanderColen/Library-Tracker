import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.html',
})
export class DialogComponent {
    constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

    onLogoutClick(): void {
        this.dialogRef.close('LOGOUT');
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
}