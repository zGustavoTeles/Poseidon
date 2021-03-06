import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Config, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { timeStamp } from 'console';
import { FiltroProdutoComponent } from '../../components/filtro-produto/filtro-produto.component';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserData } from '../../providers/user-data';
import { AlterarProdutoPage } from '../alterar-produto/alterar-produto.page';
import { InserirProdutoCarrinhoPage } from '../inserir-produto-carrinho/inserir-produto-carrinho.page';
import Quagga from 'quagga';
import { ThrowStmt } from '@angular/compiler';

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

    searchBarVisible = false;
    textoPesquisa = '';
    textoDoFiltro = ''; //

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
    existeOrdenacao = false; // Retorno filtro com tipo ordena????o
    existeTabelaPreco = false;


    produtosDeBeleza = false;
    roupas = false;
    produtosDeLimpeza = false;
    padaria = false;
    bebidas = false;
    alimentacao = false;
    higiene = false;
    tabacaria = false;
    diversos = false;
    hortifruti = false;
    servicos = false;
    papelaria = false;
    calcados = false;


    ordemEscolhida = '';
    filtroDefinido = [];
    offset = 0;
    tipoOrdenado = '';
    comFiltroSql: string;
    searchLike = true;

    gastosComProdutos: any;

    productsCard: any = [];
    productExistCard: boolean = false;

    codigoDeBarras: any;

    public static produtoInserido: boolean = false;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private infoLogin: UserData,
        public router: Router,
        public loadingController: LoadingController,
        private dadosRepositories: DadosRepositories,
        private popoverController: PopoverController,
        private toastController: ToastController,
        private modalCtrl: ModalController,
        private alertController: AlertController,
    ) { }

    ngOnInit() {
        this.codigoDeBarras = '';
        this.vendedor = this.infoLogin.getUsername;
        this.dataVenda = new Date;
        this.getDadosUsuario();
        this.findAllProducts();
        this.getProductsCard();
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
            this.gastosComProdutos = 0.0;
            this.produtosAux = [];
            this.produtosAux = data;

            for (let produto of this.produtosAux) {
                if (produto.unidade === this.unidade) {
                    this.produtos.push(produto);
                    this.quantidade += 1;
                    this.gastosComProdutos += parseFloat((produto.valorDeCusto * produto.quantidade).toFixed(2));
                }
            }
            this.registerGastoProduto();
            loading.dismiss();
        });
    }

    async inserirProdutoCarrinho(produtoId: any, descricao: any, categoria: any, estoque: any, valorDeVenda: any) {
        this.productExistCard = false;
        if (this.productsCard.length > 0) {
            for (let produto of this.productsCard) {
                if (produto.produto === descricao) {
                    this.productExistCard = true;
                }
            }
        }
        if (!this.productExistCard) {
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
        } else {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                 <text>O produto <b>${descricao}</b><br>se encontra no carrinho. Por favor<br>tente alter??-lo ou finalize<br>a venda!</text>`,
                backdropDismiss: false,
                header: "Aten????o",
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

    getDadosUsuario() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }

    async registerGastoProduto() {
        this.gastosComProdutos = this.gastosComProdutos.toFixed(2);
        this.dadosRepositories.removeLocalStorage('totalGastosComProdutos');
        this.dadosRepositories.setLocalStorage('totalGastosComProdutos', this.gastosComProdutos);
    }

    async excluirProduto(produtoId: any, descricao: any,) {
        try {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Deseja Excluir esse Produto:<br><b>${descricao}</b></text>`,

                backdropDismiss: false,
                header: "Aten????o",
                cssClass: "alertaCss",

                buttons: [
                    {
                        text: 'N??o',
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
                                 <text>Produto Exclu??do Com Sucesso!</text>`,
                                backdropDismiss: false,
                                header: "Aten????o",
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
                            this.findAllProducts();
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

                    this.roupas = data.data.roupas;
                    this.padaria = data.data.padaria;
                    this.bebidas = data.data.bebidas;
                    this.alimentacao = data.data.alimentacao;
                    this.higiene = data.data.higiene;
                    this.tabacaria = data.data.tabacaria;
                    this.diversos = data.data.diversos;
                    this.hortifruti = data.data.hortifruti;
                    this.servicos = data.data.servicos;
                    this.papelaria = data.data.papelaria;
                    this.calcados = data.data.calcados;
                    this.produtosDeBeleza = data.data.produtosDeBeleza;
                    this.produtosDeLimpeza = data.data.produtosDeLimpeza;

                    if (this.roupas) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Roupas');
                    } else if (this.padaria) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Padaria');
                    } else if (this.bebidas) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Bebidas');
                    } else if (this.alimentacao) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Alimenta????o');
                    } else if (this.higiene) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Higiene');
                    } else if (this.tabacaria) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Tabacaria');
                    } else if (this.diversos) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Diversos');
                    } else if (this.hortifruti) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Hortifruti');
                    } else if (this.servicos) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Servi??os');
                    } else if (this.papelaria) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Papelaria');
                    } else if (this.calcados) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Cal??ados');
                    } else if (this.produtosDeBeleza) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Produtos de Beleza');
                    } else if (this.produtosDeLimpeza) {
                        this.produtos = await this.ordernarRelatorio(this.produtos, 'Produtos de Limpeza');
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
    * Faz a ordena????o do relatorio por data
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

            } else if (tipoOrdenacao === 'Produtos de Beleza') {
                temp.sort((a, b) => {
                    return a.categoria === 'Produtos de Beleza' ? -1 : 1

                })
            } else if (tipoOrdenacao === 'Roupas') {
                temp.sort((a, b) => {
                    return a.categoria === 'Roupas' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Produtos de Limpeza') {
                temp.sort((a, b) => {
                    return a.categoria === 'Produtos de Limpeza' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Padaria') {
                temp.sort((a, b) => {
                    return a.categoria === 'Padaria' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Bebidas') {
                temp.sort((a, b) => {
                    return a.categoria === 'Bebidas' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Alimenta????o') {
                temp.sort((a, b) => {
                    return a.categoria === 'Alimenta????o' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Higiene') {
                temp.sort((a, b) => {
                    return a.categoria === 'Higiene' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Tabacaria') {
                temp.sort((a, b) => {
                    return a.categoria === 'Tabacaria' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Diversos') {
                temp.sort((a, b) => {
                    return a.categoria === 'Diversos' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Hortifr??ti') {
                temp.sort((a, b) => {
                    return a.categoria === 'Hortifr??ti' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Servi??os') {
                temp.sort((a, b) => {
                    return a.categoria === 'Servi??os' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Papelaria') {
                temp.sort((a, b) => {
                    return a.categoria === 'Papelaria' ? -1 : 1

                })
            }

            else if (tipoOrdenacao === 'Cal??ados') {
                temp.sort((a, b) => {
                    return a.categoria === 'Cal??ados' ? -1 : 1

                })
            }

            return temp;

        } catch (error) {
            console.log('Erro na ordena????o!:', error);
            return listaParaOrdenar;
        }

    }

    async filtrarProdutos(ev: any): Promise<any> {
        this.textoPesquisa = '';
        if (ev.target !== undefined) {
            this.textoDoFiltro = ev.target.value;
        } else {
            this.textoDoFiltro = ev;
        }
        const toast = await this.toastController.create({
            message: 'Filtrando...',
            duration: 3000,
            cssClass: 'toastCss',
        });
        await toast.present();

        if (this.textoDoFiltro.length >= 1) {
            try {
                if (this.produtos.length > 0) {
                    let listaProd = this.produtos;
                    this.produtos = [];
                    return listaProd.filter(async (item) => {
                        if (String(item.descricao).toLowerCase().includes(this.textoDoFiltro.toLowerCase()) || String(item.categoria).toLowerCase().includes(this.textoDoFiltro.toLowerCase())) {
                            this.produtos.push(item);
                            return true;
                        }
                    });
                } else {
                    await toast.dismiss();
                }
            } catch (err) {
                console.log('Erro ao filtrar itens:', err);
                await toast.dismiss();
            }
            await toast.dismiss();
        } else {
            this.findAllProducts();
        }

        await toast.dismiss();
    }


    async tirarFoco(event: any) {
        event.target.blur();
    }


    async filtrarItens(ev: any) {
        this.textoPesquisa = '';
        this.codigoDeBarras = 0;

        if (ev.target !== undefined) {
            this.textoDoFiltro = ev.target.value;
        } else {
            this.textoDoFiltro = ev;
        }
        const toast = await this.toastController.create({
            message: 'Filtrando...',
            duration: 3000,
            cssClass: 'toastCss',
        });
        await toast.present();

        if (this.textoDoFiltro.length >= 1) {
            try {
                if (this.produtos.length > 0) {
                    let listaProd = this.produtos;
                    this.produtos = [];
                    return listaProd.filter(async (item) => {
                        if (String(item.descricao).toLowerCase().includes(this.textoDoFiltro.toLowerCase()) || String(item.categoria).toLowerCase().includes(this.textoDoFiltro.toLowerCase())
                            || String(item.codigoDeBarras).toLowerCase().includes(this.textoDoFiltro.toLowerCase())) {
                            this.produtos.push(item);
                            return true;
                        }
                    });
                } else {
                    await toast.dismiss();
                }
            } catch (err) {
                console.log('Erro ao filtrar itens:', err);
                await toast.dismiss();
            }
            await toast.dismiss();
        } else {
            this.produtos = [];
            this.quantidade = 0;
            this.gastosComProdutos = 0;

            for (let produto of this.produtosAux) {
                if (produto.unidade === this.unidade) {
                    this.produtos.push(produto);
                    this.quantidade += 1;
                    this.gastosComProdutos += parseFloat((produto.valorDeCusto * produto.quantidade).toFixed(2));
                }
            }
        }
        await toast.dismiss();
    }

    public async getProductsCard() {
        this.firebaseService.findWhereProductTempUnidade(this.unidade).subscribe(data => {
            this.productsCard = [];
            if (data.length > 0) {
                for (let produto of data) {
                    this.productsCard.push(produto);
                }
            }
        })
    }

    public async getBarCode() {
        this.codigoDeBarras = '';

        Quagga.init({
            inputStream: {
                constraints: {
                    facingMode: 'environment' // restrict camera type
                },
                area: { // defines rectangle of the detection
                    top: '40%',    // top offset
                    right: '0%',  // right offset
                    left: '0%',   // left offset
                    bottom: '40%'  // bottom offset
                },
            },
            decoder: {
                readers: ['ean_reader'] // restrict code types
            },
        },
            async (err) => {
                if (err) {
                    window.alert(`C??digo de Barras Inv??lido: ${err}`);
                } else {
                    Quagga.start();
                    await Quagga.onDetected((res) => {
                        if (this.codigoDeBarras === '') {
                            this.codigoDeBarras = res.codeResult.code;
                        }
                    })

                    if (this.codigoDeBarras != '') {
                        this.textoPesquisa = this.codigoDeBarras;
                    }
                }
            });
    }
}

