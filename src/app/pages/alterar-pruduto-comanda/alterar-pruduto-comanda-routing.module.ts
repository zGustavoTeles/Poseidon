import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarPrudutoComandaPage } from './alterar-pruduto-comanda.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarPrudutoComandaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarPrudutoComandaPageRoutingModule {}
