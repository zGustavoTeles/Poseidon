import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AlertController, Config } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-cadastro-funcionarios',
    templateUrl: './cadastro-funcionarios.page.html',
    styleUrls: ['./cadastro-funcionarios.page.scss'],
})
export class CadastroFuncionariosPage implements OnInit {
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
    perfil: any;
    sexos: any = [];
    sexo: any;
    nome: any;
    numero: any;
    email: any;
    senha: any;
    confirmarSenha: any;
    whatsapp: any;
    facebook: any;
    instagram: any;
    twitter: any;

    administrador: any;
    unidade: any;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        private angularFire: AngularFireAuth,
        public dadosRepositories: DadosRepositories,
    ) { }

    ngOnInit() {
        this.carreagaPerfis();
        this.carreagaSexos()
        this.administrador = this.dadosRepositories.getLocalStorage('nome');
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.ios = this.config.get('mode') === 'ios';
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

    async cadastrarFuncionario(form: NgForm) {
        this.submitted = true;

        if (form.valid) {

            if (this.senha === this.confirmarSenha) {

                if (this.whatsapp === undefined)
                    this.whatsapp = '';

                // if (this.facebook === undefined)
                //     this.facebook = '';

                // if (this.instagram === undefined)
                //     this.instagram = '';

                // if (this.twitter === undefined)
                //     this.twitter = '';

                try {
                    let user =
                    {
                        uid: '',
                        administrador: this.administrador,
                        unidade: this.unidade,
                        // administrador: this.administrador,
                        // unidade: this.unidade,
                        nome: this.nome,
                        sexo: this.sexo,
                        celular: this.numero,
                        email: this.email,
                        senha: this.senha,
                        whatsapp: this.whatsapp,
                        perfil: this.perfil,
                        status: "ativo",
                        fidelidade: 0
                        // facebook: this.facebook,
                        // instagram: this.instagram,
                        // twitter: this.twitter,
                    };


                    await this.angularFire.createUserWithEmailAndPassword(user.email, user.senha).then(function (data) {

                        user.uid = data.user.uid;
                        user.administrador = user.administrador;
                        user.unidade = user.unidade;
                        user.nome = user.nome;
                        user.sexo = user.sexo;
                        user.celular = user.celular;
                        user.email = user.email;

                        user.senha = user.senha;
                        user.whatsapp = user.whatsapp;

                        user.perfil = user.perfil;
                        user.status = user.status;
                        user.fidelidade = user.fidelidade;

                        // user.facebook = user.facebook;
                        // user.instagram = user.instagram;
                        // user.twitter = user.twitter;


                    })

                    this.firebaseService.cadastrarUsuario(user);

                    const alert = await this.alertController.create({
                        message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Colaborador(a) Cadastrado Com Sucesso!</text>`,
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

                    this.nome = '';
                    this.sexo = '';
                    this.numero = '';
                    this.email = '';
                    this.senha = '';
                    this.confirmarSenha = '';
                    this.perfil = '';
                    this.whatsapp = '';
                    // this.facebook = '';
                    // this.instagram = '';
                    // this.twitter = '';

                    await alert.present();




                } catch (error) {
                    console.log(error);
                }

            } else {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Senhas divergentes!</text>`,
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

                this.confirmarSenha = '';
                await alert.present();
            }

        } else {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
             <text>Por favor informe todos os dados!</text>`,
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

}
