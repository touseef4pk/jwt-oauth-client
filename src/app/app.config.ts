import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { authorizeInterceptor } from './authorize-interceptor';

// 👉 ADD THIS IMPORT
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // your existing JWT interceptor
    provideHttpClient(withInterceptors([authorizeInterceptor])),

    // 👉 ADD THIS LINE FOR GOOGLE OAUTH
    provideOAuthClient()
  ]
};
