import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';

import { IonicModule, IonItemOptions } from '@ionic/angular';

import { MapPage } from './map';
import { MapPageRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    BrMaskerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule
  ],
  declarations: [
    MapPage,
  ]

})
export class MapModule { }
