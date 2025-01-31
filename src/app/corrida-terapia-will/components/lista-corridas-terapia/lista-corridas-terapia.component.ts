import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CorridaTerapiaWill } from '../../model/CorridaTerapiaWill';
import { CorridaTerapiaWillService } from '../../service/corrida-terapia-will.service';
import { NotificaService } from '../../service/notifica.service';

@Component({
  selector: 'app-lista-corridas-terapia',
  templateUrl: './lista-corridas-terapia.component.html',
  styleUrl: './lista-corridas-terapia.component.scss'
})
export class ListaCorridasTerapiaComponent {
@Input({required: true}) listaCorridaTerapia!: Array<CorridaTerapiaWill>;
@Output() confirmarDeletarTerapia = new EventEmitter<boolean>();
@Output() terapiaWill = new EventEmitter<CorridaTerapiaWill>();
@Input() valorTotalMes!: number;
constructor(public willService: CorridaTerapiaWillService, private notificaService: NotificaService){}

 deletarIdaTerapia(idaTerapia: CorridaTerapiaWill) {
    this.willService.excluirIdaTerapia(idaTerapia).then((resposta) => {
        this.notificaService.criaSucesso('Ida a terapia deletada com sucesso.', 'Sucesso!')
        this.confirmarDeletarTerapia.emit(true);
    })
}
}
