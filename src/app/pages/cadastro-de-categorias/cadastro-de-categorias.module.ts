import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroTipoVendaPageRoutingModule } from './cadastro-de-categorias-routing.module';

import { CadastroTipoVendaPage } from './cadastro-de-categorias.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroTipoVendaPageRoutingModule
  ],
  declarations: [CadastroTipoVendaPage]
})
export class CadastroTipoVendaPageModule {}
