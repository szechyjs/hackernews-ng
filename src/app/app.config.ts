import { ApplicationConfig } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp, FirebaseOptions } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { importProvidersFrom, isDevMode } from '@angular/core';

import { routes } from './app.routes';
import { TimeagoModule } from 'ngx-timeago';

const fbConfig: FirebaseOptions = {
  databaseURL: 'https://hacker-news.firebaseio.com',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(fbConfig)),
    provideDatabase(() => getDatabase()),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    importProvidersFrom(TimeagoModule.forRoot())
  ],
};
