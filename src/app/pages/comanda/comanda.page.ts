import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Config, IonRefresher, ModalController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { MapPage } from '../map/map';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserData } from '../../providers/user-data';
import { AlterarPrudutoComandaPage } from '../alterar-pruduto-comanda/alterar-pruduto-comanda.page';

@Component({
    selector: 'app-comanda',
    templateUrl: './comanda.page.html',
    styleUrls: ['./comanda.page.scss'],
})
export class ComandaPage implements OnInit {

    map: MapPage;

    selecionFormaPagamento: any = {
        header: 'Forma de Pagamento'
    };

    data: Date;
    dataVenda: any;
    vendedor: any;
    produto: any;
    categoria: any;
    quantidade: any;
    estoque: any;
    valorDeVenda: any;
    total: any;
    formaDePagamento: any;

    ios: boolean;
    submitted = false;
    descricao: any;

    quantidadeInserida = 1;
    quantidadeVendida = 0;
    estoqueFinal: any;
    produtosAuxListagem: any = [];
    produtos: any = [];
    produtosAux: any = [];
    produtosAtualiza: any = [];
    uids: any = [];
    infoProduto: any = [];
    formaDePagamentos: any = [];
    valorProdutos: any[];
    estoques: any[];
    valorProduto: any;

    totalComissao = 0.0;
    totalLiquido = 0.0;
    totalBruto = 0.0;
    totalDeCusto = 0.0;
    totalLucro = 0.0;
    totalGorjetas = 0.0;
    totalDescontos = 0.0;


    categoriaInfo: Date;
    descricaoInfo: any;
    quantidadeInfo: any;
    valorInfo: any;
    clientes: any[];
    cliente: any;
    unidade: any;
    fidelidade: any;

    produtosInseridos: any[];

    produtosTemp: any[];

    totalFidelidadeCliente: any;

    colaboradores: any = [];

