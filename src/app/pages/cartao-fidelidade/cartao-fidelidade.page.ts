import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js'; import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
Chart.register(...registerables);

@Component({
    selector: 'app-cartao-fidelidade',
    templateUrl: './cartao-fidelidade.page.html',
    styleUrls: ['./cartao-fidelidade.page.scss'],
})
export class CartaoFidelidadePage implements AfterViewInit {
    @ViewChild('lineCanvas', { static: false }) private lineCanvas: ElementRef;

    lineChart: any;

    dados: any = [];

    perfil: any;
    unidade: any;
    sexo: any;
    documento: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;

    clienteAux: any = [];
    cliente: any = [];

    fidelidade: number = 0;

    constructor(public dadosRepositories: DadosRepositories,
        public faribaseService: FirebaseService,
        public loadingController: LoadingController,
        private alertController: AlertController,) { }

    ngAfterViewInit() {
        this.getDadosUsuario();
        this.carregaVendasProdutosFidelidade();
        this.lineChartMethod();
    }

    lineChartMethod() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
                datasets: [
                    {
                        label: 'Sell per week',
                        fill: false,
                        //lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
                        spanGaps: false,
                    }
                ]
            }
        });
    }

    async carregaVendasProdutosFidelidade() {
        this.dados = [];
        this.fidelidade = 0;

        this.faribaseService.carregaInfoCliente(this.email).subscribe(async data => {
            this.cliente = [];
            this.clienteAux = [];
            if (this.cliente.length === 0) {
                    this.clienteAux = data;
                    for (let cliente of this.clienteAux) {
                        if (cliente.unidade === this.unidade && cliente.perfil === 'Cliente') {
                            this.cliente.push(cliente);
                            this.fidelidade = parseFloat(cliente.fidelidade);
                        }
                    }
            if (this.fidelidade >= 10) {
                const alert = await this.alertController.create({
                    message: '<ion-img src="/assets/gif/premiacao.gif" alt="loading..."></ion-img><br>Sucesso!<br><b>Você obteve uma nova conquista!</b>',
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
                alert.present();
            }
            }
        })

    }

    async getDadosUsuario() {
        this.documento = this.dadosRepositories.getLocalStorage('documento');
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }
}