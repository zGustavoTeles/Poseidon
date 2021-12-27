import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';

@Component({
    selector: 'app-cadastro-de-categorias',
    templateUrl: './cadastro-de-categorias.page.html',
    styleUrls: ['./cadastro-de-categorias.page.scss'],
})
export class CadastroTipoVendaPage {
    submitted = false;
    error: any;

    descricao: any;

    constructor(
        private firebaseService: FirebaseService,
        private alertController: AlertController,
    ) { }

    async cadastrarCategorias(form: NgForm) {
        this.submitted = true;

        if (form.valid) {

            let dados =
                [{
                    "descricao": this.descricao,

                }];

            console.log(dados);

            try {

                // this.firebaseService.add_dados('CLIENTE_01_CATEGORIAS', dados[0]);

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Categoria Cadastrada Com Sucesso!</text>`,
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

                this.descricao = '';
                
                await alert.present();

            } catch (error) {
                console.log(error);
            }

        }
    }

}
