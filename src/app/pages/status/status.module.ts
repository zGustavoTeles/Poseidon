import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StatusPageRoutingModule } from './status-routing.module';
import { StatusPage } from './status.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StatusPageRoutingModule
  ],
  declarations: [StatusPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StatusPageModule {}
