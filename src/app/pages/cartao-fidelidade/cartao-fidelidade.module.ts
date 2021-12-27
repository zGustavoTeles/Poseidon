import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaoFidelidadePageRoutingModule } from './cartao-fidelidade-routing.module';

import { CartaoFidelidadePage } from './cartao-fidelidade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaoFidelidadePageRoutingModule
  ],
  declarations: [CartaoFidelidadePage]
})
export class CartaoFidelidadePageModule {}
