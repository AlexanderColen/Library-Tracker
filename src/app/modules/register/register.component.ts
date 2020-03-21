import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    username: string;
    password: string;
    isLoadingResults = false;
    matcher = new MyErrorStateMatcher();

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authService: AuthenticationService,
                private snackBar: MatSnackBar,
                private titleService: Title) {
        this.titleService.setTitle('Register - Library Tracker');
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username : [null, Validators.required],
            password : [null, Validators.required]
        });
    }

    onFormSubmit(form: NgForm): void {
        this.authService.register(form)
            .subscribe(res => {
                this.router.navigate(['login']);
            }, (err) => {
                console.log(err);
                this.snackBar.open(err.error, 'Dismiss', {
                    duration: 2000,
                });
            });
    }

    login(): void {
        this.router.navigate(['login']);
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
