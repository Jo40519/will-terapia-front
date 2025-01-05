import { LOCALE_ID, NgModule } from '@angular/core';
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

registerLocaleData(localePt); // Registra o locale

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    MessagesModule
  ],
  providers: [
    HttpClient, 
    TranslateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' } // Define o locale

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
