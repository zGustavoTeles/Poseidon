import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarColaboradorPageRoutingModule } from './alterar-colaborador-routing.module';

import { AlterarColaboradorPage } from './alterar-colaborador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarColaboradorPageRoutingModule
  ],
  declarations: [AlterarColaboradorPage]
})
export class AlterarColaboradorPageModule {}
