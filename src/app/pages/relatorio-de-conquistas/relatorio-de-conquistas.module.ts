import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioDeConquistasPageRoutingModule } from './relatorio-de-conquistas-routing.module';

import { RelatorioDeConquistasPage } from './relatorio-de-conquistas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioDeConquistasPageRoutingModule
  ],
  declarations: [RelatorioDeConquistasPage]
})
export class RelatorioDeConquistasPageModule {}
