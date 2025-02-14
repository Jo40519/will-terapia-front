import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTipoAcaoTerapia } from '../../model/enum/TipoAcaoTerapiaWill';
import { FormIncluirEditarIdaTerapia } from '../../model/FormIncuirEditarIdaTerapia';
import { FormControl, FormGroup } from '@angular/forms';
import { CorridaTerapiaWillService } from '../../service/corrida-terapia-will.service';
import { CorridaTerapiaWill } from '../../model/CorridaTerapiaWill';
import { DatePipe } from '@angular/common';
import { NotificaService } from '../../service/notifica.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-incluir-editar-ida-terapia',
  templateUrl: './incluir-editar-ida-terapia.component.html',
  styleUrl: './incluir-editar-ida-terapia.component.scss',
})
export class IncluirEditarIdaTerapiaComponent implements OnInit, OnDestroy {
  tipoAcaoTerapia!: EnumTipoAcaoTerapia;
  terapiaWill: CorridaTerapiaWill = {
    id: 0,
  } as CorridaTerapiaWill;
  formIncluirEditarTerapiWill = new FormGroup<FormIncluirEditarIdaTerapia>({
    data: new FormControl(new Date().toString()),
    indicadorPodeLevar: new FormControl(true),
    indicadorPodeTrazer: new FormControl(false),
    valorCorrida: new FormControl(null),
    valorVolta: new FormControl(null),
    id: new FormControl(null),
    valorTotal: new FormControl(null),
    descricao: new FormControl(null),
  }) as FormGroup<FormIncluirEditarIdaTerapia>;

  subs: Array<Subscription> = [];

  get indicadorPodeLevar() {
    return this.formIncluirEditarTerapiWill.controls['indicadorPodeLevar'];
  }

  get indicadorPodeTrazer() {
    return this.formIncluirEditarTerapiWill.controls['indicadorPodeTrazer'];
  }

  get valorCorrida() {
    return this.formIncluirEditarTerapiWill.controls['valorCorrida'];
  }

  get valorVolta() {
    return this.formIncluirEditarTerapiWill.controls['valorVolta'];
  }
  constructor(
    private activateRouter: ActivatedRoute,
    private willService: CorridaTerapiaWillService,
    private datePipe: DatePipe,
    private notificaService: NotificaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.definirTipoAcaoIdaTerapia();
    this.atualizaIndicadorPodeTrazer(false);
    this.acaoTerapiaDefinida();
  }

  definirTipoAcaoIdaTerapia() {
    this.activateRouter.params.subscribe((params) => {
      this.tipoAcaoTerapia = params['tipo'] as EnumTipoAcaoTerapia;
    });
  }

  acaoTerapiaDefinida() {
    if (this.tipoAcaoTerapia === 'editar') {
      const subCorrida = this.willService.detalheCorrida$.subscribe(
        (corrida) => {
          this.setValoresFormEditarCorrida(corrida);
          this.atualizaIndicadorPodeLevar(corrida.indicadorPodeLevar);
          this.atualizaIndicadorPodeTrazer(corrida.indicadorPodeTrazer);
        },
      );
      this.subs.push(subCorrida);
    }
  }

  incluirIdaTerapia() {
    const dataFormatada = this.datePipe.transform(
      this.formIncluirEditarTerapiWill.controls['data'].value,
      'yyyy-MM-dd',
    );
    const requisicao: CorridaTerapiaWill = {
      id: this.formIncluirEditarTerapiWill.controls['id'].value!,
      dataidavolta: dataFormatada!,
      indicadorPodeLevar:
        this.formIncluirEditarTerapiWill.controls['indicadorPodeLevar'].value!,
      indicadorPodeTrazer:
        this.formIncluirEditarTerapiWill.controls['indicadorPodeTrazer'].value!,
      valorCorrida:
        this.formIncluirEditarTerapiWill.controls['valorCorrida'].value! || 0,
      valorTotal:
        this.formIncluirEditarTerapiWill.controls['valorCorrida'].value! +
        this.formIncluirEditarTerapiWill.controls['valorVolta'].value!,
      valorVolta:
        this.formIncluirEditarTerapiWill.controls['valorVolta'].value! || 0,
      descricao: this.formIncluirEditarTerapiWill.controls['descricao'].value!,
    };

    if (this.tipoAcaoTerapia === 'editar') {
      console.log('REQUISIÇÃO', requisicao);
      this.willService.alterarTerapia(requisicao).then((resposta) => {
        console.log('SUCESSO!', resposta);
        this.router.navigateByUrl('/');
        this.willService.executarMensagens(
          'Terapia alterada com sucesso',
          'success',
          'Sucesso!'
        );
      });
    } else {
      this.willService.cadastrarIdaTerapi(requisicao).then((resposta) => {
        this.willService.executarMensagens(
          'Terapia incluída com sucesso',
          'success',
          'Sucesso!'
        );
        this.router.navigateByUrl('/');
      });
    }
  }

  atualizaIndicadorPodeLevar(event: boolean) {
    if (event) {
      this.valorCorrida.enable();
    } else {
      this.valorCorrida.disable();
    }
  }

  atualizaIndicadorPodeTrazer(event: boolean) {
    if (event) {
      this.valorVolta.enable();
    } else {
      this.valorVolta.disable();
    }
  }

  setValoresFormEditarCorrida(corrida: CorridaTerapiaWill) {
    const dataCorrigida = new Date(corrida.dataidavolta + 'T00:00:00');

    this.formIncluirEditarTerapiWill.patchValue({
      ...corrida,
      data: dataCorrigida,
      id: corrida.id!,
    });

    console.log(
      'COMO ESTÁ VINDO O FORM PREENCHIDO',
      this.formIncluirEditarTerapiWill.value,
    );
  }

  ngOnDestroy() {
    this.subs.forEach((subs) => subs.unsubscribe());
  }
}
