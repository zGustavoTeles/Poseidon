import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Config } from 'protractor';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-alterar-colaborador',
    templateUrl: './alterar-colaborador.page.html',
    styleUrls: ['./alterar-colaborador.page.scss'],
})
export class AlterarColaboradorPage implements OnInit {
    error: any;

    selecioneUmPerfil: any = {
        header: 'Selecione um Perfil'
    };

    selecioneUmSexo: any = {
        header: 'Selecione um Sexo'
    };

    ios: boolean;
    submitted = false;

    perfis: any = [];
    sexos: any = [];

    usuarioId: any;
    administrador: any;
    unidade: any;
    perfil: any;
    sexo: any;
    nome: any;
    numero: any;
    email: any;
    senha: any;
    whatsapp: any;
    facebook: any;
    instagram: any;
    twitter: any;

    public static usuarioIdAtual: any;
    public static administradorAatual: any;
    public static unidadeAtual: any;
    public static perfilAtual: any;
    public static sexoAtual: any;
    public static nomeAtual: any;
    public static numeroAtual: any;
    public static emailAtual: any;
    public static senhaAtual: any;
    public static whatsappAtual: any;

    constructor(
        private firebaseService: FirebaseService,
        private alertController: AlertController,
        private angularFire: AngularFireAuth,
        public dadosRepositories: DadosRepositories,
        private modalCtrl: ModalController,
    ) { }

    ngOnInit() {
        this.carreagaPerfis();
        this.carreagaSexos()

        this.usuarioId = AlterarColaboradorPage.usuarioIdAtual;
        this.administrador = AlterarColaboradorPage.administradorAatual;
        this.unidade = AlterarColaboradorPage.unidadeAtual;
        this.perfil = AlterarColaboradorPage.perfilAtual;
        this.sexo = AlterarColaboradorPage.sexoAtual;
        this.nome = AlterarColaboradorPage.nomeAtual;
        this.numero = AlterarColaboradorPage.numeroAtual;
        this.email = AlterarColaboradorPage.emailAtual;
        this.senha = AlterarColaboradorPage.senhaAtual;
        this.whatsapp = AlterarColaboradorPage.whatsappAtual;
    }

    carreagaPerfis() {

        this.firebaseService.carregaPerfis().subscribe(data => {
            console.log(data)

            this.perfis = data;
        })

    }

    carreagaSexos() {

        this.firebaseService.carregaSexos().subscribe(data => {
            console.log(data)

            this.sexos = data;
        })

    }

    async atualizarFuncionario(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            try {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Deseja Alterar Esse Colaborador(a):<br><b>${this.nome}</b></text>`,

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
                                {
                                    administrador: this.administrador,
                                    unidade: this.unidade,
                                    perfil: this.perfil,
                                    sexo: this.sexo,
                                    nome: this.nome,
                                    numero: this.numero,
                                    email: this.email,
                                    senha: this.senha,
                                    whatsapp: this.whatsapp

                                };
                                this.firebaseService.atualizaUsuario(this.usuarioId, dados);

                                const alert = await this.alertController.create({
                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Colocaborador(a) Alterado Com Sucesso!</text>`,
                                    backdropDismiss: false,
                                    cssClass: "alertaCss",
                                    header: "Atenção",
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

                                this.usuarioId = '';
                                this.administrador = '';
                                this.unidade = '';
                                this.perfil = '';
                                this.sexo = '';
                                this.nome = '';
                                this.numero = '';
                                this.email = '';
                                this.senha = '';
                                this.whatsapp = '';
                                await alert.present();
                                this.modalCtrl.dismiss();

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

    async sair() {
        this.modalCtrl.dismiss();
    }

}
