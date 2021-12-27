import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Config, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserData } from '../../providers/user-data';
import { InserirProdutoCarrinhoPage } from '../inserir-produto-carrinho/inserir-produto-carrinho.page';
import { MapPage } from '../map/map';
import { TabsPage } from '../tabs-page/tabs-page';

@Component({
    selector: 'app-carrinho',
    templateUrl: './carrinho.page.html',
    styleUrls: ['./carrinho.page.scss'],
})

export class CarrinhoPage implements OnInit {

    map: MapPage;

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
    totalDaVenda = 0.0;
    estoqueFinal: any;

    produtos: any = [];
    infoProduto: any = [];
    formaDePagamentos: any = [];
    valorProdutos: any[];
    estoques: any[];
    valorProduto: any;


    categoriaInfo: Date;
    descricaoInfo: any;
    quantidadeInfo: any;
    valorInfo: any;
    clientes: any[];
    cliente: any;
    unidade: any;

    public static descricao: any;
    public static categoria: any;
    public static estoque: any;
    public static valor: any;
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
        // this.carregaCategorias();
        this.dataVenda = new Date;

        this.carregaInfoProduto();
        this.carregaClientes();
        this.vendedor = this.dadosRepositories.getLocalStorage('nome');
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');

        this.ios = this.config.get('mode') === 'ios';
    }

    public carregaInfoProduto() {

        this.firebaseService.carregaInfoProduto(InserirProdutoCarrinhoPage.descricao).subscribe(data => {
            // console.log(data)
            this.produtos = data;

            this.valorProduto = this.produtos[0].valor;
            this.estoque = this.produtos[0].quantidade;
            this.estoqueFinal = this.produtos[0].quantidade;

            this.categoria = this.produtos[0].categoria;
            this.descricao = this.produtos[0].descricao;

            this.calculaTotal();
        })

    }

    carregaClientes() {

        this.firebaseService.listaClientes().subscribe(dados => {
            console.log(dados)

            this.clientes = dados;
        })

    }

    async carregaFormasDePagamento() {

        this.firebaseService.carregaFormasDePagamento().subscribe(data => {
            console.log(data)

            this.formaDePagamentos = data;
        })

    }

    async inserirProdutoCarrinho() {

        if (this.quantidadeInserida > 0) {
            if (this.cliente === undefined || this.cliente === null) {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                         <text>Selecione um Cliente!</text>`,
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

            try {

                this.dataVenda = new Date().toISOString().slice(0, 10);

                let dados =
                    [{
                        "dataVenda": this.dataVenda,
                        "vendedor": this.vendedor,
                        "unidade": this.unidade,
                        "cliente": this.cliente,
                        "produto": InserirProdutoCarrinhoPage.descricao,
                        "categoria": InserirProdutoCarrinhoPage.categoria,
                        "quantidadeVendida": this.quantidadeInserida,
                        "estoque": InserirProdutoCarrinhoPage.estoque,
                        "estoqueFinal": this.estoqueFinal,
                        "valorDeVenda": InserirProdutoCarrinhoPage.valorDeVenda,
                        "total": this.totalDaVenda
                    }];

                this.firebaseService.cadastraVendasProdutosTemp(dados[0]);

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Produto Inserido No Carrinho!</text>`,
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
                this.modalCtrl.dismiss();

            } catch (error) {
                console.log(error);
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
    }
    async calculaTotal() {
        this.totalDaVenda = this.valorProduto * this.quantidadeInserida;
        this.estoqueFinal = this.estoque - this.quantidadeInserida;
    }

    async calculaTotalEven(ev?: any) {
        if (ev.currentTarget.id === 'inputQuantidade') {
            this.totalDaVenda = this.valorProduto * this.quantidadeInserida;
            this.estoqueFinal = this.estoque - this.quantidadeInserida;
        }
    }

    async setQuantidadeInserida(value) {
        this.quantidadeInserida = value;
    }
}