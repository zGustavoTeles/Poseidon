import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';


@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
    styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit {
    username: string;
    password: string;
    novoEmailUm: string;
    novoEmailDois: string;
    senhaUm: string;
    senhaDois: string;
    email: any;
    imagem: string;
    unidade: any;
    uid: any;
    documento: any;
    perfil: any;
    sexo: any;
    nome: any;
    senha: any;

    constructor(
        public firebaseService: FirebaseService,
        public alertCtrl: AlertController,
        public router: Router,
        public userData: DadosRepositories,
        private dadosRepositories: DadosRepositories,
        private appComponent: AppComponent,
    ) { }
    ngOnInit(): void {
        this.getDadosUsuario();
    }

    // /**
    //  * Pegando imagem
    //  */
    async touchCapturandoImg(event) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            this.imagem = imageData;
            this.updateUsuario()
            this.dadosRepositories.removeLocalStorage('imagem');
            this.dadosRepositories.setLocalStorage('imagem', this.imagem);
            this.appComponent.getDadosUsuario();
            this.appComponent.setDocumentoUsuario();
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    // Present an alert with the current username populated
    // clicking OK will update the username and display it
    // clicking Cancel will close the alert and do nothing
    async changeUsername() {
        const alert = await this.alertCtrl.create({
            header: 'Informe sua senha',
            buttons: [
                'Cancel',
                {
                    text: 'Ok',
                    handler: async (data: any) => {
                        if (data.password === this.senha) {
                            const alert = await this.alertCtrl.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Deseja realmente alterar seu e-mail?</text>`,

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



                                            const alert2 = await this.alertCtrl.create({
                                                header: 'Novo E-mail',
                                                buttons: [
                                                    'Cancel',
                                                    {
                                                        text: 'Ok',
                                                        handler: async (data: any) => {

                                                            if (data.emailUm === data.emailDois) {


                                                                this.firebaseService.updateEmail(this.email, this.senha, data.emailUm);
                                                                this.dadosRepositories.setLocalStorage('email', data.emailUm);
                                                                this.email = this.dadosRepositories.getLocalStorage('email');
                                                                this.updateEmailUser(data.emailUm);

                                                                const alert = await this.alertCtrl.create({
                                                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                                     <text>E-mail alterado com<b>sucesso!</b></text>`,
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


                                                            } else {
                                                                const alert = await this.alertCtrl.create({
                                                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                                         <text>E-mail divergente! Por favor, tente novamente<br><b>${this.nome}</b></text>`,
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

                                                            }
                                                        }
                                                    }
                                                ],
                                                inputs: [
                                                    {
                                                        type: 'text',
                                                        name: 'emailUm',
                                                        value: this.novoEmailUm,
                                                        placeholder: 'Novo E-mail'
                                                    },
                                                    {
                                                        type: 'text',
                                                        name: 'emailDois',
                                                        value: this.novoEmailDois,
                                                        placeholder: 'Confirmar E-mail'
                                                    }
                                                ],

                                            });
                                            await alert2.present();
                                        }
                                    }
                                ]
                            });
                            await alert.present();

                        } else {
                            const alert = await this.alertCtrl.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Senha incorreta! Por favor, tente novamente<br><b>${this.nome}</b></text>`,
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

                        }

                    }
                }
            ],
            inputs: [
                {
                    type: 'password',
                    name: 'password',
                    value: this.password,
                    placeholder: 'Senha de acesso'
                },
                // {
                //     type: 'password',
                //     name: 'confirmarSenha',
                //     value: this.username,
                //     placeholder: 'Confirmar Senha'
                // }
            ],

        });
        await alert.present();
    }

    getUsername() {

    }

    async changePassword() {
        const alert = await this.alertCtrl.create({
            header: 'Informe sua senha',
            buttons: [
                'Cancel',
                {
                    text: 'Ok',
                    handler: async (data: any) => {
                        if (data.password === this.senha) {
                            const alert = await this.alertCtrl.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Deseja realmente alterar sua senha?</text>`,

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



                                            const alert2 = await this.alertCtrl.create({
                                                header: 'Nova Senha',
                                                buttons: [
                                                    'Cancel',
                                                    {
                                                        text: 'Ok',
                                                        handler: async (data: any) => {

                                                            if (data.senhaUm === data.senhaDois && data.senhaUm.length >= 6 && data.senhaDois.length >= 6) {
                                                                this.firebaseService.updateSenha(this.email, this.senha, data.senhaUm);
                                                                this.dadosRepositories.setLocalStorage('senha', data.senhaUm);
                                                                this.senha = this.dadosRepositories.getLocalStorage('senha');
                                                                this.updatePasswordUser(data.senhaUm);

                                                                const alert = await this.alertCtrl.create({
                                                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                                     <text>Senha alterada com <b>sucesso!</b></text>`,
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


                                                            } else {
                                                                const alert = await this.alertCtrl.create({
                                                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                                         <text>Senha divergente, ou menor que 6 caracteres!<br>Por favor, tente novamente<br><b>${this.nome}</b></text>`,
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

                                                            }
                                                        }
                                                    }
                                                ],
                                                inputs: [
                                                    {
                                                        type: 'password',
                                                        name: 'senhaUm',
                                                        value: this.senhaUm,
                                                        placeholder: 'Nova Senha'
                                                    },
                                                    {
                                                        type: 'password',
                                                        name: 'senhaDois',
                                                        value: this.senhaDois,
                                                        placeholder: 'Confirmar Senha'
                                                    }
                                                ],

                                            });
                                            await alert2.present();
                                        }
                                    }
                                ]
                            });
                            await alert.present();

                        } else {
                            const alert = await this.alertCtrl.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Senha incorreta! Por favor, tente novamente<br><b>${this.nome}</b></text>`,
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

                        }

                    }
                }
            ],
            inputs: [
                {
                    type: 'password',
                    name: 'password',
                    value: this.password,
                    placeholder: 'Senha de acesso'
                },
                // {
                //     type: 'password',
                //     name: 'confirmarSenha',
                //     value: this.username,
                //     placeholder: 'Confirmar Senha'
                // }
            ],

        });
        await alert.present();
    }

    async logout() {
        const alert = await this.alertCtrl.create({
            message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                 <text>Deseja realmente sair da <b>aplicação?</b></text>`,

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
                        this.dadosRepositories.deleteLocalStorage();
                        this.appComponent.verificaUsuarioLogado();
                    }
                }
            ]
        });
        await alert.present();
    }

    support() {
        this.router.navigateByUrl('/support');
    }

    public async getDadosUsuario() {
        this.documento = this.dadosRepositories.getLocalStorage('documento');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.imagem = this.dadosRepositories.getLocalStorage('imagem');
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
    }

    async updateUsuario() {
        try {
            let dados =
            {
                imagem: this.imagem
            };
            this.firebaseService.updateUsuario(this.documento, dados);
        } catch (error) {
            console.log(error);
        }
    }

    async updateEmailUser(email) {
        try {
            let dados =
            {
                email: email
            };
            this.firebaseService.updateUsuario(this.documento, dados);
        } catch (error) {
            console.log(error);
        }
    }

    async updatePasswordUser(senha) {
        try {
            let dados =
            {
                senha: senha
            };
            this.firebaseService.updateUsuario(this.documento, dados);
        } catch (error) {
            console.log(error);
        }
    }
}
