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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { MessagingService } from './corrida-terapia-will/service/messaging.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';

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
      registrationStrategy: 'registerWhenStable:30000',
      
    }),
    AngularFireModule.initializeApp({
      projectId: "notificacoes-terapia",
      appId: "1:1005776109523:web:31815fbb3adf5865667926",
      storageBucket: "notificacoes-terapia.firebasestorage.app",
      apiKey: "AIzaSyA3lcW6n-BTd8Ij-W89JqzIf2GuHPo5f3g",
      authDomain: "notificacoes-terapia.firebaseapp.com",
      messagingSenderId: "1005776109523",
      measurementId: "G-MNSELL4E7L"
    }),
    AngularFireMessagingModule
  ],
  providers: [
    HttpClient, 
    TranslateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideFirebaseApp(() => initializeApp({"projectId":"notificacoes-terapia","appId":"1:1005776109523:web:31815fbb3adf5865667926","storageBucket":"notificacoes-terapia.firebasestorage.app","apiKey":"AIzaSyA3lcW6n-BTd8Ij-W89JqzIf2GuHPo5f3g","authDomain":"notificacoes-terapia.firebaseapp.com","messagingSenderId":"1005776109523","measurementId":"G-MNSELL4E7L"})),
    provideMessaging(() => getMessaging()), // Define o locale
    MessagingService,
    AngularFireMessaging
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
