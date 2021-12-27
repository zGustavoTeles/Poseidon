import { Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'support',
        loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'app',
        loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
    },
    {
        path: 'tutorial',
        loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
        canLoad: [CheckTutorial]
    },
    {
        path: 'relatorios',
        loadChildren: () => import('./pages/relatorios/relatorios.module').then(m => m.RelatoriosPageModule)
    },
    {
        path: 'cadastro-de-produtos',
        loadChildren: () => import('./pages/cadastro-de-produtos/cadastro-de-produtos.module').then(m => m.SpeakerListModule)
    },

    {
        path: 'cadastro-tipo-venda',
        loadChildren: () => import('./pages/cadastro-de-categorias/cadastro-de-categorias.module').then(m => m.CadastroTipoVendaPageModule)
    },
    {
        path: 'cadastro-tipo-produto',
        loadChildren: () => import('./pages/cadastro-produtos/cadastro-produtos.module').then(m => m.CadastroTipoProdutoPageModule)
    },
    {
        path: 'cadastro-usuarios',
        loadChildren: () => import('./pages/cadastro-usuarios/cadastro-usuarios.module').then(m => m.CadastroUsuariosPageModule)
    },
    {
        path: 'cadastro-funcionarios',
        loadChildren: () => import('./pages/cadastro-funcionarios/cadastro-funcionarios.module').then(m => m.CadastroFuncionariosPageModule)
    },
    {
        path: 'inserir-produto-carrinho',
        loadChildren: () => import('./pages/inserir-produto-carrinho/inserir-produto-carrinho.module').then(m => m.InserirProdutoCarrinhoPageModule)
    },
    {
        path: 'carrinho',
        loadChildren: () => import('./pages/carrinho/carrinho.module').then(m => m.CarrinhoPageModule)
    },
    {
        path: 'comanda',
        loadChildren: () => import('./pages/comanda/comanda.module').then(m => m.ComandaPageModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
    },
    {
        path: 'relatorio-de-vendas',
        loadChildren: () => import('./pages/relatorio-de-vendas/relatorio-de-vendas.module').then(m => m.RelatorioDeVendasPageModule)
    },
    {
        path: 'cadastro-de-unidades-develop',
        loadChildren: () => import('./pages/cadastro-de-unidades-develop/cadastro-de-unidades-develop.module').then(m => m.CadastroDeUnidadesDevelopPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'status',
        loadChildren: () => import('./pages/status/status.module').then(m => m.StatusPageModule)
    },
    {
        path: 'cartao-fidelidade',
        loadChildren: () => import('./pages/cartao-fidelidade/cartao-fidelidade.module').then(m => m.CartaoFidelidadePageModule)
    },
    {
        path: 'cadastro-de-noticias',
        loadChildren: () => import('./pages/cadastro-de-noticias/cadastro-de-noticias.module').then(m => m.CadastroDeNoticiasPageModule)
    },
    {
        path: 'relatorio-de-conquistas',
        loadChildren: () => import('./pages/relatorio-de-conquistas/relatorio-de-conquistas.module').then(m => m.RelatorioDeConquistasPageModule)
    },
    {
        path: 'agendamentos-de-clientes',
        loadChildren: () => import('./pages/agendamentos-de-clientes/agendamentos-de-clientes.module').then(m => m.AgendamentosDeClientesPageModule)
    },
    {
        path: 'alterar-notificacoes',
        loadChildren: () => import('./pages/alterar-notificacoes/alterar-notificacoes.module').then(m => m.AlterarNotificacoesPageModule)
    },
    {
        path: 'alterar-produto',
        loadChildren: () => import('./pages/alterar-produto/alterar-produto.module').then(m => m.AlterarProdutoPageModule)
    },
    {
        path: 'alterar-colaborador',
        loadChildren: () => import('./pages/alterar-colaborador/alterar-colaborador.module').then(m => m.AlterarColaboradorPageModule)
    },
    {
        path: 'alterar-cliente',
        loadChildren: () => import('./pages/alterar-cliente/alterar-cliente.module').then(m => m.AlterarClientePageModule)
    },
    {
        path: 'gastos-do-mes',
        loadChildren: () => import('./pages/gastos-do-mes/gastos-do-mes.module').then(m => m.GastosDoMesPageModule)
    },
    {
        path: 'faturamento',
        loadChildren: () => import('./pages/faturamento/faturamento.module').then(m => m.FaturamentoPageModule)
    },
    {
        path: 'alterar-pruduto-comanda',
        loadChildren: () => import('./pages/alterar-pruduto-comanda/alterar-pruduto-comanda.module').then(m => m.AlterarPrudutoComandaPageModule)
    },
    {
        path: 'vale',
        loadChildren: () => import('./pages/vale/vale.module').then(m => m.ValePageModule)
    },
    {
        path: 'vendas',
        loadChildren: () => import('./pages/vendas/vendas.module').then(m => m.VendasPageModule)
    },
    {
        path: 'clientes-temp-component',
        loadChildren: () => import('./components/clientes-temp-component/clientes-temp-component.component').then(m => m.ClientesTempComponentComponent)
    },

];


