import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroDeNoticiasPage } from './cadastro-de-noticias.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDeNoticiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroDeNoticiasPageRoutingModule {}
