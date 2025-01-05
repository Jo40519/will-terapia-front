import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, last, lastValueFrom } from 'rxjs';
import { CorridaTerapiaWill } from '../model/CorridaTerapiaWill';

@Injectable({
  providedIn: 'root',
})
export class CorridaTerapiaWillService {
  urlApi = 'http://localhost:8081/terapia-will'
  constructor(private http: HttpClient) {}

  async listarCorridas(): Promise<Array<CorridaTerapiaWill>> {
    return lastValueFrom(
      this.http.get(this.urlApi),
    ) as Object as Array<CorridaTerapiaWill>;
  }

  async cadastrarIdaTerapi(
    entrada: CorridaTerapiaWill
  ): Promise<CorridaTerapiaWill> {
    return firstValueFrom(
      this.http.post(this.urlApi, entrada),
    ) as Object as CorridaTerapiaWill;
  }

  async excluirIdaTerapia(terapiaWill: CorridaTerapiaWill) {
    return firstValueFrom(
      this.http.delete(`${this.urlApi}/${terapiaWill.id}`)
    )
  }
}
