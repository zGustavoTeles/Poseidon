import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()

export class LoginUtil {


  constructor(
    private alertController: AlertController,

  ) { 
    
  }

  async mensagens(texto: string, tipo: string){
 
    const alert = await this.alertController.create({
        message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
         <text>Deseja sair do sistema?</text>`,
        backdropDismiss: false,
        header: "Atenção",
        cssClass: "alertaCss",
        buttons: [
            {
                text: "Voltar",
                role: "Cancelar",
                cssClass: "secondary",
            },
            {
                text: "Sair",
                handler: () => {
                    navigator['app'].exitApp();
                },
            },
        ],
    });

    await alert.present();
  }

}
