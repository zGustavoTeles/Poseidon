import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Config, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { FiltroProdutoComponent } from '../../components/filtro-produto/filtro-produto.component';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserData } from '../../providers/user-data';
import { AlterarProdutoPage } from '../alterar-produto/alterar-produto.page';
import { InserirProdutoCarrinhoPage } from '../inserir-produto-carrinho/inserir-produto-carrinho.page';
import { RelatorioUtil } from '../util/relatorio.util';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
    styleUrls: ['./map.scss']
})

export class MapPage implements OnInit {

    dataVenda: Date;
    vendedor: any;
    produto: any;
    categoria: any;
    quantidade: any;
    valorDeVenda: any;
    formaPagamento: any;

    ios: boolean;
    submitted = false;
    descricao: any;

    produtos: any = [];
    produtosAux: any = [];
    formaDePagamentos: any = [];
    valorProdutos: any[];
    valorProduto: any;

    perfil: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;
    unidade: any;

    quantidadeCarrinho = 0;
    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;
    showSearchbar: boolean;

    clientes: any = [];
    itens: any = [];
    clientsData: any = [];

    produtosInseridos: any = [];

    filtros: any; // Define see existe algum tipo de filtro
    retornoFiltroModal = false;
    descricaoFiltro = [];
    kitsUsandoFiltro = [];
    filtroInterno = [];
    listaProdutosComFiltro = [];
    listaKitsComFiltro = [];
    buscaDescricaoFiltro = false;
    filtroEstoque = false; // Para o html
    tipoOrdenacao = '';
    tipoClassificacao = '';
    existeClassificacao = false;
    mudandoUnidade = false;
    existeDescricao = false; // Retorno filtro com descricao adicionada
    existeOrdenacao = false; // Retorno filtro com tipo ordenação
    existeTabelaPreco = false;
    somenteProdutos = false;
    somenteServicos = false;


    ordemEscolhida = '';
    filtroDefinido = [];
    offset = 0;
    tipoOrdenado = '';
    comFiltroSql: string;
    searchLike = true;

