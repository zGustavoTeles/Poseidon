import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroTipoVendaPage } from './cadastro-de-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroTipoVendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroTipoVendaPageRoutingModule {}
