import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CorridaTerapiaWill } from '../../model/CorridaTerapiaWill';
import { CorridaTerapiaWillService } from '../../service/corrida-terapia-will.service';
import { NotificaService } from '../../service/notifica.service';
import { MessagingService } from '../../service/messaging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-corridas-terapia',
  templateUrl: './lista-corridas-terapia.component.html',
  styleUrl: './lista-corridas-terapia.component.scss',
})
export class ListaCorridasTerapiaComponent {
  @Input({ required: true }) listaCorridaTerapia!: Array<CorridaTerapiaWill>;
  @Output() confirmarDeletarTerapia = new EventEmitter<boolean>();
  @Output() terapiaWill = new EventEmitter<CorridaTerapiaWill>();
  @Input() valorTotalMes!: number;
  constructor(
    public willService: CorridaTerapiaWillService,
    private notificaService: NotificaService,
    public messagingService: MessagingService,
    private router: Router
  ) {}

  deletarIdaTerapia(idaTerapia: CorridaTerapiaWill) {
    this.willService.excluirIdaTerapia(idaTerapia).then((resposta) => {
      this.willService.executarMensagens(
        'Ida a terapia deletada com sucesso.',
        'success',
        'Sucesso!'
      );
      this.confirmarDeletarTerapia.emit(true);
    });
  }

    detalharRedirecionarCorrida(corrida: CorridaTerapiaWill, tipoAcao: string) {
    this.willService.detalharCorrida(corrida)
      this.router.navigateByUrl(`corrida-terapia-will/ida-terapia/${tipoAcao}`)
  }
}
