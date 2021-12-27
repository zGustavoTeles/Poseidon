import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosDoMesPageRoutingModule } from './gastos-do-mes-routing.module';

import { GastosDoMesPage } from './gastos-do-mes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosDoMesPageRoutingModule
  ],
  declarations: [GastosDoMesPage]
})
export class GastosDoMesPageModule {}
