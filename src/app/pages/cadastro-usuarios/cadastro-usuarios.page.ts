import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserOptions } from '../../interfaces/user-options';
import { AlertController, MenuController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-cadastro-usuarios',
    templateUrl: './cadastro-usuarios.page.html',
    styleUrls: ['./cadastro-usuarios.page.scss'],
})
export class CadastroUsuariosPage implements OnInit {
    login: UserOptions = { email: '', senha: '' };
    submitted = false;
    error: any;

    barbearias: any = {
        header: 'Barbearias'
    };

    sexosSelect: any = {
        header: 'Sexo'
    };

    unidade: any;
    perfis: any = [];
    perfil: any;
    sexos: any = [];
    unidades: any = [];
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

    constructor(
        public dadosRepositories: DadosRepositories,
        public router: Router,
        private menu: MenuController,
        private alertController: AlertController,
        public firebaseService: FirebaseService,
        private angularFire: AngularFireAuth,

    ) {
        this.menu.enable(false);

    }
    ngOnInit(): void {
        this.findAllSexo();
        this.findAllEmpresas();
    }

    async cadastrar(form: NgForm) {
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
                        unidade: this.unidade,
                        nome: this.nome,
                        imagem: '',
                        sexo: this.sexo,
                        celular: this.numero,
                        email: this.email,
                        senha: this.senha,
                        whatsapp: this.whatsapp,
                        perfil: 'Cliente',
                        status: "ativo",
                        fidelidade: 0
                        // facebook: this.facebook,
                        // instagram: this.instagram,
                        // twitter: this.twitter,

                    };


                    await this.angularFire.createUserWithEmailAndPassword(user.email, user.senha).then(function (data) {

                        user.uid = data.user.uid;
                        user.unidade = user.unidade;
                        user.nome = user.nome;
                        user.imagem = user.imagem;
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

                    this.firebaseService.registerUser(user);

                    const alert = await this.alertController.create({
                        message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Cadastro Realizado Com Sucesso! Agora é só fazer Login!</text>`,
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
                    this.whatsapp = '';
                    // this.facebook = '';
                    // this.instagram = '';
                    // this.twitter = '';
                    this.router.navigateByUrl('login');
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

    async voltar() {
        this.router.navigateByUrl('login');
    }

    public async findAllSexo() {
        await this.firebaseService.findAllSexos().subscribe(data => {
            this.sexos = data;
        });
    }

    public async findAllEmpresas() {
        await this.firebaseService.findAllEmpresas().subscribe(data => {
            this.unidades = data;
        });
    }

}
