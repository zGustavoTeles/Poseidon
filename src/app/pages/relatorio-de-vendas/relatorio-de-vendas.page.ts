import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-relatorio-de-vendas',
    templateUrl: './relatorio-de-vendas.page.html',
    styleUrls: ['./relatorio-de-vendas.page.scss'],
})
export class RelatorioDeVendasPage implements OnInit {

    vendas: any = [];
    vendasAux: any = [];

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
    totalDescontos = 0.0;
    totalVales = 0.0;
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

    vales: any = [];
    valesAux: any;

    constructor(
        private firebaseService: FirebaseService,
        public router: Router,
        public loadingController: LoadingController,
        private dadosRepositories: DadosRepositories,
        private alertController: AlertController,) { }

    ngOnInit() {
        this.getDadosUsuario();
        this.focandoData();
        this.buscaVendasPorData();
    }

    async touchOpcoesFiltro(ev: any) {

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

                this.firebaseService.carregaVendasClienteRelatorio(this.startDate, this.endDate).subscribe(data => {
                    let quantidadeDados = 1;
                    let dados = 0;
                    let clienteAnterior = '';
                    this.quantidadeVendida = 0;
                    this.fidelidade = 0;
                    this.totalComissao = 0;
                    this.totalGorjetas = 0;
                    this.totalDescontos = 0;
                    this.totalCustos = 0;
                    this.totalLiquido = 0;
                    this.totalBruto = 0;
                    this.totalLucro = 0;
                    this.vendasAux = [];
                    this.vendas = [];

                    if (data[0] !== undefined && data[0] !== null) {
                        dados = data.length;
                        this.vendasAux = data;
                        for (let venda of this.vendasAux) {
                            if (quantidadeDados <= dados) {

                                if (venda.unidade === this.unidade) {
                                    this.vendas.push(venda);
                                    if (venda.formaDePagamento != 'Cartão Fidelidade ') {
                                        this.quantidadeVendida += parseInt(venda.quantidadeVendida);
                                        this.fidelidade += venda.fidelidade;
                                        this.totalComissao += venda.totalComissao;
                                        this.totalGorjetas += venda.totalGorjetas;
                                        this.totalDescontos += venda.totalDescontos;
                                        this.totalLiquido += venda.totalLiquido;
                                        this.totalBruto += venda.totalBruto;
                                        this.totalCustos += venda.totalDeCusto;
                                        this.totalLucro += venda.totalLucro;
                                    } else {
                                        this.totalFidelidade += venda.totalBruto;
                                    }
                                }
                                quantidadeDados += 1;
                                clienteAnterior = venda.cliente;
                            }
                        } 
                    }

                    console.log('aquuiuuuu');
                    console.log(this.totalLucro);
                    
    
                    this.firebaseService.carregaGastosNoMes(this.startDate, this.endDate).subscribe(data => {
                        this.totalDeGastos = 0;
                        this.gastosAux = data;
                        for (let gasto of this.gastosAux) {
                            if (gasto.unidade === this.unidade) {
                                this.totalDeGastos += gasto.totalPago;
                            }
                        }
                        this.totalLucro = (this.totalLucro - this.totalDeGastos);
                    });        
    
                    this.firebaseService.carregaValesFiltroData(this.startDate, this.endDate).subscribe(data => {
                        this.totalVales = 0;
                        this.valesAux = data;
                        for (let vale of this.valesAux) {
                            if (vale.unidade === this.unidade) {
                                this.totalVales += vale.valorDoVale;
                            }
                        }
                        this.totalLucro = (this.totalLucro - this.totalVales);
                    });
                });
               
                loading.dismiss();
                // });
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
    }

}
