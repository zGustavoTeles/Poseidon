import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InserirProdutoCarrinhoPage } from './inserir-produto-carrinho.page';

const routes: Routes = [
  {
    path: '',
    component: InserirProdutoCarrinhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InserirProdutoCarrinhoPageRoutingModule {}
