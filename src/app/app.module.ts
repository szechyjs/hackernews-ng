import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp, FirebaseOptions } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TimeagoModule } from 'ngx-timeago';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './story/story.component';
import { StoriesComponent } from './stories/stories.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const fbConfig: FirebaseOptions = {
  databaseURL: 'https://hacker-news.firebaseio.com',
};

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    StoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    TimeagoModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(fbConfig)),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
