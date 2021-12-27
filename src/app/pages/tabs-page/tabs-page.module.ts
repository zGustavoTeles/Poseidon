import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { MapModule } from '../map/map.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerListModule } from '../cadastro-de-produtos/cadastro-de-produtos.module';
import { InserirProdutoCarrinhoPageModule } from '../inserir-produto-carrinho/inserir-produto-carrinho.module';
import { ComandaPageModule } from '../comanda/comanda.module';
import { SignUpModule } from '../signup/signup.module';
import { RelatorioDeVendasPageModule } from '../relatorio-de-vendas/relatorio-de-vendas.module';
import { HomePageModule } from '../home/home.module';

@NgModule({
    imports: [
        InserirProdutoCarrinhoPageModule,
        ComandaPageModule,
        CommonModule,
        IonicModule,
        MapModule,
        ScheduleModule,
        SessionDetailModule,
        SpeakerListModule,
        SignUpModule,
        RelatorioDeVendasPageModule,
        TabsPageRoutingModule,
        HomePageModule
    ],
    declarations: [
        TabsPage,
    ]
})
export class TabsModule { }
