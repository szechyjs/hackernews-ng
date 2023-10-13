import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp, FirebaseOptions } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TimeagoModule } from 'ngx-timeago';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const fbConfig: FirebaseOptions = {
  databaseURL: 'https://hacker-news.firebaseio.com',
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    TimeagoModule.forRoot(),
    provideFirebaseApp(() => initializeApp(fbConfig)),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
