import { Component, OnInit } from '@angular/core';
import { CorridaTerapiaWillService } from '../../service/corrida-terapia-will.service';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-filtro-pesquisa',
  templateUrl: './filtro-pesquisa.component.html',
  styleUrl: './filtro-pesquisa.component.scss'
})
export class FiltroPesquisaComponent implements OnInit {
  checked!: boolean
  constructor(public willService: CorridaTerapiaWillService, public themeService: ThemeService){}
  ngOnInit(): void {
    this.themeService.checked = true
  }

  chengeTheme(theme: string, event?: MouseEvent) {
    event?.stopPropagation();
    if(this.themeService.checked) {
      this.themeService.changeTheme(theme)

    } else {
      this.themeService.changeTheme('lara-light-purple')
    }
  }
}
