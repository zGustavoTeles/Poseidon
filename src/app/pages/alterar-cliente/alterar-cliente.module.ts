import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarClientePageRoutingModule } from './alterar-cliente-routing.module';

import { AlterarClientePage } from './alterar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarClientePageRoutingModule
  ],
  declarations: [AlterarClientePage]
})
export class AlterarClientePageModule {}
