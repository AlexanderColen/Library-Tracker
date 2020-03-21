import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { DialogComponent } from './modules/dialogs/dialog.component';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    events: string[] = [];

    @ViewChild('sidenav', {static: false})
    public sidenav: MatSidenav;

    constructor(private router: Router,
                private authService: AuthenticationService,
                public dialog: MatDialog) { }

    navigate(destination: string): void {
        if (destination === 'login') {
            this.router.navigate(['/login']);
        } else if (destination === 'register') {
            this.router.navigate(['/register']);
        } else {
            if (localStorage.getItem('username')) {
                if (destination === 'profile') {
                    this.router.navigate(['/' + destination + '/' + localStorage.getItem('username')]);
                } else {
                    this.router.navigate(['/' + destination]);
                }
            } else {
                this.openLogoutDialog();
            }
        }

        this.sidenav.toggle();
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['login']);
        this.authService.logout();
    }

    openLogoutDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '220px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'LOGOUT') {
                this.logout();
            }
        });
    }
}
