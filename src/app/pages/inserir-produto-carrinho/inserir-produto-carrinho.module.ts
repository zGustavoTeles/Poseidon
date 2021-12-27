import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InserirProdutoCarrinhoPageRoutingModule } from './inserir-produto-carrinho-routing.module';

import { InserirProdutoCarrinhoPage } from './inserir-produto-carrinho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InserirProdutoCarrinhoPageRoutingModule
  ],
  declarations: [InserirProdutoCarrinhoPage]
})
export class InserirProdutoCarrinhoPageModule {}
