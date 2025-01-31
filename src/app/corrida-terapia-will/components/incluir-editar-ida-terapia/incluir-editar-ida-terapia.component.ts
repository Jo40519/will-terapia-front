import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTipoAcaoTerapia } from '../../model/enum/TipoAcaoTerapiaWill';
import { FormIncluirEditarIdaTerapia } from '../../model/FormIncuirEditarIdaTerapia';
import { FormControl, FormGroup } from '@angular/forms';
import { CorridaTerapiaWillService } from '../../service/corrida-terapia-will.service';
import { CorridaTerapiaWill } from '../../model/CorridaTerapiaWill';
import { DatePipe } from '@angular/common';
import { NotificaService } from '../../service/notifica.service';

@Component({
  selector: 'app-incluir-editar-ida-terapia',
  templateUrl: './incluir-editar-ida-terapia.component.html',
  styleUrl: './incluir-editar-ida-terapia.component.scss',
})
export class IncluirEditarIdaTerapiaComponent implements OnInit {
  tipoAcaoTerapia!: EnumTipoAcaoTerapia;
  terapiaWill: CorridaTerapiaWill = {
    id: 0
  } as CorridaTerapiaWill
  formIncluirEditarTerapiWill = new FormGroup<FormIncluirEditarIdaTerapia>({
    data: new FormControl(new Date()),
    indicadorPodeLevar: new FormControl(true),
    indicadorPodeTrazer: new FormControl(false),
    valorCorrida: new FormControl(null),
    valorVolta: new FormControl(null),
    id: new FormControl(null),
    valorTotal: new FormControl(null),
  }) as FormGroup<FormIncluirEditarIdaTerapia>;

  get indicadorPodeLevar() {
    return this.formIncluirEditarTerapiWill.controls['indicadorPodeLevar']
  }

  get valorCorrida() {
    return this.formIncluirEditarTerapiWill.controls['valorCorrida']
  }

  get valorVolta() {
    return this.formIncluirEditarTerapiWill.controls['valorVolta']
  }
  constructor(private activateRouter: ActivatedRoute, 
    private willService: CorridaTerapiaWillService, 
    private datePipe: DatePipe,
    private notificaService: NotificaService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.definirTipoAcaoIdaTerapia();
    this.atualizaIndicadorPodeTrazer(false);
  }

  definirTipoAcaoIdaTerapia() {
    this.activateRouter.params.subscribe((params) => {
      this.tipoAcaoTerapia = params['tipo'] as EnumTipoAcaoTerapia;
    });
  }

    incluirIdaTerapia() {
    const dataFormatada = this.datePipe.transform(this.formIncluirEditarTerapiWill.controls['data'].value, 'yyyy-MM-dd')
    const requisicao: Omit<CorridaTerapiaWill, 'id'> = {
      dataidavolta: dataFormatada!,
      indicadorPodeLevar: this.formIncluirEditarTerapiWill.controls['indicadorPodeLevar'].value!,
      indicadorPodeTrazer: this.formIncluirEditarTerapiWill.controls['indicadorPodeTrazer'].value!,
      valorCorrida: this.formIncluirEditarTerapiWill.controls['valorCorrida'].value! || 0,
      valorTotal: this.formIncluirEditarTerapiWill.controls['valorCorrida'].value! + this.formIncluirEditarTerapiWill.controls['valorVolta'].value!,
      valorVolta: this.formIncluirEditarTerapiWill.controls['valorVolta'].value! || 0
    }

    this.willService.cadastrarIdaTerapi(requisicao).then((resposta) => {

      this.notificaService.criaSucesso('Ida a terapia cadastrada com sucesso!', 'Sucesso!')
      this.router.navigateByUrl('/')
    })
  }

  atualizaIndicadorPodeLevar(event: boolean) {
    if(event) {
      this.valorCorrida.enable();
    } else {
      this.valorCorrida.disable();
    }
  }

  atualizaIndicadorPodeTrazer(event: boolean) {
    if(event) {
      this.valorVolta.enable();
    } else {
      this.valorVolta.disable();
    }
  }
}
