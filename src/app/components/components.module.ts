import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GraficoComponentsComponent } from './grafico-components/grafico-components.component';


const PAGES_COMPONENTES = [
    GraficoComponentsComponent
]

@NgModule({
    imports: [CommonModule,
        FormsModule,
        IonicModule.forRoot(),
    ],
    declarations: [
        PAGES_COMPONENTES,
    ],
    exports: [
        PAGES_COMPONENTES
    ],
    providers: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomComponentPoseidon { }
