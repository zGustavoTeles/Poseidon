import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroDeUnidadesDevelopPageRoutingModule } from './cadastro-de-unidades-develop-routing.module';

import { CadastroDeUnidadesDevelopPage } from './cadastro-de-unidades-develop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroDeUnidadesDevelopPageRoutingModule
  ],
  declarations: [CadastroDeUnidadesDevelopPage]
})
export class CadastroDeUnidadesDevelopPageModule {}
