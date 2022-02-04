import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Config, ModalController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserData } from '../../providers/user-data';
import { MapPage } from '../map/map';

@Component({
    selector: 'app-alterar-pruduto-comanda',
    templateUrl: './alterar-pruduto-comanda.page.html',
    styleUrls: ['./alterar-pruduto-comanda.page.scss'],
})
export class AlterarPrudutoComandaPage implements OnInit {

    map: MapPage;

    selecioneUmCliente: any = {
        header: 'Selecione um Cliente'
    };

    sliderOpts = {
        zoom: true,
        // slidesPerView: 1.5,
        // centeredSlides: true
    };

    data: Date;
    dataVenda: any;
    vendedor: any;
    produto: any;
    imagem: any;
    categoria: any;
    quantidade: any;
    estoque: any;
    valorDeVenda: any;
    total: any;
    formaDePagamento: any;

    ios: boolean;
    submitted = false;
    descricao: any;

    fidelidade: any;
    comissao: any;

    totalComissao = 0.0;
    totalLiquido = 0.0;
    totalBruto = 0.0;
    totalDeCusto: any;
    valorDeCusto = 0.0;
    totalLucro = 0.0;

    quantidadeInserida = 1;
    estoqueFinal: any;

    produtos: any = [];
    infoProduto: any = [];
    formaDePagamentos: any = [];
    valorProdutos: any[];
    estoques: any[];
    valorProduto: any;

    gorjeta: any;
    desconto: any;


    categoriaInfo: Date;
    descricaoInfo: any;
    quantidadeInfo: any;
    valorInfo: any;
    clientes: any[];
    clientesAux: any[];
    clientesCarrinho: any[];
    clienteValido: boolean = true;
    cliente: any;
    unidade: any;
    produtoUid: any;
    clienteId: any;
    clienteFidelidade;

    produtoId: any;
    produtoIdVenda: any;

