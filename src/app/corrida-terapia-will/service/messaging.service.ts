import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage: any;

  constructor(private afMessaging: AngularFireMessaging) { }


  requestPermission() {
    this.afMessaging.requestToken
      .pipe(take(1))
      .subscribe(
        (token) => console.log('Token de notificação:', token),
        (error) => console.error('Erro ao obter permissão', error)
      );
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe((message) => {
      console.log('Mensagem recebida:', message);
      this.currentMessage = message;
    });
  }
}
