import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ClienteVendaProdutosComponentComponent } from '../../components/cliente-venda-produtos-component/cliente-venda-produtos-component.component';
import { FiltroVendasComponent } from '../../components/filtro-vendas/filtro-vendas.component';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-vendas',
    templateUrl: './vendas.page.html',
    styleUrls: ['./vendas.page.scss'],
})
export class VendasPage implements OnInit {

    vendas: any = [];
    vendasAux: any = [];

    textoDoFiltro = '';
    date = new Date(); // Define o dia atual sem formatar
    startDate = 'YYYY-MM-DD'; // new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString().slice(0, 10); // Define o Primeiro dia do Mês
    endDate = 'YYYY-MM-DD';

    quantidadeCarrinho = 0;
    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;
    showSearchbar: boolean;

    ios: boolean;

    perfil: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;
    unidade: any;

    quantidadeVendida: any = 0.0;
    totalVendido: any = 0.0;

    totalFidelidade = 0.0;
    totalComissao = 0.0;
    totalGorjetas = 0.0;
    totalVales = 0.0;
    totalLiquido = 0.0;
    totalBruto = 0.0;
    totalCustos = 0.0;
    totalLucro = 0.0;

    categoriaInfo: Date;
    descricaoInfo: any;
    quantidadeInfo: any;
    valorInfo: any;
    clientes: any[];
    cliente: any;
    fidelidade = 0.0;

    gastos: any = [];
    gastosAux: any;
    totalDeGastos: any = 0.0;

    vales: any = [];
    valesAux: any;

    produtos: any = [];
    produtosAux: any = [];

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

    cartaoFidelidade = false;
    cartaoCredito = false;
    cartaoDebito = false;
    dinheiro = false;
    pix24Hr = false;

    ordemEscolhida = '';
    filtroDefinido = [];
    offset = 0;
    tipoOrdenado = '';
    comFiltroSql: string;
    searchLike = true;

    formaDePagamento: any;


    constructor(
        private firebaseService: FirebaseService,
        public router: Router,
        public loadingController: LoadingController,
        private dadosRepositories: DadosRepositories,
        private popoverController: PopoverController,
        private modalCtrl: ModalController,
        private alertController: AlertController,) { }

    ngOnInit() {
        this.formaDePagamento = null;
        this.getDadosUsuario();
        this.focandoData();
        this.buscaVendasPorData(null);
    }

    async focandoData() {
        this.startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString().slice(0, 10); // Define o primeiro dia do mês
        this.endDate = new Date().toISOString().slice(0, 10); // Define o dia atual
    }

