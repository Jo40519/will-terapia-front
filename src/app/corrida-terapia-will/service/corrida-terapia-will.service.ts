import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, last, lastValueFrom } from 'rxjs';
import { CorridaTerapiaWill } from '../model/CorridaTerapiaWill';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';


@Injectable({
  providedIn: 'root',
})
export class CorridaTerapiaWillService {
  urlApi = 'https://terapia-back-production.up.railway.app/terapia_will'
  desenvUrl = 'http://localhost:8081/terapia_will'
  fomFiltro = new FormGroup({
    dataFiltro: new FormControl(new Date())
  })

  listaCorridasSubject = new BehaviorSubject<CorridaTerapiaWill[]>([])
  listaCorridas$ = this.listaCorridasSubject.asObservable();

  detalheCorridaSubject = new BehaviorSubject<CorridaTerapiaWill>({} as CorridaTerapiaWill)
  detalheCorrida$ = this.detalheCorridaSubject.asObservable()

  mensagensAlertSubject = new BehaviorSubject<Message[]>([])
  mensagensAlert$ = this.mensagensAlertSubject.asObservable();
  ano!: number;
  mes!: number;
  valorTotalMes!: number;


  get dataFiltro() {
    return this.fomFiltro.controls['dataFiltro']
  }
  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  async listarCorridas(): Promise<Array<CorridaTerapiaWill>> {
    return lastValueFrom(
      this.http.get(this.urlApi),
    ) as Object as Array<CorridaTerapiaWill>;
  }
  
  async listarCorridaMesAno(ano: number, mes: number): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.urlApi}/listar/${ano}/${mes}`));
  }

  async cadastrarIdaTerapi(
    entrada: CorridaTerapiaWill
  ): Promise<CorridaTerapiaWill> {
    return firstValueFrom(
      this.http.post(this.urlApi, entrada),
    ) as Object as CorridaTerapiaWill;
  }

  async alterarTerapia(terapiaWill: CorridaTerapiaWill): Promise<CorridaTerapiaWill> {
    return firstValueFrom(
      this.http.put(`${this.urlApi}/${terapiaWill.id}`, terapiaWill)
    ) as Object as CorridaTerapiaWill;
  }

  async excluirIdaTerapia(terapiaWill: CorridaTerapiaWill) {
    return firstValueFrom(
      this.http.delete(`${this.urlApi}/${terapiaWill.id}`)
    )
  }

  async getSomaPorMes(ano: number, mes: number): Promise<number> {
    return firstValueFrom(this.http.get<number>(`${this.urlApi}/soma/${ano}/${mes}`));
  }

    detalharCorrida(corridaTerapia: CorridaTerapiaWill) {
    this.detalheCorridaSubject.next({} as CorridaTerapiaWill);
    this.detalheCorridaSubject.next(corridaTerapia);
  }

  async filtrarCorridas() {
    const dataUsar = this.datePipe.transform(
      this.dataFiltro.value,
      'yyyy-MM-dd'
    );
    this.formatarData(dataUsar!);
  
    try {
      const resposta = await this.listarCorridaMesAno(this.ano, this.mes);
      
      const corridasFormatadas = resposta.map((corrida) => {
        this.formatarData(corrida.dataidavolta as string);
        return corrida;
      });
        this.listaCorridasSubject.next(corridasFormatadas);
        this.valorTotalMes = await this.getSomaPorMes(this.ano, this.mes);
    } catch (error) {
      console.error("Erro ao filtrar corridas:", error);
    }
  }

  
  formatarData(data: string) {
    const dataFormatada = data.split('-');
    this.ano = +`${dataFormatada[0]}`;
    this.mes = +`${dataFormatada[1]}`;
    console.log('MES E ANO', this.mes, this.ano);
  }

  executarMensagens(mensagem: string, severity: string, summary: string) {
    this.mensagensAlertSubject.next([{
      detail: mensagem,
      severity: severity,
      summary: summary
    }])
  }
}
