import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroDeNoticiasPageRoutingModule } from './cadastro-de-noticias-routing.module';

import { CadastroDeNoticiasPage } from './cadastro-de-noticias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroDeNoticiasPageRoutingModule
  ],
  declarations: [CadastroDeNoticiasPage]
})
export class CadastroDeNoticiasPageModule {}
