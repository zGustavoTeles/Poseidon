import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-gastos-do-mes',
    templateUrl: './gastos-do-mes.page.html',
    styleUrls: ['./gastos-do-mes.page.scss'],
})
export class GastosDoMesPage implements OnInit {

    selecionFormaPagamento: any = {
        header: 'Forma de Pagamento'
    };

    formaDePagamentos: any = [];
    gastos: any = [];
    gastosAux: any = [];

    unidade: any;
    administrador: any;
    formaDePagamento: any;
    descricao: any;
    quantidade: any;
    valorPago: any;
    totalPago: any;
    dataDoGasto: any;
    date = new Date(); //
    startDate = 'YYYY-MM-DD'; // new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString().slice(0, 10); // Define o Primeiro dia do Mês
    endDate = 'YYYY-MM-DD';
    error: any;
    submitted = false;

    constructor(private firebaseService: FirebaseService,
        private alertController: AlertController,
        public dadosRepositories: DadosRepositories,) { }

    ngOnInit() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.administrador = this.dadosRepositories.getLocalStorage('nome');
        this.focandoData();
        this.findAllPaymentMethods();
        this.findAllSpendingMonth();
    }
    async cadastrarGastoDoMes(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            try {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Deseja Cadastrar Esse Gasto:<br><b>Descrição: ${this.descricao}</b></text>`,

                    backdropDismiss: false,
                    header: "Atenção",
                    cssClass: "alertaCss",

                    buttons: [
                        {
                            text: 'Não',
                            role: 'cancel',
                            cssClass: 'cancelcancelarButton',
                            handler: async () => {
                                return;
                            }
                        },
                        {
                            text: 'Sim',
                            cssClass: 'okButton',
                            handler: async () => {

                                this.totalPago = this.valorPago;
                                this.dataDoGasto = new Date().toISOString().slice(0, 10);

                                let dados =
                                    [{
                                        "administrador": this.administrador,
                                        "unidade": this.unidade,
                                        "formaDePagamento": this.formaDePagamento,
                                        "descricao": this.descricao,
                                        "quantidade": this.quantidade,
                                        "valorPago": this.valorPago,
                                        "totalPago": this.totalPago,
                                        "dataDoGasto": this.dataDoGasto

                                    }];

                                this.firebaseService.registerSpendingMonth(dados[0]);


                                const alert = await this.alertController.create({
                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Gasto Cadastrado Com Sucesso!</text>`,
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
                                this.unidade = '';
                                this.formaDePagamento = '';
                                this.descricao = '';
                                this.quantidade = '';
                                this.valorPago = '';
                                this.totalPago = '';
                                this.dataDoGasto = '';

                                await this.findAllSpendingMonth();

                                await alert.present();
                            }
                        }
                    ]
                });
                await alert.present();

            } catch (error) {
                console.log(error);
            }
        }
    }

    public async findAllPaymentMethods() {
        await this.firebaseService.findAllPaymentMethods().subscribe(data => {
            this.formaDePagamentos = data;
        })
    }

    async findAllSpendingMonth() {

        this.firebaseService.findAllSpendingMonth(this.startDate, this.endDate).subscribe(data => {
            this.gastosAux = [];
            this.gastos = [];
            this.gastosAux = data;

            for (let gasto of this.gastosAux) {
                if (gasto.unidade === this.unidade) {
                    this.gastos.push(gasto)
                }
            }

        });
    }

    async focandoData() {
        this.startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1).toISOString().slice(0, 10); // Define o primeiro dia do mês
        this.endDate = new Date().toISOString().slice(0, 10); // Define o dia atual
    }

    async deleteGasto(data, documento) {
        try {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                 <text>Deseja Excluir o Gasto do dia:<br><b>${data}<b>?</b></text>`,

                backdropDismiss: false,
                header: "Atenção",
                cssClass: "alertaCss",

                buttons: [
                    {
                        text: 'Não',
                        role: 'cancel',
                        cssClass: 'cancelcancelarButton',
                        handler: async () => {
                            return;
                        }
                    },
                    {
                        text: 'Sim',
                        cssClass: 'okButton',
                        handler: async () => {

                            this.firebaseService.deleteSpendingMontha(documento);

                            const alert = await this.alertController.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                             <text>Gasto Excluído Com Sucesso!</text>`,
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
                            this.unidade = '';
                            this.formaDePagamento = '';
                            this.descricao = '';
                            this.quantidade = '';
                            this.valorPago = '';
                            this.totalPago = '';
                            this.dataDoGasto = '';

                            await this.findAllSpendingMonth();
                            await alert.present();
                        }
                    }
                ]
            });
            await alert.present();

        } catch (error) {
            console.log(error);
        }
    }
}
