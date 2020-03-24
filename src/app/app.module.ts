import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule,
         MatCardModule,
         MatCheckboxModule,
         MatDialogModule,
         MatFormFieldModule,
         MatIconModule,
         MatInputModule,
         MatProgressSpinnerModule,
         MatSelectModule,
         MatSidenavModule,
         MatSnackBarModule,
         MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BookComponent } from './modules/book/book.component';
import { BookAdditionDialogComponent } from './modules/dialogs/book.addition.component';
import { LogoutDialogComponent } from './modules/dialogs/logout.dialog.component';
import { LibraryComponent } from './modules/library/library.component';
import { LoginComponent } from './modules/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/register/register.component';
import { ScanningComponent } from './modules/scanning/scanning.component';
import { AuthenticationService } from './services/authentication.service';
import { BookService } from './services/book.service';
import { SearchService } from './services/search.service';
import { UserBookService } from './services/userbook.service';

@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        BookAdditionDialogComponent,
        LogoutDialogComponent,
        LibraryComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        ScanningComponent,
    ],
    entryComponents: [
        BookAdditionDialogComponent,
        LogoutDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTableModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthenticationService,
        BookService,
        SearchService,
        UserBookService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
