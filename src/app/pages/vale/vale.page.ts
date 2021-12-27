import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-vale',
    templateUrl: './vale.page.html',
    styleUrls: ['./vale.page.scss'],
})
export class ValePage implements OnInit {

    selecioneUmColaborador: any = {
        header: 'Lista de Colaboradores'
    };

    formaDePagamentos: any = [];
    vales: any = [];
    valesAux: any = [];

    perfil: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;
    unidade: any;

    administrador: any;
    formaDePagamento: any;
    quantidade: any;
    valorPago: any;
    totalPago: any;
    dataDoGasto: any;

    colaborador: any;
    descricao: any;
    valorDoVale: any;
    dataDoVale: any;

    colaboradores: any = [];
    colaboradoresAux: any = [];

    error: any;
    submitted = false;

    constructor(private firebaseService: FirebaseService,
        private alertController: AlertController,
        public dadosRepositories: DadosRepositories,) { }

    ngOnInit() {
        this.getDadosUsuario();
        this.carregaColaboradores();
        this.carregaVales();
    }
    async cadastrarGastoDoMes(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            try {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Deseja Cadastrar Esse vale para o Colaborador(a): <b>${this.colaborador}</b><br><b>Valor do Vale:R$${this.valorDoVale.toFixed(2)}</b></text>`,

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

                                this.dataDoVale = new Date().toISOString().slice(0, 10);

                                let dados =
                                {
                                    administrador: this.nome,
                                    unidade: this.unidade,
                                    colaborador: this.colaborador,
                                    descricao: this.descricao,
                                    valorDoVale: this.valorDoVale,
                                    dataDoVale: this.dataDoVale
                                };

                                console.log(dados);

                                this.firebaseService.cadastrarVale(dados);

                                const alert = await this.alertController.create({
                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Vale Gerado Com Sucesso!</text>`,
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

                                this.colaborador = '';
                                this.descricao = '';
                                this.valorDoVale = '';
                                this.dataDoVale = '';

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

    async carregaColaboradores() {

        this.firebaseService.listaColaboradores(this.unidade).subscribe(data => {
            this.colaboradores = [];
            if (this.colaboradores.length === 0) {
                data.forEach(row => {
                    this.colaboradoresAux = [];
                    let line = Object(row.payload.doc.data());
                    line.doc = String(row.payload.doc.id);

                    this.colaboradoresAux.push(line);

                    for (let colaborador of this.colaboradoresAux) {
                        if (colaborador.perfil === 'Colaborador' || colaborador.perfil === 'Balcão' && colaborador.status === 'ativo') {
                            this.colaboradores.push(colaborador);
                        }
                    }
                });
            }
        })

    }

    async carregaVales() {
        this.firebaseService.carregaVales().subscribe(data => {
            this.vales = [];
            this.valesAux = [];
            this.valesAux = data;
            for (let vale of this.valesAux) {
                if (vale.unidade === this.unidade) {
                    this.vales.push(vale);
                }
            }
        })
    }

    async deleteVale() {
        const alert = await this.alertController.create({
            message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
             <text>Vale Excluído Com Sucesso!</text>`,
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

        this.colaborador = '';
        this.descricao = '';
        this.valorDoVale = '';
        this.dataDoVale = '';

        await alert.present();
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
}
