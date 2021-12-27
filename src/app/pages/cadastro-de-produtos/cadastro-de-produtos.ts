import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, Config, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { AlterarClientePage } from '../alterar-cliente/alterar-cliente.page';
import { CarrinhoPage } from '../carrinho/carrinho.page';


@Component({
    selector: 'page-cadastro-de-produtos',
    templateUrl: 'cadastro-de-produtos.html',
    styleUrls: ['./cadastro-de-produtos.scss'],
})
export class SpeakerListPage implements OnInit {


    ios: boolean;
    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;
    showSearchbar: boolean;
    clientesAux: any = [];
    clientes: any = [];
    itens: any = [];
    clientsData: any = [];

    perfil: any;
    unidade: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;

    totalClientes: number = 0;

    constructor(public config: Config,
        public faribaseService: FirebaseService,
        public loadingController: LoadingController,
        public router: Router,
        public dadosRepositories: DadosRepositories,
        public loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public user: DadosRepositories,
        public angularFire: AngularFireAuth,
        private alertController: AlertController,
        private firebaseService: FirebaseService,
    ) { }

    ngOnInit() {
        this.getDadosUsuario();
        this.carregaClientes();
        this.ios = this.config.get('mode') === 'ios';
    }

    async carregaClientes() {

        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Carregando Clientes...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();

        this.faribaseService.listaClientes().subscribe(data => {
            this.clientes = [];
            this.totalClientes = 0;
            if (this.clientes.length === 0) {
                data.forEach(row => {
                    this.clientesAux = [];

                    let line = Object(row.payload.doc.data());
                    line.doc = String(row.payload.doc.id);

                    this.clientesAux.push(line);

                    for (let cliente of this.clientesAux) {
                        if (cliente.unidade === this.unidade && cliente.perfil === 'Cliente' && cliente.status === 'ativo') {
                            this.clientes.push(cliente);
                            this.totalClientes += 1;
                        }
                    }
                });
            }
            loading.dismiss();
        })

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

    async atualizarCliente(usuarioId: any, administrador: any, unidade: any, perfil: any, sexo: any, nome: any, numero: any, email: any, senha: any, whatsapp: any) {

        try {

            AlterarClientePage.usuarioIdAtual = usuarioId;
            AlterarClientePage.administradorAatual = administrador;
            AlterarClientePage.unidadeAtual = unidade;
            AlterarClientePage.perfilAtual = perfil;
            AlterarClientePage.sexoAtual = sexo;
            AlterarClientePage.nomeAtual = nome;
            AlterarClientePage.numeroAtual = numero;
            AlterarClientePage.emailAtual = email;
            AlterarClientePage.senhaAtual = senha;
            AlterarClientePage.whatsappAtual = whatsapp;

            const modal = await this.modalCtrl.create({
                component: AlterarClientePage,
            });
            await modal.present();

            await modal.onDidDismiss().then(async data => {
                this.carregaClientes();
            });

        } catch (error) {
            console.log(error);
        }
    }
    async excluirCliente(clienteId: any, cliente: any) {

        try {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Deseja Excluir o Cliente:<br><b>${cliente}</b></text>`,

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

                            let dados =
                                [{
                                    "status": 'inativo',

                                }];

                            this.firebaseService.atualizaUsuario(clienteId, dados[0]);

                            const alert = await this.alertController.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                 <text>Cliente Excluído Com Sucesso!</text>`,
                                backdropDismiss: false,
                                header: "Atenção",
                                cssClass: "alertaCss",
                                buttons: [
                                    {
                                        text: "Ok",
                                        role: "Cancelar",
                                        cssClass: "secondary",

                                        handler: () => {
                                            this.carregaClientes();
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
}