    async buscaVendasPorData(formaDePagamento) {
        if (this.startDate > this.endDate || this.startDate === '' || this.endDate === '') {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                <text>A data inicial não pode ser maior que a data final, ou ficar em branco!</text>`,
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

            alert.present();
        } else {
            const loading = await this.loadingController.create({
                message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Carregando Vendas...',
                spinner: null,
                cssClass: 'loadingCss',
            });
            await loading.present();
            try {

                if (formaDePagamento != undefined && formaDePagamento != null) {
                    this.totalBruto = 0;
                    this.totalLucro = 0;
                    this.totalComissao = 0;
                    this.vendas = [];
                    this.vendasAux = [];

                    this.firebaseService.findAllProductVendaRelatorio(this.startDate, this.endDate).subscribe(data => {

                        this.vendasAux = data;

                        for (let venda of this.vendasAux) {
                            if (venda.unidade === this.unidade && venda.formaDePagamento.trim() === formaDePagamento.trim()) {
                                this.totalBruto += venda.totalBruto;
                                this.totalLucro += venda.totalLucro;
                                this.totalComissao += venda.totalComissao;
                                this.vendas.push(venda);
                            }
                        }
                    });
                    loading.dismiss();
                } else {

                    this.totalBruto = 0;
                    this.totalLucro = 0;
                    this.totalComissao = 0;
                    this.vendas = [];
                    this.vendasAux = [];

                    this.firebaseService.findAllProductVendaRelatorio(this.startDate, this.endDate).subscribe(data => {

                        this.vendasAux = data;

                        for (let venda of this.vendasAux) {
                            if (venda.unidade === this.unidade) {
                                this.totalBruto += venda.totalBruto;
                                this.totalLucro += venda.totalLucro;
                                this.totalComissao += venda.totalComissao;
                                this.vendas.push(venda);
                            }
                        }
                    });
                    loading.dismiss();
                }
            } catch (error) {
                console.log('Não foi possivel carregar as vendas por data:', error);
                await loading.dismiss();
            }
        }
    }

    public async getDadosUsuario() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }

    async excluirVenda(cliente: any, dataVenda: any, formaDePagamento: any, permiteExclusao: boolean = false, vendaId) {
        try {
            if (permiteExclusao) {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Deseja Excluir a venda do dia:<br><b>${dataVenda}</b></text>`,

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
                                this.produtos = [];

                                this.firebaseService.deleteSaleClient(vendaId);
                                this.firebaseService.findWhereSaleClientVenda(cliente, dataVenda, formaDePagamento).subscribe(async data => {
                                    if (permiteExclusao) {
                                        this.produtosAux = [];
                                        this.produtosAux = data;

                                        for (let produto of this.produtosAux) {
                                            if (produto.unidade === this.unidade) {
                                                console.log('aquiiii');
                                                console.log(produto);
                                                this.firebaseService.deletaVendaProdutos(produto.doc);
                                            }
                                        }
                                    }
                                });

                                if (permiteExclusao) {
                                    const alert = await this.alertController.create({
                                        message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                 <text>Venda excluída com sucesso!</text>`,
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
                                    permiteExclusao = false;
                                }
                            }
                        }
                    ]
                });
                await alert.present();

            }

        } catch (error) {
            console.log(error);
        }
    }

    async findAllProduct(cliente: any, dataVenda: any, formaDePagamento: any) {
        let popover: HTMLIonPopoverElement;
        let produtosArray: any = [];
        let dados = [];
        this.produtos = [];
        this.produtosAux = [];

        this.firebaseService.findAWhereProductVenda(cliente, dataVenda, formaDePagamento).subscribe(data => {

            this.produtosAux = data;

            for (let produto of this.produtosAux) {
                if (produto.unidade === this.unidade) {
                    dados[0] = produto.unidade;
                    dados[1] = produto.categoria;
                    dados[2] = produto.produto;
                    dados[3] = produto.cliente;
                    dados[4] = produto.totalBruto;
                    dados[5] = produto.totalLiquido;
                    dados[6] = produto.estoqueFinal;
                    dados[7] = produto.totalComissao;
                    dados[8] = produto.quantidadeVendida;
                    dados[9] = produto.dataVenda;
                    dados[10] = produto.totalLucro;
                    produtosArray.push(dados);
                }
            }
        });

        ClienteVendaProdutosComponentComponent.produtos = produtosArray;
        popover = await this.popoverController.create({
            component: ClienteVendaProdutosComponentComponent,
            translucent: true,
            cssClass: 'cssPopover',
            componentProps: {
                produtos: produtosArray,
            }
        });

        await popover.present();

        await popover.onDidDismiss().then(async data => {
            if (data.data !== undefined) {
                this.cliente = data.data[2];
            }
        });
    }

    /**
    * Abrindo buscas e retornando filtros
    * @param ev
    */
    async touchAbreFiltroVendas(ev?: any) {
        const popover = await this.popoverController.create({
            component: FiltroVendasComponent,
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
                    this.cartaoFidelidade = data.data.cartaoFidelidade;
                    this.cartaoCredito = data.data.cartaoCredito;
                    this.cartaoDebito = data.data.cartaoDebito;
                    this.dinheiro = data.data.dinheiro;
                    this.pix24Hr = data.data.pix24Hr;

                    if (this.cartaoFidelidade || this.cartaoCredito || this.cartaoDebito || this.dinheiro || this.pix24Hr) {

                        if (this.cartaoFidelidade) {
                            this.buscaVendasPorData('Cartão Fidelidade');
                        } else if (this.cartaoCredito) {
                            this.buscaVendasPorData('Cartão de Crédito');
                        } else if (this.cartaoDebito) {
                            this.buscaVendasPorData('Cartão de Débito');
                        } else if (this.dinheiro) {
                            this.buscaVendasPorData('Dinheiro');
                        } else if (this.pix24Hr) {
                            this.buscaVendasPorData('Pix 24Hr');
                        }
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

            } else if (tipoOrdenacao.trim() === 'Cartão Fidelidade') {
                temp.sort((a, b) => {
                    return a.formaDePagamento.trim() === 'Cartão Fidelidade' ? -1 : 1

                })

            } else if (tipoOrdenacao.trim() === 'Cartão de Crédito') {
                temp.sort((a, b) => {
                    return a.formaDePagamento.trim() === 'Cartão de Crédito' ? -1 : 1

                })

            } else if (tipoOrdenacao.trim() === 'Cartão de Débito') {
                temp.sort((a, b) => {
                    return a.formaDePagamento.trim() === 'Cartão de Débito' ? -1 : 1

                })

            } else if (tipoOrdenacao.trim() === 'Dinheiro') {
                temp.sort((a, b) => {
                    return a.formaDePagamento.trim() === 'Dinheiro' ? -1 : 1

                })

            } else if (tipoOrdenacao.trim() === 'Pix 24Hr') {
                temp.sort((a, b) => {
                    return a.formaDePagamento.trim() === 'Pix 24Hr' ? -1 : 1
                })
            }

            return temp;

        } catch (error) {
            console.log('Erro na ordenação!:', error);
            return listaParaOrdenar;
        }

    }

}
