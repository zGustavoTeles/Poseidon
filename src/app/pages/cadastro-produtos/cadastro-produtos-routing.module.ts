import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroTipoProdutoPage } from './cadastro-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroTipoProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroTipoProdutoPageRoutingModule {}
