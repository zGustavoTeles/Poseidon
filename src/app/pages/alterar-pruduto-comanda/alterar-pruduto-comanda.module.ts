import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarPrudutoComandaPageRoutingModule } from './alterar-pruduto-comanda-routing.module';

import { AlterarPrudutoComandaPage } from './alterar-pruduto-comanda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarPrudutoComandaPageRoutingModule
  ],
  declarations: [AlterarPrudutoComandaPage]
})
export class AlterarPrudutoComandaPageModule {}
