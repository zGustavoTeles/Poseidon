import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../schedule/schedule';
import { CheckTutorial } from '../../providers/check-tutorial.service';
import { HomePageModule } from '../home/home.module';


const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        component: SchedulePage,
                    },
                    {
                        path: 'session/:sessionId',
                        loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
                    }
                ]
            },

            {
                path: 'home',
                children: [

                    {
                        path: '',
                        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
                    }
                ]
            },

            {
                path: 'speakers',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../cadastro-de-produtos/cadastro-de-produtos.module').then(m => m.SpeakerListModule)
                    },
                    {
                        path: 'session/:sessionId',
                        loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
                    },
                ]
            },
            {
                path: 'map',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../map/map.module').then(m => m.MapModule)
                    }
                ]
            },
            {
                path: 'relatorios',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../relatorios/relatorios.module').then(m => m.RelatoriosPageModule)
                    }
                ]
            },

            {
                path: 'relatorio-de-vendas',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../relatorio-de-vendas/relatorio-de-vendas.module').then(m => m.RelatorioDeVendasPageModule)
                    }
                ]
            },

            {
                path: 'status',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../status/status.module').then(m => m.StatusPageModule)
                    },
                ]
            },

            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
                    },
                ]
            },

            {
                path: 'vendas',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../vendas/vendas.module').then(m => m.VendasPageModule)
                    },
                ]
            },

            {
                path: 'cartao-fidelidade',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../cartao-fidelidade/cartao-fidelidade.module').then(m => m.CartaoFidelidadePageModule)
                    },
                ]
            },

            {
                path: '',
                redirectTo: '/app/tabs/schedule',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }