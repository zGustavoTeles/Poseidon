import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioDeVendasPageRoutingModule } from './relatorio-de-vendas-routing.module';

import { RelatorioDeVendasPage } from './relatorio-de-vendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioDeVendasPageRoutingModule
  ],
  declarations: [RelatorioDeVendasPage]
})
export class RelatorioDeVendasPageModule {}
