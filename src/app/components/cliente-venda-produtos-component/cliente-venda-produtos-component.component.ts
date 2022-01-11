import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-venda-produtos-component',
  templateUrl: './cliente-venda-produtos-component.component.html',
  styleUrls: ['./cliente-venda-produtos-component.component.scss'],
})
export class ClienteVendaProdutosComponentComponent implements OnInit {


    exibeTabelaProduto = false;
    tabelaProduto = [];
    public melhorPreco: number;
    public verbaGerada: number;
    public colorCss = '';
    public stUnitario = 0;

    public produtosTemp: any = [];
    public static produtos: any = [];

    constructor(
        private popoverController: PopoverController) { }

    ngOnInit() { }

    async ionViewDidEnter() {

        try {
            this.produtosTemp = ClienteVendaProdutosComponentComponent.produtos;

        } catch (err) {
            this.popoverController.dismiss();
        }
    }

    touchTabelaEscohida(produto: any) {
        if (produto) {
            this.popoverController.dismiss(produto);
        } else {
            this.popoverController.dismiss();
        }
    }
}