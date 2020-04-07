import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-logout-dialog',
    templateUrl: 'logout.dialog.html',
})
export class LogoutDialogComponent {
    constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>) {}

    onLogoutClick(): void {
        this.dialogRef.close('LOGOUT');
    }

    onCancelClick(): void {
      this.dialogRef.close('CANCEL');
    }
}