    public static produtoInserido: boolean = false;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private infoLogin: UserData,
        public router: Router,
        public loadingController: LoadingController,
        private dadosRepositories: DadosRepositories,
        private popoverController: PopoverController,
        private modalCtrl: ModalController,
        private alertController: AlertController,
    ) { }

    ngOnInit() {
        this.vendedor = this.infoLogin.getUsername;
        this.dataVenda = new Date;
        this.getDadosUsuario();
        this.findAllProducts();
        this.ios = this.config.get('mode') === 'ios';
    }

    // Abrindo buscas e retornando filtros
    async touchOpcoesFiltro(ev: any) {
    }

    public async findAllProducts() {
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Carregando Produtos...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();

        await this.firebaseService.findAllProducts(this.unidade).subscribe(data => {
            this.produtos = [];
            this.quantidade = 0;
            this.produtosAux = [];
            this.produtosAux = data;
            
            for (let produto of this.produtosAux) {
                if (produto.unidade === this.unidade) {
                    this.produtos.push(produto);
                    this.quantidade += 1;
                }
            }
            loading.dismiss();
        });
    }

    async inserirProdutoCarrinho(produtoId: any, descricao: any, categoria: any, estoque: any, valorDeVenda: any) {
        InserirProdutoCarrinhoPage.produtoId = produtoId;
        InserirProdutoCarrinhoPage.descricao = descricao;
        InserirProdutoCarrinhoPage.categoria = categoria;
        InserirProdutoCarrinhoPage.estoque = estoque;
        InserirProdutoCarrinhoPage.valorDeVenda = valorDeVenda;
        InserirProdutoCarrinhoPage.produtoInserido = false;

        const modal = await this.modalCtrl.create({
            component: InserirProdutoCarrinhoPage,
        });
        await modal.present();

        await modal.onDidDismiss().then(async data => {
            console.log('aquiii');
            this.ngOnInit();
        });
    }

    getDadosUsuario() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }

    async excluirProduto(produtoId: any, descricao: any,) {
        try {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Deseja Excluir esse Produto:<br><b>${descricao}</b></text>`,

                backdropDismiss: false,
                header: "Atenção",
                cssClass: "alertaCss",

                buttons: [
                    {
                        text: 'Não',
                        role: 'cancel',
                        cssClass: 'cancelcancelarButton',
                        handler: async () => {
                            return;
                        }
                    },
                    {
                        text: 'Sim',
                        cssClass: 'okButton',
                        handler: async () => {
                            this.firebaseService.deleteProduct(produtoId);

                            const alert = await this.alertController.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                 <text>Produto Excluído Com Sucesso!</text>`,
                                backdropDismiss: false,
                                header: "Atenção",
                                cssClass: "alertaCss",
                                buttons: [
                                    {
                                        text: "Ok",
                                        role: "Cancelar",
                                        cssClass: "secondary",

                                        handler: () => {
                                        },
                                    },
                                ],
                            });
                            await alert.present();
                        }
                    }
                ]
            });
            await alert.present();

        } catch (error) {
            console.log(error);
        }
    }

    async atualizarProduto(produtoId: any, imagem: any, unidade: any, categoria: any, descricao: any, quantidade: any, fidelidade: any, comissao: any, valorDeCusto: any, valorDeVenda: any) {
        try {
            AlterarProdutoPage.produtoIdAtual = produtoId;
            AlterarProdutoPage.imagemAtual = imagem;
            AlterarProdutoPage.unidadeAtual = unidade;
            AlterarProdutoPage.categoriaAtual = categoria;
            AlterarProdutoPage.descricaoAtual = descricao;
            AlterarProdutoPage.quantidadeAtual = quantidade;
            AlterarProdutoPage.fidelidadeAtual = fidelidade;
            AlterarProdutoPage.comissaoAtual = comissao;
            AlterarProdutoPage.valorDeCustoAtual = valorDeCusto;
            AlterarProdutoPage.valorDeVendaAtual = valorDeVenda;

            const modal = await this.modalCtrl.create({
                component: AlterarProdutoPage,
            });
            await modal.present();

        } catch (error) {
            console.log(error);
        }
    }

 /**
 * Escanea o codigo de barras
 */
    touchAbrirLeitorCodigoBarras() {
        // this.barCodeUtil.buscandoCodigo().then(async res => {
        //     if (res.text.length > 4) {
        //         // Adicionando o codigo de barras automaticamente
        //         this.textoDoFiltro = res.text;
        //         this.filtros = true;
        //         await this.montandoFiltroSql(this.textoDoFiltro);
        //         await this.executandoSqlDefinido(this.comFiltroSql);

        //     }
        // });
    }

    /**
     * Abrindo buscas e retornando filtros
     * @param ev
     */
    async touchAbreFiltroProduto(ev?: any) {
        const popover = await this.popoverController.create({
            component: FiltroProdutoComponent,
            event: ev,
            translucent: true,
            cssClass: 'cssPopover',
            componentProps: {
                // pedidoTemp: this.pedidoTemp,
                // pedidosTempMultiEmpresa: this.pedidosTempMultiEmpresa
            }
        });
        await popover.present();
        await popover.onDidDismiss().then(async data => {
            if (data.data !== undefined) {
                const loading = await this.loadingController.create({
                    message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br><br> Filtrando...',
                    spinner: null,
                    cssClass: 'loadingCss',
                });
                await loading.present();

                try {

                    this.existeOrdenacao = data.data.ordernar !== '' ? true : false;
                    this.tipoOrdenacao = data.data.ordernar;
                    this.somenteProdutos = data.data.somenteProdutos;
                    this.somenteServicos = data.data.somenteServicos;

                    if (this.somenteProdutos || this.somenteServicos) {
                        if (this.somenteProdutos)
                            this.produtos = await this.ordernarRelatorio(this.produtos, 'Somente Produtos');
                        else if (this.somenteServicos)
                            this.produtos = await this.ordernarRelatorio(this.produtos, 'Somente Serviços');
                    }

                } catch (error) {
                    console.log('Erro do retorno do filtro', error);
                    await loading.dismiss();
                }
                await loading.dismiss();
            }
        });
    }

    /**
    * Faz a ordenação do relatorio por data
    * @param listaParaOrdenar - Array a ser ordenado
    * @param tipoOrdenacao - Crescente - Decrecente
    * @returns 
    */
    async ordernarRelatorio(listaParaOrdenar: any, tipoOrdenacao: string): Promise<any> {

        try {
            const temp = [...listaParaOrdenar];

            if (tipoOrdenacao === 'Crescente') {
                temp.sort((a, b) => {
                    return a.dataUltimaFatura <= b.dataUltimaFatura ? -1 : 1
                })
            } else if (tipoOrdenacao === 'Decrescente') {
                temp.sort((a, b) => {
                    return a.dataUltimaFatura >= b.dataUltimaFatura ? -1 : 1

                })
            } else if (tipoOrdenacao === 'Maior Valor') {
                temp.sort((a, b) => {
                    return a.totalValor >= b.totalValor ? -1 : 1

                })

            } else if (tipoOrdenacao === 'Menor Valor') {
                temp.sort((a, b) => {
                    return a.totalValor <= b.totalValor ? -1 : 1

                })

            } else if (tipoOrdenacao === 'Somente Produtos') {
                temp.sort((a, b) => {
                    return a.categoria != 'Serviços' ? -1 : 1

                })

            } else if (tipoOrdenacao === 'Somente Serviços') {
                temp.sort((a, b) => {
                    return a.categoria === 'Serviços' ? -1 : 1

                })
            }

            return temp;

        } catch (error) {
            console.log('Erro na ordenação!:', error);
            return listaParaOrdenar;
        }

    }
}

