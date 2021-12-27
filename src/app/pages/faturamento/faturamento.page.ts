import { Router } from '@angular/router';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js'; import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
Chart.register(...registerables);

@Component({
    selector: 'app-faturamento',
    templateUrl: './faturamento.page.html',
    styleUrls: ['./faturamento.page.scss'],
})
export class FaturamentoPage implements AfterViewInit {
    @ViewChild('lineCanvas', { static: false }) private lineCanvas: ElementRef;

    lineChart: any;

    vendas: any = [];
    vendasAux: any = [];

    selecioneUmColaborador: any = {
        header: 'Lista de Colaboradores'
    };

    textoDoFiltro = '';
    date = new Date(); // Define o dia atual sem formatar
    startDate = 'YYYY-MM-DD'; // new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString().slice(0, 10); // Define o Primeiro dia do Mês
    endDate = 'YYYY-MM-DD';

    quantidadeCarrinho = 0;
    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks: any = [];
    shownSessions: any = [];
    groups: any = [];
    confDate: string;
    showSearchbar: boolean;

    ios: boolean;

    perfil: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;
    unidade: any;

    quantidadeVendida: any = 0.0;
    totalVendido: any = 0.0;

    totalFidelidade = 0.0;
    totalComissao = 0.0;
    totalGorjetas = 0.0;
    totalLiquido = 0.0;
    totalBruto = 0.0;
    totalCustos = 0.0;
    totalLucro = 0.0;

    categoriaInfo: Date;
    descricaoInfo: any;
    quantidadeInfo: any;
    valorInfo: any;
    clientes: any[];
    cliente: any;
    fidelidade = 0.0;

    gastos: any = [];
    gastosAux: any;
    totalDeGastos: any = 0.0;

    colaboradores: any = [];
    colaborador: any;
    colaboradoresAux: any = [];

    vales: any = [];
    valesAux: any = [];
    totalVales: any;

    constructor(
        private firebaseService: FirebaseService,
        public router: Router,
        public loadingController: LoadingController,
        private dadosRepositories: DadosRepositories,
        private popoverController: PopoverController,
        private modalCtrl: ModalController,
        private alertController: AlertController) { }

    ngAfterViewInit() {
        this.getDadosUsuario();
        this.carregaColaboradores();
        this.focandoData();
        this.buscaVendasPorData();
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

    async focandoData() {
        this.startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString().slice(0, 10); // Define o primeiro dia do mês
        this.endDate = new Date().toISOString().slice(0, 10); // Define o dia atual
    }

    async buscaVendasPorData() {
        if (this.startDate > this.endDate || this.startDate === '' || this.endDate === '') {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                <text>A data inicial não pode ser maior que a data final, ou ficar em branco!</text>`,
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
        } else {
            const loading = await this.loadingController.create({
                message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Carregando Vendas...',
                spinner: null,
                cssClass: 'loadingCss',
            });
            await loading.present();
            try {

                if (this.colaborador == undefined || this.colaborador === null) {

                    this.firebaseService.carregaVendasClienteRelatorio(this.startDate, this.endDate).subscribe(data => {
                        let quantidadeDados = 1;
                        let dados = 0;
                        let clienteAnterior = '';

                        this.quantidadeVendida = 0;
                        this.fidelidade = 0;
                        this.totalComissao = 0;
                        this.totalGorjetas = 0;
                        this.totalCustos = 0;
                        this.totalLiquido = 0;
                        this.totalBruto = 0;
                        this.totalLucro = 0;

                        this.vendasAux = [];
                        this.vendas = [];
                        dados = data.length;

                        this.vendasAux = data;

                        for (let venda of this.vendasAux) {
                            if (quantidadeDados <= dados) {

                                if (venda.unidade === this.unidade) {
                                    this.vendas.push(venda);
                                    if (venda.formaDePagamento != 'Cartão Fidelidade ') {

                                        this.quantidadeVendida += parseInt(venda.quantidadeVendida);
                                        this.fidelidade += venda.fidelidade;
                                        this.totalLucro += venda.totalComissao;
                                        this.totalComissao += (venda.totalComissao - venda.totalGorjetas);
                                        this.totalGorjetas += venda.totalGorjetas;

                                    } else {
                                        this.totalFidelidade += venda.totalBruto;
                                    }
                                }
                                quantidadeDados += 1;
                                clienteAnterior = venda.cliente;
                            }
                        }
                        this.carregaVales(false);
                    });
                } else {

                    this.firebaseService.carregaVendasClienteRelatorio(this.startDate, this.endDate).subscribe(data => {
                        let quantidadeDados = 1;
                        let dados = 0;
                        let clienteAnterior = '';

                        this.quantidadeVendida = 0;
                        this.fidelidade = 0;
                        this.totalComissao = 0;
                        this.totalGorjetas = 0;
                        this.totalCustos = 0;
                        this.totalLiquido = 0;
                        this.totalBruto = 0;
                        this.totalLucro = 0;

                        this.vendasAux = [];
                        this.vendas = [];
                        dados = data.length;

                        this.vendasAux = data;

                        for (let venda of this.vendasAux) {
                            if (quantidadeDados <= dados) {

                                if (venda.unidade === this.unidade && venda.vendedor.trim() === this.colaborador.trim()) {
                                    this.vendas.push(venda);
                                    if (venda.formaDePagamento != 'Cartão Fidelidade ') {

                                        this.quantidadeVendida += parseInt(venda.quantidadeVendida);
                                        this.fidelidade += venda.fidelidade;
                                        this.totalLucro += venda.totalComissao;
                                        this.totalComissao += (venda.totalComissao - venda.totalGorjetas);
                                        this.totalGorjetas += venda.totalGorjetas;

                                    } else {
                                        this.totalFidelidade += venda.totalBruto;
                                    }
                                }
                                quantidadeDados += 1;
                                clienteAnterior = venda.cliente;
                            }
                        }
                        this.carregaVales(true);
                    });
                }

                loading.dismiss();

            } catch (error) {
                console.log('Não foi possivel carregar as vendas por data:', error);
                await loading.dismiss();
            }
        }
    }

    async abrirComanda(vendaId: any, cliente: any) {
    }

    public async getDadosUsuario() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');

        if (this.perfil === 'Colaborador' || this.perfil === 'Balcão') {
            this.colaborador = this.nome;
        }
    }

    async carregaColaboradores() {

        this.firebaseService.listaColaboradoresValue(this.unidade).subscribe(data => {
            this.colaboradores = [];
            this.colaboradoresAux = data;

            for (let colaborador of this.colaboradoresAux) {
                if (colaborador.perfil === 'Colaborador' || colaborador.perfil === 'Balcão' && colaborador.status === 'ativo') {
                    this.colaboradores.push(colaborador);
                }
            }
        })
    }

    async carregaVales(filtraColaborador: boolean) {
        this.firebaseService.carregaVales().subscribe(data => {
            this.totalVales = 0;
            this.vales = [];
            this.valesAux = [];
            this.valesAux = data;
            
            for (let vale of this.valesAux) {
                if (vale.unidade === this.unidade) {

                    if (filtraColaborador) {
                        if (vale.colaborador === this.colaborador) {
                            this.vales.push(vale);
                            this.totalVales += vale.valorDoVale;
                        }
                    } else {
                        this.vales.push(vale);
                        this.totalVales += vale.valorDoVale;
                    }
                }
            }
            this.totalLucro = (this.totalLucro - this.totalVales);
        })
    }
}
