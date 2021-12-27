import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from "@angular/forms";
import { AlertController, Config } from "@ionic/angular";
import { FirebaseService } from "../../firebase.service";
import { DadosRepositories } from "../../providers/dados-repositories";


@Component({
    selector: 'app-cadastro-de-unidades-develop',
    templateUrl: './cadastro-de-unidades-develop.page.html',
    styleUrls: ['./cadastro-de-unidades-develop.page.scss'],
})
export class CadastroDeUnidadesDevelopPage implements OnInit {

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

    nomeDaUnidade: any;
    nomeDoProprietario: any;
    telefoneDaUnidade: any;
    telefoneDoProprietario: any;
    enderecoUnidade: any;
    cnpjDaUnidade: any;
    cpfdoProprietario: any;

    administrador: any;
    unidade: any;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        public dadosRepositories: DadosRepositories,
    ) { }

    ngOnInit() {
        this.administrador = this.dadosRepositories.getLocalStorage('nome');
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.ios = this.config.get('mode') === 'ios';
    }

    async cadastrarFuncionario(form: NgForm) {
        this.submitted = true;

        if (form.valid) {

            if (this.cnpjDaUnidade === undefined)
            this.cnpjDaUnidade = '00000000000';

            if (this.cpfdoProprietario === undefined)
            this.cpfdoProprietario = '00000000000000';

            try {
                let dados =
                {
                    "administrador": this.administrador,
                    "nomeDaUnidade": this.nomeDaUnidade,
                    "nomeDoProprietario": this.nomeDoProprietario,
                    "telefoneDaUnidade": this.telefoneDaUnidade,
                    "telefoneDoProprietario": this.telefoneDoProprietario,
                    "enderecoUnidade": this.enderecoUnidade,
                    "cnpjDaUnidade": this.cnpjDaUnidade,
                    "cpfdoProprietario": this.cpfdoProprietario
                };

                this.firebaseService.cadastrarUnidades(dados);

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Unidade Cadastrada com Sucesso!</text>`,
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

                this.nomeDaUnidade = '';
                this.nomeDoProprietario = '';
                this.telefoneDaUnidade = '';
                this.telefoneDoProprietario = '';
                this.enderecoUnidade = '';
                this.cnpjDaUnidade = '';
                this.cpfdoProprietario = '';

                await alert.present();

            } catch (error) {
                console.log(error);
            }

        }
    }

}
