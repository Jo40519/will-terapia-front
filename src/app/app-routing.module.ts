import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'corrida-terapia-will',
    loadChildren: () =>
      import('./corrida-terapia-will/corrida-terapia-will.module').then(
        (m) => m.CorridaTerapiaWillModule,
      ),
  },
  {
    path: '',
    redirectTo: 'corrida-terapia-will',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
