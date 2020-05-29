import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BookComponent } from './modules/book/book.component';
import { BookAdditionDialogComponent } from './modules/dialogs/book.addition.dialog.component';
import { BookEditDialogComponent } from './modules/dialogs/book.edit.dialog.component';
import { DeletionDialogComponent } from './modules/dialogs/deletion.dialog.component';
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
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        AppComponent,
        BookComponent,
        BookAdditionDialogComponent,
        BookEditDialogComponent,
        DeletionDialogComponent,
        LogoutDialogComponent,
        LibraryComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        ScanningComponent,
    ],
    entryComponents: [
        BookAdditionDialogComponent,
        BookEditDialogComponent,
        DeletionDialogComponent,
        LogoutDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        ChartsModule,
        FormsModule,
        HttpClientModule,
        MatExpansionModule,
        MatButtonModule,
        MatButtonToggleModule,
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
        MatSortModule,
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