    public static produtoIdVendaAtual: any;
    public static dataVendaAtual: any;
    public static vendedorAtual: any;
    public static unidadeAtual: any;
    public static clienteIdAtual: any;
    public static clienteAtual: any;
    public static clienteFidelidadeAtual: any;
    public static produtoIdAtual: any;
    public static produtoAtual: any;
    public static imagemAtual: any;
    public static categoriaAtual: any;
    public static quantidadeInseridaAtual: any;
    public static fidelidadeAtual: any;
    public static comissaoAtual: any;
    public static gorjetaAtual: any;
    public static descontoAtual: any;
    public static estoqueAtual: any;
    public static estoqueFinalAtual: any;
    public static valorDeVendaAtual: any;
    public static valorDeCustoAtual: any;
    public static totalComissaoAtual: any;
    public static totalDeCustoAtual: any;
    public static totalBrutoAtual: any;
    public static totalLiquidoAtual: any;
    public static totalLucroAtual: any;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        public router: Router,
        public dadosRepositories: DadosRepositories,
        private modalCtrl: ModalController,
    ) { }

    ngOnInit() {
        this.produtoIdVenda = AlterarPrudutoComandaPage.produtoIdVendaAtual;
        this.dataVenda = AlterarPrudutoComandaPage.dataVendaAtual;
        this.vendedor = AlterarPrudutoComandaPage.vendedorAtual;
        this.unidade = AlterarPrudutoComandaPage.unidadeAtual;
        this.clienteId = AlterarPrudutoComandaPage.clienteIdAtual;
        this.cliente = AlterarPrudutoComandaPage.clienteAtual;
        this.clienteFidelidade = AlterarPrudutoComandaPage.clienteFidelidadeAtual;
        this.produtoId = AlterarPrudutoComandaPage.produtoIdAtual;
        this.produto = AlterarPrudutoComandaPage.produtoAtual;
        this.imagem = AlterarPrudutoComandaPage.imagemAtual;
        this.categoria = AlterarPrudutoComandaPage.categoriaAtual;
        this.quantidadeInserida = AlterarPrudutoComandaPage.quantidadeInseridaAtual;
        this.fidelidade = AlterarPrudutoComandaPage.fidelidadeAtual;
        this.comissao = AlterarPrudutoComandaPage.comissaoAtual;
        this.gorjeta = AlterarPrudutoComandaPage.gorjetaAtual;
        this.desconto = AlterarPrudutoComandaPage.descontoAtual;
        this.estoque = AlterarPrudutoComandaPage.estoqueAtual;
        this.estoqueFinal = AlterarPrudutoComandaPage.estoqueFinalAtual;
        this.valorDeVenda = AlterarPrudutoComandaPage.valorDeVendaAtual;
        this.valorDeCusto = AlterarPrudutoComandaPage.valorDeCustoAtual;
        this.totalComissao = AlterarPrudutoComandaPage.totalComissaoAtual;
        this.totalDeCusto = AlterarPrudutoComandaPage.totalDeCustoAtual;
        this.totalBruto = AlterarPrudutoComandaPage.totalBrutoAtual;
        this.totalLiquido = AlterarPrudutoComandaPage.totalLiquidoAtual;
        this.totalLucro = AlterarPrudutoComandaPage.totalLucroAtual;
        this.ios = this.config.get('mode') === 'ios';
    }

    async insereDadosTemp(produto: any, clienteId: any, fidelidade: any) {
        const alert = await this.alertController.create({
            message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                 <text>Deseja Alterar Esse Produto:<br><b>${produto}</b></text>`,

            backdropDismiss: false,
            header: "Atenção",
            cssClass: "alertaCss",

            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    cssClass: 'cancelcancelarButton',
                    handler: async () => {
                    }
                },
                {
                    text: 'Sim',
                    cssClass: 'okButton',
                    handler: async () => {
                        if (this.quantidadeInserida > 0) {
                            if (this.estoqueFinal >= 0) {
                                this.atualizaProduto(clienteId, fidelidade);
                            } else {
                                const alert = await this.alertController.create({
                                    message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                                                 <text>Produto sem estoque disponível!</text>`,
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
                        } else {
                            const alert = await this.alertController.create({
                                message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                                     <text>Quantidade tem que ser maior que 0!</text>`,
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
                        return;
                    }
                }
            ]
        });
        await alert.present();
    }

    async calculaTotalEven(ev?: any) {
        if (ev.currentTarget.id === 'inputQuantidade' || ev.currentTarget.id === 'inputDesconto') {
            this.totalBruto = parseFloat(((AlterarPrudutoComandaPage.valorDeVendaAtual * this.quantidadeInserida) - this.desconto).toFixed(2));

            if (this.categoria != 'Serviços')
                this.estoqueFinal = AlterarPrudutoComandaPage.estoqueAtual - this.quantidadeInserida;

            this.totalComissao = parseFloat(((AlterarPrudutoComandaPage.comissaoAtual * this.totalBruto) / 100).toFixed(2));
            this.totalLiquido = parseFloat((this.totalBruto - this.totalComissao).toFixed(2));

            this.totalDeCusto = parseFloat(((this.valorDeCusto * this.quantidadeInserida).toFixed(2)));
            this.totalLucro = parseFloat(((this.totalBruto - this.totalComissao) - this.totalDeCusto).toFixed(2));
        }
    }

    async setDescontoInserido(value) {
        this.desconto = value;
    }


    async calculaGorjeta(ev?: any) {
        if (this.gorjeta === '') {
            this.totalComissao = AlterarPrudutoComandaPage.totalComissaoAtual
        } else {
            this.totalComissao = parseFloat(((AlterarPrudutoComandaPage.comissaoAtual * this.totalBruto) / 100).toFixed(2));
            this.totalComissao = parseFloat((this.totalComissao + parseFloat(this.gorjeta)).toFixed(2));
        }

    }

    async setQuantidadeInserida(value) {
        this.quantidadeInserida = value;
    }

    async setGorjetaInserida(value) {
        this.gorjeta = value;
    }

    async atualizaProduto(clienteId: any, fidelidade: any) {
        try {

            let dadosProdutos =
                [{
                    "dataVenda": this.dataVenda,
                    "vendedor": this.vendedor,
                    "unidade": this.unidade,
                    "clienteId": clienteId,
                    "cliente": this.cliente,
                    "clienteFidelidade": fidelidade,
                    "produtoId": this.produtoId,
                    "produto": this.produto,
                    "imagem": this.imagem,
                    "categoria": this.categoria,
                    "quantidadeVendida": this.quantidadeInserida,
                    "fidelidade": this.fidelidade,
                    "comissao": this.comissao,
                    "gorjeta": this.gorjeta,
                    "desconto": this.desconto,
                    "estoque": this.estoque,
                    "estoqueFinal": this.estoqueFinal,
                    "valorDeVenda": this.valorDeVenda,
                    "valorDeCusto": this.valorDeCusto,
                    "totalComissao": this.totalComissao,
                    "totalDeCusto": this.totalDeCusto,
                    "totalBruto": this.totalBruto,
                    "totalLiquido": this.totalLiquido,
                    "totalLucro": this.totalLucro
                }];
            this.firebaseService.updateProductTemp(AlterarPrudutoComandaPage.produtoIdVendaAtual, dadosProdutos[0]);
            this.modalCtrl.dismiss();

            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
         <text>Produto Atualizado No Carrinho!</text>`,
                backdropDismiss: false,
                header: "Atenção",
                cssClass: "alertaCss",
                buttons: [
                    {
                        text: "Ok",
                        cssClass: "secondary",

                        handler: () => {
                        },
                    },
                ],
            });
            await alert.present();
        } catch (error) {
            console.log(error);
        }
    }

    async sair() {
        this.modalCtrl.dismiss();
    }
}