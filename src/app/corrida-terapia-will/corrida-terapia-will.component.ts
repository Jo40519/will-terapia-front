import { Component, OnDestroy, OnInit } from '@angular/core';
import { CorridaTerapiaWill } from './model/CorridaTerapiaWill';
import { CorridaTerapiaWillService } from './service/corrida-terapia-will.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificaService } from './service/notifica.service';
import { DatePipe } from '@angular/common';
import { Message } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';

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
  valorTotalMes!: number | null;
  mensagens: Message[] | undefined;


  constructor(
    public willService: CorridaTerapiaWillService,
    private datePipe: DatePipe,
  ) {}

  async ngOnInit() {
    await this.listarCorridas();
  }

  async listarCorridas() {
    this.valorTotalMes = null;
    const dataUsar = this.datePipe.transform(
      this.willService.fomFiltro.controls['dataFiltro'].value,
      'yyyy-MM-dd',
    );
    this.formatarData(dataUsar!);
    await this.willService.filtrarCorridas().then((resposta) => {
      this.willService.listaCorridas$.subscribe((corridas) => {
        this.listaCorridaTerapia = corridas;
        corridas.forEach((idas) => {
          this.formatarData(idas.dataidavolta as string);
          this.willService.getSomaPorMes(this.ano, this.mes).then((res) => {
            this.valorTotalMes = res;
          });
        });
      });
    });
  }

  formatarData(data: string) {
    const dataFormatada = data.split('-');
    this.ano = +`${dataFormatada[0]}`;
    this.mes = +`${dataFormatada[1]}`;
    console.log('MES E ANO', this.mes, this.ano);
  }

  ngOnDestroy(): void {
    this.willService.mensagensAlert = [];
  }
}
