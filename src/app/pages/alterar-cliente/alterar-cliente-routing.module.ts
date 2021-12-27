import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarClientePage } from './alterar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarClientePageRoutingModule {}
