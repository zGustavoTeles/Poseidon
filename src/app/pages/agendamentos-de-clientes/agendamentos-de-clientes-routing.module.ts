import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentosDeClientesPage } from './agendamentos-de-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentosDeClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosDeClientesPageRoutingModule {}
