import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentosDeClientesPageRoutingModule } from './agendamentos-de-clientes-routing.module';

import { AgendamentosDeClientesPage } from './agendamentos-de-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentosDeClientesPageRoutingModule
  ],
  declarations: [AgendamentosDeClientesPage]
})
export class AgendamentosDeClientesPageModule {}
