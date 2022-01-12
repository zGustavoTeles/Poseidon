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

    /**Dados para Cadastro da Empresa */
    empresa: any;
    cnpj: any;
    endereco: any;
    cep: any;
    telefoneFixo: any
    telefoneMovel: any

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        private angularFire: AngularFireAuth,
        public dadosRepositories: DadosRepositories,
    ) { }

    ngOnInit() {
        this.findAllPerfis();
        this.findAllSexos()
        this.administrador = "Administração Online";
        this.unidade = "Poseidon LTDA";
        this.ios = this.config.get('mode') === 'ios';
    }

    public async findAllPerfis() {
        await this.firebaseService.findAllPerfis().subscribe(data => {
            this.perfis = data;
        });
    }

    public async findAllSexos() {
        await this.firebaseService.findAllSexos().subscribe(data => {
            this.sexos = data;
        });
    }

    async cadastrarFuncionario(form: NgForm) {
        this.submitted = true;

        if (form.valid) {

            try {
                let user =
                {
                    uid: '',
                    administrador: this.administrador,
                    unidade: this.empresa,
                    perfil: this.perfil,
                    nome: this.nome,
                    imagem: "",
                    email: this.email,
                    senha: this.senha,
                    celular: this.numero,
                    sexo: "",
                    empresa: this.empresa,
                    cnpj: this.cnpj,
                    endereco: this.endereco,
                    cep: this.cep,
                    telefoneFixo: this.telefoneFixo,
                    telefoneMovel: this.telefoneMovel,
                    status: "ativo",
                    fidelidade: 0
                };


                await this.angularFire.createUserWithEmailAndPassword(user.email, user.senha).then(function (data) {

                    user.uid = data.user.uid;
                    user.administrador = user.administrador;
                    user.unidade = user.unidade;
                    user.perfil = user.perfil;
                    user.nome = user.nome;
                    user.imagem = user.imagem;
                    user.email = user.email;
                    user.senha = user.senha;
                    user.celular = user.celular;
                    user.sexo = user.sexo;
                    user.empresa = user.empresa;
                    user.cnpj = user.cnpj;
                    user.endereco = user.endereco;
                    user.cep = user.cep;
                    user.telefoneFixo = user.telefoneFixo;
                    user.telefoneMovel = user.telefoneMovel;
                    user.status = user.status;
                    user.fidelidade = user.fidelidade;
                })

                this.firebaseService.registerUser(user);

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Usuário Cadastrado Com Sucesso!</text>`,
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

                this.administrador = '';
                this.empresa = '';
                this.perfil = '';
                this.nome = '';
                this.email = '';
                this.senha = '';
                this.numero = '';
                this.empresa = '';
                this.cnpj = '';
                this.endereco = '';
                this.cep = '';
                this.telefoneFixo = '';
                this.telefoneMovel = '';

                await alert.present();

            } catch (error) {
                console.log(error);
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
