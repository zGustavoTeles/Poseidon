import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-alterar-notificacoes',
    templateUrl: './alterar-notificacoes.page.html',
    styleUrls: ['./alterar-notificacoes.page.scss'],
})
export class AlterarNotificacoesPage implements OnInit {

    dataFinal: any;
    dataInicial: any;

    dataNovo: any;
    tituloNovo: any;
    mensagemNovo: any;
    unidadeNovo: any;
    administradorNovo: any;

    error: any;
    submitted = false;


    public static notificaoId: any;
    public static dataAtual: any;
    public static tituloAtual: any;
    public static mensagemAtual: any;
    public static unidadeAtual: any;
    public static administradorAtual: any;

    constructor(private firebaseService: FirebaseService,
        private alertController: AlertController,
        private modalCtrl: ModalController,
        public dadosRepositories: DadosRepositories,) { }

    ngOnInit() {

        this.dataNovo = AlterarNotificacoesPage.tituloAtual;
        this.tituloNovo = AlterarNotificacoesPage.tituloAtual;
        this.mensagemNovo = AlterarNotificacoesPage.mensagemAtual;
        this.unidadeNovo = AlterarNotificacoesPage.unidadeAtual;
        this.administradorNovo = AlterarNotificacoesPage.administradorAtual;

    }
    async atualizaNotificao(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            try {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Deseja Alterar Essa Notificação para os <b>Usuários?</b></text>`,

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
                                    administrador: this.administradorNovo,
                                    unidade: this.unidadeNovo,
                                    titulo: this.tituloNovo,
                                    mensagem: this.mensagemNovo,
                                    data: this.dataNovo
                                    // dataInicial: this.dataInicial,
                                    // dataFinal: this.dataFinal,
                                };
                                this.firebaseService.atualizaNoticias(AlterarNotificacoesPage.notificaoId, dados);

                                const alert = await this.alertController.create({
                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Notificação Alterada Com Sucesso!</text>`,
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

                                this.tituloNovo = '';
                                this.mensagemNovo = '';
                                this.dataNovo = '';
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
