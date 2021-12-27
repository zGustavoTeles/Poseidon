import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, ToastController } from '@ionic/angular';


@Component({
    selector: 'page-support',
    templateUrl: 'support.html',
    styleUrls: ['./support.scss'],
})
export class SupportPage {
    submitted = false;
    supportMessage: string;

    constructor(
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private alertController: AlertController,
    ) { }

    async ionViewDidEnter() {
        const toast = await this.toastCtrl.create({
            message: 'A resposta pode demorar em razão da COVID-19',
            duration: 3000
        });
        await toast.present();
    }

    async submit(form: NgForm) {
        this.submitted = true;

        if (form.valid) {
            this.supportMessage = '';
            this.submitted = false;

            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
         <text>Mensagem Enviada Com Sucesso!</text>`,
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

    // If the user enters text in the support question and then navigates
    // without submitting first, ask if they meant to leave the page
    // async ionViewCanLeave(): Promise<boolean> {
    //   // If the support message is empty we should just navigate
    //   if (!this.supportMessage || this.supportMessage.trim().length === 0) {
    //     return true;
    //   }

    //   return new Promise((resolve: any, reject: any) => {
    //     const alert = await this.alertCtrl.create({
    //       title: 'Leave this page?',
    //       message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
    //       buttons: [
    //         { text: 'Stay', handler: reject },
    //         { text: 'Leave', role: 'cancel', handler: resolve }
    //       ]
    //     });

    //     await alert.present();
    //   });
    // }
}
