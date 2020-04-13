import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from './modules/dialogs/logout.dialog.component';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    events: string[] = [];
    opened: any;

    @ViewChild('sidenav')
    public sidenav: MatSidenav;

    constructor(private router: Router,
                public authService: AuthenticationService,
                private dialog: MatDialog) { }

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
        localStorage.removeItem('userId');
        this.router.navigate(['login']);
        this.authService.logout();
        this.sidenav.toggle();
    }

    openLogoutDialog(): void {
        const dialogRef = this.dialog.open(LogoutDialogComponent, { });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'LOGOUT') {
                this.logout();
            }
        });
    }
}
