import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-clientes-temp-component',
    templateUrl: './clientes-temp-component.component.html',
    styleUrls: ['./clientes-temp-component.component.scss'],
})
export class ClientesTempComponentComponent implements OnInit {


    exibeTabelaProduto = false;
    tabelaProduto = [];
    public melhorPreco: number;
    public verbaGerada: number;
    public colorCss = '';
    public stUnitario = 0;

    public clientesTemp: any = [];
    public static clientes: any = [];

    constructor(
        private popoverController: PopoverController) { }

    ngOnInit() { }

    async ionViewDidEnter() {

        try {
            this.clientesTemp = ClientesTempComponentComponent.clientes;
            console.log(this.clientesTemp);

        } catch (err) {

            this.popoverController.dismiss();
        }
    }

    touchTabelaEscohida(cliente: any) {
        if (cliente) {
            this.popoverController.dismiss(cliente);
        } else {
            this.popoverController.dismiss();
        }
    }
}