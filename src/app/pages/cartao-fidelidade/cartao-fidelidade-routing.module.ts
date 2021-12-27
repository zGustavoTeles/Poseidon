import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaoFidelidadePage } from './cartao-fidelidade.page';

const routes: Routes = [
  {
    path: '',
    component: CartaoFidelidadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaoFidelidadePageRoutingModule {}
