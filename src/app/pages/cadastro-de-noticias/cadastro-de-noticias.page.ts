import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AlertController, Config } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-cadastro-de-noticias',
    templateUrl: './cadastro-de-noticias.page.html',
    styleUrls: ['./cadastro-de-noticias.page.scss'],
})
export class CadastroDeNoticiasPage implements OnInit {

    data: any;
    titulo: any;
    mensagem: any;
    dataFinal: any;
    dataInicial: any;

    error: any;
    submitted = false;

    unidade: any;
    administrador: any;

    constructor(private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        private angularFire: AngularFireAuth,
        public dadosRepositories: DadosRepositories,) { }

    ngOnInit() {

        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.administrador = this.dadosRepositories.getLocalStorage('nome');
    }
    async cadastrarNotificacao(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.data = new Date().toISOString().slice(0, 10);
            try {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Deseja Enviar Essa Notificação aos <b>Usuários?</b></text>`,

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
                                    titulo: this.titulo,
                                    mensagem: this.mensagem,
                                    data: this.data
                                    // dataInicial: this.dataInicial,
                                    // dataFinal: this.dataFinal,
                                };
                                this.firebaseService.cadastrarNotificao(dados);

                                const alert = await this.alertController.create({
                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Notificação Enviada Com Sucesso!</text>`,
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

                                this.titulo = '';
                                this.mensagem = '';
                                this.dataFinal = '';
                                this.dataInicial = '';
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
}
