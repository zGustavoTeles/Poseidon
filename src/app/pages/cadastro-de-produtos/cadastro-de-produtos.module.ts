import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SpeakerListPage } from './cadastro-de-produtos';
import { SpeakerListPageRoutingModule } from './cadastro-de-produtos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpeakerListPageRoutingModule
  ],
  declarations: [SpeakerListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SpeakerListModule {}
