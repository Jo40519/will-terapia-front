import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localePt); // Registra o locale

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    MessagesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    HttpClient, 
    TranslateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
