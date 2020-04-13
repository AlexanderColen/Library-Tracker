import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    matcher = new LoginErrorStateMatcher();
    isLoadingResults = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authService: AuthenticationService,
                private snackBar: MatSnackBar,
                private titleService: Title) {
                    this.titleService.setTitle('Login - Library Tracker');
                }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username : [null, Validators.required],
            password : [null, Validators.required]
        });
    }

    onFormSubmit(form: NgForm): void {
        this.authService.login(form)
            .subscribe(res => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('username', res.username);
                    localStorage.setItem('userId', res.userId);
                    this.router.navigate(['library']);
                }
            }, (err) => {
                console.log(err);
                this.snackBar.open(err.error, 'Dismiss', {
                    duration: 2000,
                });
            });
    }

    register(): void {
        this.router.navigate(['register']);
    }
}
