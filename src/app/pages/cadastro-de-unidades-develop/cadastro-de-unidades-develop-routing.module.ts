import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroDeUnidadesDevelopPage } from './cadastro-de-unidades-develop.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDeUnidadesDevelopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroDeUnidadesDevelopPageRoutingModule {}
