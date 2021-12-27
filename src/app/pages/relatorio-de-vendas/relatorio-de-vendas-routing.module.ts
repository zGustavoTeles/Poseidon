import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioDeVendasPage } from './relatorio-de-vendas.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioDeVendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioDeVendasPageRoutingModule {}
