import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorridaTerapiaWillComponent } from './corrida-terapia-will.component';
import { IncluirEditarIdaTerapiaComponent } from './components/incluir-editar-ida-terapia/incluir-editar-ida-terapia.component';

const routes: Routes = [
  {
    path: '',
    component: CorridaTerapiaWillComponent,
  },
  {
    path: 'ida-terapia/:tipo',
    component: IncluirEditarIdaTerapiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorridaTerapiaWillRoutingModule { }
