import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastosDoMesPage } from './gastos-do-mes.page';

const routes: Routes = [
  {
    path: '',
    component: GastosDoMesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastosDoMesPageRoutingModule {}
