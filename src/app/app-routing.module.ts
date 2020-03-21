import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BookComponent } from './modules/book/book.component';
import { LibraryComponent } from './modules/library/library.component';
import { LoginComponent } from './modules/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/register/register.component';
import { ScanningComponent } from './modules/scanning/scanning.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'library',
        canActivate: [AuthGuard],
        component: LibraryComponent
    },
    {
        path: 'library/:id',
        canActivate: [AuthGuard],
        component: BookComponent
    },
    {
        path: 'profile',
        redirectTo: '/profile/' + localStorage.getItem('username'),
        pathMatch: 'full'
    },
    {
        path: 'profile/:username',
        canActivate: [AuthGuard],
        component: ProfileComponent
    },
    {
        path: 'scan',
        canActivate: [AuthGuard],
        component: ScanningComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
