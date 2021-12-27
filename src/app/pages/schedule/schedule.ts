import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { DadosRepositories } from '../../providers/dados-repositories';
import { FirebaseService } from '../../firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlterarColaboradorPage } from '../alterar-colaborador/alterar-colaborador.page';

@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html',
    styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
    // Gets a reference to the list element
    @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

    ios: boolean;
    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;
    showSearchbar: boolean;

    barbeiros: any = [];
    barbeirosAux: any = [];
    itens: any = [];
    clientsData: any = [];

    error: any;

    perfil: any;
    unidade: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;

    totalColaboradores: number = 0;

    constructor(
        public alertCtrl: AlertController,
        public confData: ConferenceData,
        public loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public router: Router,
        public routerOutlet: IonRouterOutlet,
        public toastCtrl: ToastController,
        public user: DadosRepositories,
        public config: Config,
        public faribaseService: FirebaseService,
        public angularFire: AngularFireAuth,
        public loadingController: LoadingController,
        public dadosRepositories: DadosRepositories,
        private alertController: AlertController,
        private firebaseService: FirebaseService,

    ) { }

    ngOnInit() {
        this.carregaBarbeiros();
        this.getDadosUsuario();
        this.ios = this.config.get('mode') === 'ios';
    }

    async carregaBarbeiros() {
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Carregando Barbeiros...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();

        // Close any open sliding items when the schedule updates
        if (this.scheduleList) {
            this.scheduleList.closeSlidingItems();
        }

        this.faribaseService.listaColaboradores(this.unidade).subscribe(data => {
            this.barbeiros = [];
            this.totalColaboradores = 0;
            if (this.barbeiros.length === 0) {
                data.forEach(row => {
                    this.barbeirosAux = [];
                    let line = Object(row.payload.doc.data());
                    line.doc = String(row.payload.doc.id);

                    this.barbeirosAux.push(line);
                    for (let barbeiro of this.barbeirosAux) {
                        if (barbeiro.perfil === 'Colaborador' || barbeiro.perfil === 'Balcão' && barbeiro.status === 'ativo') {
                            this.barbeiros.push(barbeiro);
                            this.totalColaboradores += 1;
                        }
                    }
                });
            }
            loading.dismiss();
        })

    }

    async presentFilter() {
        const modal = await this.modalCtrl.create({
            component: ScheduleFilterPage,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: { excludedTracks: this.excludeTracks }
        });
        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data) {
            this.excludeTracks = data;
            this.carregaBarbeiros();
        }
    }

    async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {


    }

    async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
        const alert = await this.alertCtrl.create({
            header: title,
            message: 'Would you like to remove this session from your favorites?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        // they clicked the cancel button, do not remove the session
                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                },
                {
                    text: 'Remove',
                    handler: () => {
                        // they want to remove this session from their favorites
                        this.carregaBarbeiros();

                        // close the sliding item and hide the option buttons
                        slidingItem.close();
                    }
                }
            ]
        });
        // now present the alert on top of all other content
        await alert.present();
    }

    async openSocial(network: string, fab: HTMLIonFabElement) {
        const loading = await this.loadingCtrl.create({
            message: `Posting to ${network}`,
            duration: (Math.random() * 1000) + 500
        });
        await loading.present();
        await loading.onWillDismiss();
        fab.close();
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

    async excluirColaborador(colaboradorID: any, colaborador: any) {

        try {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Deseja Excluir o Colaborador(a)<br><b>${colaborador}</b></text>`,

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

                            this.firebaseService.atualizaUsuario(colaboradorID, dados[0]);

                            const alert = await this.alertController.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                 <text>Colaborador(a) Excluído Com Sucesso!</text>`,
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
                            await this.carregaBarbeiros();
                        }
                    }
                ]
            });
            await alert.present();
            await alert.onDidDismiss().then(async data => {
                this.carregaBarbeiros();

            });

        } catch (error) {
            console.log(error);
        }
    }

    async atualizarColaborador(usuarioId: any, administrador: any, unidade: any, perfil: any, sexo: any, nome: any, numero: any, email: any, senha: any, whatsapp: any) {

        try {

            AlterarColaboradorPage.usuarioIdAtual = usuarioId;
            AlterarColaboradorPage.administradorAatual = administrador;
            AlterarColaboradorPage.unidadeAtual = unidade;
            AlterarColaboradorPage.perfilAtual = perfil;
            AlterarColaboradorPage.sexoAtual = sexo;
            AlterarColaboradorPage.nomeAtual = nome;
            AlterarColaboradorPage.numeroAtual = numero;
            AlterarColaboradorPage.emailAtual = email;
            AlterarColaboradorPage.senhaAtual = senha;
            AlterarColaboradorPage.whatsappAtual = whatsapp;

            const modal = await this.modalCtrl.create({
                component: AlterarColaboradorPage,
            });
            await modal.present();

            await modal.onDidDismiss().then(async data => {
                this.carregaBarbeiros();
            });

        } catch (error) {
            console.log(error);
        }
    }

}