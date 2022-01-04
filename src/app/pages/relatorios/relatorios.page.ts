import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Config, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ComandaPage } from '../comanda/comanda.page';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserData } from '../../providers/user-data';

@Component({
    selector: 'app-relatorios',
    templateUrl: './relatorios.page.html',
    styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage implements OnInit {



    dataVenda: Date;
    vendedor: any;
    unidade: any;
    produto: any;
    categoria: any;
    quantidade: any;
    valorDeVenda: any;
    formaPagamento: any;

    ios: boolean;
    submitted = false;
    descricao: any;

    vendas: any = [];
    vendaProdutosTemp: any = [];
    vendasAux: any = [];
    dataAux: any = [];
    formaDePagamentos: any = [];
    valorProdutos: any[];
    valorProduto: any;

    perfil: any;

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

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private infoLogin: UserData,
        public router: Router,
        public loadingController: LoadingController,
        private dadosRepositories: DadosRepositories,
        private alertController: AlertController,
        private popoverController: PopoverController,
        private modalCtrl: ModalController,
    ) { }

    ngOnInit() {
        this.vendedor = this.infoLogin.getUsername;
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.dataVenda = new Date;
        this.carregaVendasTemp();
        this.getPerfilUsuario();
        this.ios = this.config.get('mode') === 'ios';
    }

    // Abrindo buscas e retornando filtros
    async touchOpcoesFiltro(ev: any) {
    }

    async carregaVendasTemp() {
        this.vendas = [];
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Carregando Comandas...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();

        this.firebaseService.findAllSaleClientTemp(this.unidade).subscribe(data => {
            this.vendas = data;
        });
        loading.dismiss();
    }

    async carregaFormasDePagamento() {

        this.firebaseService.carregaFormasDePagamento().subscribe(data => {
            console.log(data)

            this.formaDePagamentos = data;
        })

    }

    async carregaValorDoProduto() {
        console.log(this.produto)
        this.firebaseService.carregaValorDoProduto(this.produto).subscribe(data => {
            console.log(data)

            this.valorProdutos = data;
            this.valorProduto = this.valorProdutos[3];
        })

    }

    async abrirComanda(vendaId: any, cliente: any) {
        ComandaPage.vendaId = vendaId;
        ComandaPage.cliente = cliente;
        ComandaPage.comandaNaoRegistrada = true;
        const modal = await this.modalCtrl.create({
            component: ComandaPage,
        });
        await modal.present();
    }

    getPerfilUsuario() {
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
    }

    async excluirComanda(vendaId: any, cliente: any, permiteExclusao: boolean = false) {

        try {

            if (permiteExclusao) {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Deseja Excluir a Comanda do Cliente:<br><b>${cliente}</b></text>`,

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
                                this.firebaseService.deletaVendaClienteTemp(vendaId);
                                this.firebaseService.carregaVendasProdutosTempDoc(cliente).subscribe(data => {

                                    data.forEach(async row => {
                                        if (permiteExclusao) {
                                            this.vendaProdutosTemp = [];
                                            let line = Object(row.payload.doc.data());
                                            line.doc = String(row.payload.doc.id);

                                            this.vendaProdutosTemp.push(line);

                                            for (let produto of this.vendaProdutosTemp) {
                                                this.firebaseService.deletaVendaProdutoTemp(produto.doc);
                                            }
                                        }
                                    });
                                });

                                if (permiteExclusao) {
                                    const alert = await this.alertController.create({
                                        message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                 <text>Comanda Excluída Com Sucesso!</text>`,
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

}

