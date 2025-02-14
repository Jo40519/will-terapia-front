import { Component, OnDestroy, OnInit } from '@angular/core';
import { CorridaTerapiaWill } from './model/CorridaTerapiaWill';
import { CorridaTerapiaWillService } from './service/corrida-terapia-will.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificaService } from './service/notifica.service';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-corrida-terapia-will',
  templateUrl: './corrida-terapia-will.component.html',
  styleUrl: './corrida-terapia-will.component.scss',
})
export class CorridaTerapiaWillComponent implements OnInit, OnDestroy {
  listaCorridaTerapia!: Array<CorridaTerapiaWill>;
  terapiaWill: CorridaTerapiaWill = {} as CorridaTerapiaWill;
  ano!: number;
  mes!: number;
  valorTotalMes!: number;
  subs: Array<Subscription> = [];
  mensagens: Message[] | undefined


  constructor(
    public willService: CorridaTerapiaWillService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit() {
    await this.listarCorridas();
    const subMensagem = this.willService.mensagensAlert$.subscribe((mensagem) => {
      this.mensagens = mensagem
      console.log('MENSAGENS AQUI ==>', this.mensagens);
    })
    this.subs.push(subMensagem);
  }

  async listarCorridas() {
    const dataUsar = this.datePipe.transform(this.willService.fomFiltro.controls['dataFiltro'].value, 'yyyy-MM-dd')
    this.formatarData(dataUsar!)
    await this.willService.filtrarCorridas().then((resposta) => {
     const subCorr =  this.willService.listaCorridas$.subscribe((corridas) => {
        this.listaCorridaTerapia = corridas;
        corridas.forEach((idas) => {
          this.formatarData(idas.dataidavolta as string);
          this.willService.getSomaPorMes(this.ano, this.mes).then((res) => {
            this.valorTotalMes = res;
          });
        });
        this.subs.push(subCorr);
      })
    });
  }

  formatarData(data: string) {
    const dataFormatada = data.split('-');
    this.ano = +`${dataFormatada[0]}`;
    this.mes = +`${dataFormatada[1]}`;
    console.log('MES E ANO', this.mes, this.ano);
  }


  ngOnDestroy(): void {
    this.subs.forEach((subs) => subs.unsubscribe());
  }
}
