import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValePageRoutingModule } from './vale-routing.module';

import { ValePage } from './vale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValePageRoutingModule
  ],
  declarations: [ValePage]
})
export class ValePageModule {}
