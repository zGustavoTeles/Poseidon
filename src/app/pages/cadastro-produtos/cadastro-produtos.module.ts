import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroTipoProdutoPageRoutingModule } from './cadastro-produtos-routing.module';

import { CadastroTipoProdutoPage } from './cadastro-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroTipoProdutoPageRoutingModule
  ],
  declarations: [CadastroTipoProdutoPage]
})
export class CadastroTipoProdutoPageModule {}
