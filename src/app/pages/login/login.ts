import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserOptions } from '../../interfaces/user-options';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { AppComponent } from '../../app.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    styleUrls: ['./login.scss'],
})
export class LoginPage {
    login: UserOptions = { email: '', senha: '' };
    submitted = false;
    email: any;
    error: any;
    senha: any;
    nome: any;
    perfil: any;
    uid: any;
    sexo: any;
    usuario: any = [];

    constructor(
        public dadosRepositories: DadosRepositories,
        public router: Router,
        private menu: MenuController,
        private alertController: AlertController,
        public faribaseService: FirebaseService,
        private angularFire: AngularFireAuth,
        private appComponent: AppComponent,
        public loadingController: LoadingController,
    ) {
        this.menu.enable(false);

    }

    async onLogin() {

        this.angularFire.signInWithEmailAndPassword(this.email, this.senha).then(async res => {
            this.setDadosUsuario(res.user.uid);
        }
        ).catch(async err => {
            if (err.message === 'The password is invalid or the user does not have a password.') {

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>A senha informada esta incorreta!</text>`,
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
            } else if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>O e-mail informado esta incorreto ou o usuário pode ter sido excluído!</text>`,
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

            } else if (err.message === 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.') {

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>
                         O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde!</text>`,
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

        });

    }

    async cadastrar() {
        this.router.navigateByUrl('cadastro-usuarios');
    }

    async setDadosUsuario(uid: any) {

        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Validando Usuário...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();

        try {


            this.faribaseService.get(uid).subscribe(dados => {

                this.usuario = dados;
                this.dadosRepositories.setLocalStorage('email', this.email);
                this.dadosRepositories.setLocalStorage('senha', this.senha);
                this.dadosRepositories.setLocalStorage('uid', this.uid);
                this.dadosRepositories.setLocalStorage('imagem', this.usuario[0].imagem);
                this.dadosRepositories.setLocalStorage('nome', this.usuario[0].nome);
                this.dadosRepositories.setLocalStorage('perfil', this.usuario[0].perfil);
                this.dadosRepositories.setLocalStorage('unidade', this.usuario[0].unidade);
                this.dadosRepositories.setLocalStorage('sexo', this.usuario[0].sexo);
                this.dadosRepositories.setLocalStorage('login', 'true');

                this.appComponent.getDadosUsuario();
                this.appComponent.setDocumentoUsuario();
                this.menu.enable(true);
                loading.dismiss();
                this.router.navigateByUrl('/app/tabs/home');
            })


        } catch (error) {

            await loading.dismiss();

        }
    }

}
