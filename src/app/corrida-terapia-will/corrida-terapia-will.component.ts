import { Component, OnInit } from '@angular/core';
import { CorridaTerapiaWill } from './model/CorridaTerapiaWill';
import { CorridaTerapiaWillService } from './service/corrida-terapia-will.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificaService } from './service/notifica.service';


@Component({
  selector: 'app-corrida-terapia-will',
  templateUrl: './corrida-terapia-will.component.html',
  styleUrl: './corrida-terapia-will.component.scss'
})
export class CorridaTerapiaWillComponent implements OnInit {
  listaCorridaTerapia!: Array<CorridaTerapiaWill>;
  terapiaWill: CorridaTerapiaWill = {} as CorridaTerapiaWill;
  

  constructor(private willService: CorridaTerapiaWillService, private notificaService: NotificaService) {}
  async ngOnInit() {
    await this.listarCorridas();
  }


  async listarCorridas() {
    const resposta = await this.willService.listarCorridas();
    console.log('RESPOSTA AQUI ==>', resposta)
    this.listaCorridaTerapia = resposta;
  }

  deletarIdaTerapia(idaTerapia: CorridaTerapiaWill) {
      
  }

}
