import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarNotificacoesPageRoutingModule } from './alterar-notificacoes-routing.module';

import { AlterarNotificacoesPage } from './alterar-notificacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarNotificacoesPageRoutingModule
  ],
  declarations: [AlterarNotificacoesPage]
})
export class AlterarNotificacoesPageModule {}
