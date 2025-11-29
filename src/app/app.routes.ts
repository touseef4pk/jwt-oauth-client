import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: () => import('./auth/login/login').then((m) => m.Login) },
  { path: 'home', loadComponent: () => import('./home/home').then((m) => m.Home) },
  {
    path: 'signin-google',
    loadComponent: () =>
      import('./auth/google-callback.component/google-callback.component').then(
        (m) => m.GoogleCallbackComponent
      ),
  },
];