    public static descricao: any;
    public static categoria: any;
    public static estoque: any;
    public static valor: any;
    public static cliente: any;
    public static vendaId: any;
    public static comandaNaoRegistrada: boolean = false;
    public static produtoAlterado: boolean = false;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        private infoLogin: UserData,
        public router: Router,
        public dadosRepositories: DadosRepositories,
        private modalCtrl: ModalController,
    ) { }

    ngOnInit() {
        this.dataVenda = new Date;
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.findAllProductTemp();
        this.findAllPaymentMethods();
        this.ios = this.config.get('mode') === 'ios';
    }

    public async findAllProductTemp() {
        await this.firebaseService.findWhereProductTemp(ComandaPage.cliente).subscribe(data => {
            let quantidadeDados = 1;
            let dados = 0;
            this.dataVenda = '';
            this.vendedor = '';
            this.quantidadeVendida = 0;
            this.fidelidade = 0;
            this.totalComissao = 0;
            this.totalLiquido = 0;
            this.totalBruto = 0;
            this.totalDeCusto = 0;
            this.totalLucro = 0;
            this.totalFidelidadeCliente = 0;
            this.totalGorjetas = 0;
            this.cliente = ComandaPage.cliente;
            this.produtos = [];
            this.produtosAuxListagem = [];

            let total: any = 0;
            dados = data.length;

            this.produtosAuxListagem = data;

            for (let produto of this.produtosAuxListagem) {
                this.produtos.push(produto);

                if (quantidadeDados <= dados) {

                    this.dataVenda = produto.dataVenda;
                    this.vendedor = produto.vendedor;
                    this.quantidadeVendida += parseInt(produto.quantidadeVendida);
                    this.fidelidade += produto.fidelidade;

                    if (produto.colaboradorPerfil === 'Colaborador')
                        this.totalComissao += produto.totalComissao;

                    this.totalBruto += produto.totalBruto;

                    if (produto.colaboradorPerfil === 'Colaborador')
                        this.totalLiquido += parseFloat(produto.totalLiquido);
                    else
                        this.totalLiquido += parseFloat(produto.totalBruto);


                    this.totalDeCusto += produto.totalDeCusto;
                    this.totalDescontos += parseFloat(produto.desconto);
                    this.totalFidelidadeCliente = parseInt(produto.clienteFidelidade);

                    if (produto.colaboradorPerfil === 'Colaborador')
                        this.totalGorjetas += parseFloat(produto.gorjeta);
                    else
                        this.totalLucro += parseFloat(produto.gorjeta);

                    if (produto.colaboradorPerfil === 'Colaborador') {
                        total = parseFloat(((this.totalBruto - this.totalComissao) - this.totalDeCusto).toFixed(2));
                        total = parseFloat((total - this.totalDescontos).toFixed(2));
                    } else {
                        total = parseFloat(((this.totalBruto - this.totalDeCusto) - this.totalDescontos).toFixed(2));
                    }
                    quantidadeDados += 1;
                }
                this.totalLucro = total;
            }
        });
    }

    public async findAllPaymentMethods() {
        await this.firebaseService.findAllPaymentMethods().subscribe(data => {
            this.formaDePagamentos = data;
        })
    }

    async registrarVenda() {
        try {
            if (this.formaDePagamento !== undefined && this.formaDePagamento !== null) {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Deseja Finalizar a Comanda <b>${this.cliente}</b>
                         <br>Quantidade: <b>${this.quantidadeVendida}</b>
                         <br>Total: <b>${this.totalBruto.toFixed(2)}</b></text>`,

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
                                this.cadastraVendaProduto();
                                this.cadastraVendaCliente();
                                this.deletaProdutosTemp();
                            }
                        }
                    ]
                });
                await alert.present();
            } else {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                     <text>Por favor Selecione uma Forma de Pagamento!</text>`,
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
                alert.present();
            }
        } catch (error) {
            console.log(error);
        }
    }
    async calculaTotal() {
    }

    async calculaTotalEven(ev?: any) {
        if (ev.currentTarget.id === 'inputQuantidade') {
            this.totalBruto = this.valorProduto * this.quantidadeInserida;
            this.estoqueFinal = this.estoque - this.quantidadeInserida;
        }
    }

    async setQuantidadeInserida(value) {
        this.quantidadeInserida = value;
    }

    public async cadastraVendaCliente() {
        let dadosVendaCliente =
            [{
                "vendaId": this.dataVenda,
                "dataVenda": this.dataVenda,
                "vendedor": this.vendedor,
                "unidade": this.unidade,
                "cliente": this.cliente,
                "formaDePagamento": this.formaDePagamento,
                "quantidadeVendida": this.quantidadeInserida,
                "totalComissao": this.totalComissao,
                "totalGorjetas": this.totalGorjetas,
                "totalDescontos": this.totalDescontos,
                "totalDeCusto": this.totalDeCusto,
                "totalLiquido": this.totalLiquido,
                "totalBruto": this.totalBruto,
                "totalLucro": this.totalLucro
            }];
        await this.firebaseService.registerSaleClientVenda(dadosVendaCliente[0]);
        await this.firebaseService.deleteSaleClientTemp(ComandaPage.vendaId);

        const alert = await this.alertController.create({
            message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
             <text>Venda Registrada com Sucesso!<br>Cliente: <b>${this.cliente}</b>
             <br><br>Quantidade Total Vendida: <b>${this.quantidadeVendida}</b>
             <br><br>Total da Venda: <b>${this.totalBruto.toFixed(2)}</b></text>`,
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
        this.modalCtrl.dismiss();
        alert.present();
    }

    private async cadastraVendaProduto() {
        this.dataVenda = new Date().toISOString().slice(0, 10);
        let dadosVendaProdutos;
        this.produtosAux = [];

        await this.firebaseService.findWhereProductTemp(ComandaPage.cliente).subscribe(async data => {
            this.produtosAux = data;
            this.cliente = ComandaPage.cliente;

            for (let produto of this.produtosAux) {
                dadosVendaProdutos = [];
                dadosVendaProdutos =
                    [{
                        "produtoDoc": 'indefinido',
                        "dataVenda": this.dataVenda,
                        "vendedor": produto.vendedor,
                        "unidade": this.unidade,
                        "clienteId": produto.clienteId,
                        "cliente": this.cliente,
                        "formaDePagamento": this.formaDePagamento,
                        "produtoId": produto.produtoId,
                        "produto": produto.produto,
                        "imagem": produto.imagem,
                        "categoria": produto.categoria,
                        "fidelidade": produto.fidelidade,
                        "comissao": produto.comissao,
                        "gorjeta": produto.gorjeta,
                        "desconto": produto.desconto,
                        "quantidadeVendida": produto.quantidadeVendida,
                        "estoque": produto.estoque,
                        "estoqueFinal": produto.estoqueFinal,
                        "valorDeCusto": produto.totalDeCusto,
                        "valorDeVenda": produto.valorDeVenda,
                        "totalComissao": this.totalComissao,
                        "totalLiquido": this.totalLiquido,
                        "totalBruto": this.totalBruto,
                        "totalLucro": this.totalLucro
                    }];

                await this.firebaseService.registerProductVenda(dadosVendaProdutos[0]);

                let dadosUpdateProdutos =
                    [{
                        "categoria": produto.categoria,
                        "comissao": produto.comissao,
                        "descricao": produto.produto,
                        "fidelidade": produto.fidelidade,
                        "quantidade": produto.estoqueFinal,
                        "unidade": produto.unidade,
                        "valorDeCusto": produto.totalDeCusto,
                        "valorDeVenda": produto.valorDeVenda
                    }];
                await this.firebaseService.updateProducts(produto.produtoId, dadosUpdateProdutos[0]);
            }
        });
    }

    public async deletaProdutosTemp() {
        await this.firebaseService.findWhereProductTemp(ComandaPage.cliente).subscribe(data => {
            this.produtosTemp = data;
            for (let produto of this.produtosTemp) {
                this.firebaseService.deleteProductTemp(produto.documento);
            }
        });
    }

    async sair() {
        this.modalCtrl.dismiss();
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

                            this.firebaseService.deleteProductTemp(produtoId);
                            this.quantidadeVendida = this.quantidadeVendida - 1;

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
                            await alert.present();

                            if (this.quantidadeVendida <= 0) {
                                this.firebaseService.deleteSaleClientTemp(ComandaPage.vendaId);
                                this.modalCtrl.dismiss();
                            }
                        }
                    }
                ]
            });
            await alert.present();

        } catch (error) {
            console.log(error);
        }
    }

    async atualizarProduto(documento: any, dataVenda: any, vendedor: any, unidade: any, clienteId: any, cliente: any, clienteFidelidade: any, produtoId: any, produto: any, imagem: any, categoria: any, quantidadeVendida: any, fidelidade: any, comissao: any, gorjeta: any, desconto: any, estoque: any, estoqueFinal, valorDeVenda: any, valorDeCusto: any, totalComissao: any, totalDeCusto: any, totalBruto: any, totalLiquido: any, totalLucro: any) {

        try {

            ComandaPage.produtoAlterado = false;
            AlterarPrudutoComandaPage.produtoIdVendaAtual = documento;
            AlterarPrudutoComandaPage.dataVendaAtual = dataVenda;
            AlterarPrudutoComandaPage.vendedorAtual = vendedor;
            AlterarPrudutoComandaPage.unidadeAtual = unidade;
            AlterarPrudutoComandaPage.clienteIdAtual = clienteId;
            AlterarPrudutoComandaPage.clienteAtual = cliente;
            AlterarPrudutoComandaPage.clienteFidelidadeAtual = clienteFidelidade;
            AlterarPrudutoComandaPage.produtoIdAtual = documento;
            AlterarPrudutoComandaPage.produtoAtual = produto;
            AlterarPrudutoComandaPage.imagemAtual = imagem;
            AlterarPrudutoComandaPage.categoriaAtual = categoria;
            AlterarPrudutoComandaPage.quantidadeInseridaAtual = quantidadeVendida;
            AlterarPrudutoComandaPage.fidelidadeAtual = fidelidade;
            AlterarPrudutoComandaPage.comissaoAtual = comissao;
            AlterarPrudutoComandaPage.gorjetaAtual = gorjeta;
            AlterarPrudutoComandaPage.descontoAtual = desconto;
            AlterarPrudutoComandaPage.estoqueAtual = estoque;
            AlterarPrudutoComandaPage.estoqueFinalAtual = estoqueFinal;
            AlterarPrudutoComandaPage.valorDeVendaAtual = valorDeVenda;
            AlterarPrudutoComandaPage.valorDeCustoAtual = valorDeCusto;
            AlterarPrudutoComandaPage.totalComissaoAtual = totalComissao;
            AlterarPrudutoComandaPage.totalDeCustoAtual = totalDeCusto;
            AlterarPrudutoComandaPage.totalBrutoAtual = totalBruto;
            AlterarPrudutoComandaPage.totalLiquidoAtual = totalLiquido;
            AlterarPrudutoComandaPage.totalLucroAtual = totalLucro;
            const modal = await this.modalCtrl.create({
                component: AlterarPrudutoComandaPage,
            });
            await modal.present();

            // await modal.onDidDismiss().then(async data => {
            //     console.log('aquiii');
            //     this.ngOnInit();

            // });

        } catch (error) {
            console.log(error);
        }
    }
}
