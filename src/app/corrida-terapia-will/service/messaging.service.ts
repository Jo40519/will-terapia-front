import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { getMessaging, getToken } from '@angular/fire/messaging';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage: any;
  token = '';

  constructor(private afMessaging: AngularFireMessaging) { }


 async requestPermission() {
      try {
        // Registra o service worker manualmente com o caminho correto
        const registration = await navigator.serviceWorker.register('/will-terapia-front/firebase-messaging-sw.js');
        console.log("Service Worker registrado:", registration);
  
        // Obtém a instância do Firebase Messaging
        const messaging = getMessaging();
  
        // Obtém o token de notificação, passando o service worker registrado
        const token = await getToken(messaging, { 
          vapidKey: 'BMqNwgSQzz1AeYoCkL0eiwRELkTiamQwfuPZC3nOrTUf-REjB1BLjaomOoZfn8jKB8dnUpxoViy35YislIgpEa0', 
          serviceWorkerRegistration: registration
        });
  
        if (token) {
          console.log("Token FCM:", token);
          this.token = token;
        } else {
          console.warn("Nenhum token FCM disponível.");
        }
  
      } catch (err) {
        console.error("Erro ao registrar Service Worker ou obter token:", err);
      }
    // this.afMessaging.requestToken
    //   .pipe(take(1))
    //   .subscribe(
    //     (token) => console.log('Token de notificação:', token),
    //     (error) => console.error('Erro ao obter permissão', error)
    //   );
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe((message) => {
      console.log('Mensagem recebida:', message);
      this.currentMessage = message;
    });
  }
}
