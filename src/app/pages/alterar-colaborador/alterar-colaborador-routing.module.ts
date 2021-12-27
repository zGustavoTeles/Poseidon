import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarColaboradorPage } from './alterar-colaborador.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarColaboradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarColaboradorPageRoutingModule {}
