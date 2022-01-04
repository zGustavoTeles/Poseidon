import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Config, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { ComandaPage } from '../comanda/comanda.page';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { UserData } from '../../providers/user-data';
import { MapPage } from '../map/map';
import { ClientesTempComponentComponent } from '../../components/clientes-temp-component/clientes-temp-component.component';


@Component({
    selector: 'app-inserir-produto-carrinho',
    templateUrl: './inserir-produto-carrinho.page.html',
    styleUrls: ['./inserir-produto-carrinho.page.scss'],
})
export class InserirProdutoCarrinhoPage implements OnInit {

    map: MapPage;

    selecioneUmCliente: any = {
        header: 'Lista de Clientes'
    };

    selecioneUmColaborador: any = {
        header: 'Lista de Colaboradores'
    };

    data: Date;
    dataVenda: any;
    perfilColaborador: any;
    colaboradorVendedor: any;
    colaborador: any;
    colaboradoresAux: any = [];
    colaboradores: any = [];
    produto: any;
    categoria: any;
    quantidade: any;
    estoque: any;
    valorDeVenda: any;
    desconto: any = 0;
    total: any;
    formaDePagamento: any;

    imagem: string;

    ios: boolean;
    submitted = false;
    descricao: any;

    fidelidade: any;
    comissao: any;

    totalComissao = 0.0;
    totalDesconto = 0.0;
    totalLiquido = 0.0;
    totalBruto = 0.0;
    totalDeCusto: any;
    valorDeCusto = 0.0;
    totalLucro = 0.0;

    quantidadeInserida = 1;
    estoqueFinal: any;

    produtos: any = [];
    infoProduto: any = [];
    formaDePagamentos: any = [];
    valorProdutos: any[];
    estoques: any[];
    valorProduto: any;

    gorjeta: any;


    categoriaInfo: Date;
    descricaoInfo: any;
    quantidadeInfo: any;
    valorInfo: any;
    clientes: any[];
    clientesAux: any[];
    clientesCarrinho: any[];
    clienteValido: boolean = true;
    cliente: any;
    unidade: any;
    perfil: any;
    produtoUid: any;
    clienteId: any;
    clienteFidelidade;

    clientesTemp: any = [];
    clientesTempAux: any = [];
    clienteTemp: any;
    clientesTempCount: number = 0;

    public static descricao: any;
    public static categoria: any;
    public static estoque: any;
    public static valorDeVenda: any;
    public static produtoId: any;
    public static produtoInserido: any;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        public router: Router,
        public dadosRepositories: DadosRepositories,
        private modalCtrl: ModalController,
        private popoverController: PopoverController
    ) { }

    ngOnInit() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.colaboradorVendedor = this.dadosRepositories.getLocalStorage('nome');
        this.cliente = 'Selecione um Cliente';
        this.colaborador = 'Selecione um Colaborador(a)';
        this.dataVenda = new Date;
        this.desconto = 0;
        this.carregaInfoProduto();
        // this.carregaClientes();
        // this.carregaColaboradores();
        this.carregaClientesEmAberto();

        this.ios = this.config.get('mode') === 'ios';
    }

    public carregaInfoProduto() {
        this.firebaseService.findAllProduct(InserirProdutoCarrinhoPage.produtoId).subscribe(data => {
            // console.log(data)
            this.produtos = data;
            this.produtoUid = this.produtos.uid;
            this.valorProduto = this.produtos[0].valorDeVenda;
            this.estoque = this.produtos[0].quantidade;

            if (this.produtos[0].categoria === 'Serviços')
                this.estoqueFinal = 'Serviços Disponíveis';
            else
                this.estoqueFinal = this.produtos[0].quantidade;

            this.categoria = this.produtos[0].categoria;
            this.descricao = this.produtos[0].descricao;

            this.fidelidade = this.produtos[0].fidelidade;
            this.comissao = this.produtos[0].comissao;
            this.valorDeCusto = this.produtos[0].valorDeCusto;
            this.totalDeCusto = this.produtos[0].valorDeCusto;
            this.imagem =  this.produtos[0].imagem;
            this.calculaTotal();
        })

    }

    public carregaColaboradores() {

        this.firebaseService.carregaColaboradores(this.unidade).subscribe(data => {

            this.colaboradoresAux = data;

            for (let colaborador of this.colaboradoresAux) {
                if (colaborador.perfil === 'Colaborador' || colaborador.perfil === 'Balcão' && colaborador.status === 'ativo') {
                    this.colaboradores.push(colaborador);
                }
            }
        })
    }

    public async validaInsercaoProduto(cliente: any, clienteId: any, fidelidade: any, colaborador: any) {

        if (cliente === undefined || cliente === null || cliente === 'Selecione um Cliente') {
            cliente = 'Cliente Indefinido - ' + Math.random().toFixed(1);
            this.cliente = 'Cliente Indefinido - ' + Math.random().toFixed(1);
            this.firebaseService.carregaVendasClienteTempInsert(cliente).subscribe(data => {

                if (data[0] !== undefined && data[0] !== null)
                    this.clienteValido = false;
                this.insereDadosTemp(clienteId, fidelidade, colaborador);
                
            });
        } else {
            this.firebaseService.carregaVendasClienteTempInsert(cliente).subscribe(data => {
                if (data[0] !== undefined && data[0] !== null)
                    this.clienteValido = false;
                this.insereDadosTemp(clienteId, fidelidade, colaborador);
            })
        }
    }

    carregaClientes() {
        this.firebaseService.listaClientes().subscribe(data => {
            this.clientes = [];
            if (this.clientes.length === 0) {
                data.forEach(row => {
                    this.clientesAux = [];
                    let line = Object(row.payload.doc.data());
                    line.doc = String(row.payload.doc.id);

                    this.clientesAux.push(line);

                    for (let cliente of this.clientesAux) {
                        if (cliente.unidade === this.unidade && cliente.perfil === 'Cliente') {
                            this.clientes.push(cliente);
                            this.clienteId = cliente.doc;
                            this.clienteFidelidade = cliente.fidelidade;
                        }
                    }
                });
            }
        })
    }

    async carregaFormasDePagamento() {
        this.firebaseService.carregaFormasDePagamento().subscribe(data => {
            this.formaDePagamentos = data;
        })
    }

    async carregaClientesEmAberto() {
        this.firebaseService.carregaVendasClienteTempSelect().subscribe(data => {
            this.clientesTempAux = [];
            this.clientesTemp = [];
            this.clientesTempCount = 0;

            this.clientesTempAux = data;
            for (let cliente of this.clientesTempAux) {
                if (cliente.unidade === this.unidade) {
                    this.clientesTemp.push(cliente);
                    this.clientesTempCount += 1;
                }
            }
        })
    }


    async insereDadosTemp(clienteId: any, fidelidade: any, colaborador: any) {
        if (InserirProdutoCarrinhoPage.produtoInserido === false) {
            if (this.quantidadeInserida > 0) {
                if (this.cliente === undefined || this.cliente === null) {
                    const alert = await this.alertController.create({
                        message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                         <text>Selecione um Cliente!</text>`,
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

                } else {
                    if (this.categoria === 'Serviços') {

                        if (colaborador != undefined && colaborador != null && colaborador != 'Selecione um Colaborador(a)') {

                            this.firebaseService.buscaInfoColaborador(this.unidade, colaborador).subscribe(data => {
                                let dados: any = [];

                                dados = data[0];

                                this.perfilColaborador = dados.perfil;
                                this.cadastraVendaClienteTemp(clienteId, fidelidade);
                                this.cadastraVendaProdutoTemp(clienteId, fidelidade, this.perfilColaborador);
                            })

                        } else {

                            this.perfilColaborador = this.perfil;
                            this.colaborador = this.colaboradorVendedor;
                            this.cadastraVendaClienteTemp(clienteId, fidelidade);
                            this.cadastraVendaProdutoTemp(clienteId, fidelidade, this.perfilColaborador);

                        }

                    } else {
                        if (this.estoqueFinal >= 0) {
                            if (colaborador != undefined && colaborador != null && colaborador != 'Selecione um Colaborador(a)') {

                                this.firebaseService.buscaInfoColaborador(this.unidade, colaborador).subscribe(data => {
                                    let dados: any = [];

                                    dados = data[0];

                                    this.perfilColaborador = dados.perfil;
                                    this.cadastraVendaClienteTemp(clienteId, fidelidade);
                                    this.cadastraVendaProdutoTemp(clienteId, fidelidade, this.perfilColaborador);
                                })

                            } else {

                                this.perfilColaborador = this.perfil;
                                this.colaborador = this.colaboradorVendedor;
                                this.cadastraVendaClienteTemp(clienteId, fidelidade);
                                this.cadastraVendaProdutoTemp(clienteId, fidelidade, this.perfilColaborador);

                            }
                        } else {
                            const alert = await this.alertController.create({
                                message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                                 <text>Produto sem estoque disponível!</text>`,
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

                }
            } else {

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                     <text>Quantidade tem que ser maior que 0!</text>`,
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
    }
    async calculaTotal() {
        this.totalBruto = this.valorProduto * this.quantidadeInserida;

        if (this.categoria != 'Serviços')
            this.estoqueFinal = this.estoque - this.quantidadeInserida;

        this.totalComissao = parseFloat(((this.comissao * this.totalBruto) / 100).toFixed(2));
        this.totalLiquido = parseFloat((this.totalBruto - this.totalComissao).toFixed(2));
        this.totalLucro = parseFloat(((this.totalBruto - this.totalComissao) - this.totalDeCusto).toFixed(2));
    }

    async calculaTotalEven(ev?: any) {
        if (ev.currentTarget.id === 'inputQuantidade' || ev.currentTarget.id === 'inputDesconto') {
            this.totalBruto = parseFloat(((this.valorProduto * this.quantidadeInserida) - this.desconto).toFixed(2));

            if (this.categoria != 'Serviços')
                this.estoqueFinal = this.estoque - this.quantidadeInserida;

            this.totalComissao = parseFloat(((this.comissao * this.totalBruto) / 100).toFixed(2));
            this.totalLiquido = parseFloat((this.totalBruto - this.totalComissao).toFixed(2));
            this.totalLucro = parseFloat((((this.totalBruto - this.totalComissao) - this.totalDeCusto)).toFixed(2));
        }
    }

    async calculaGorjeta(ev?: any) {
        if (this.gorjeta === '')
            this.gorjeta = 0;

        this.totalComissao = parseFloat(((this.comissao * this.totalBruto) / 100).toFixed(2));
        this.totalComissao = (this.totalComissao + parseFloat(this.gorjeta));
    }

    async setQuantidadeInserida(value) {
        this.quantidadeInserida = value;
    }

    async setDescontoInserido(value) {
        this.desconto = value;
    }

    async setGorjetaInserida(value) {
        this.gorjeta = value;
    }

    async cadastraVendaClienteTemp(clienteId: any, fidelidade: any) {
        if (this.clienteValido) {
            let dadosCliente =
                [{
                    "dataVenda": this.dataVenda,
                    "vendedor": this.colaborador,
                    "unidade": this.unidade,
                    "clienteId": clienteId,
                    "cliente": this.cliente,
                    "fidelidade": fidelidade
                }];
            if (InserirProdutoCarrinhoPage.produtoInserido === false) {
                this.firebaseService.registerSaleClientTemp(dadosCliente[0]);
            }
        }
    }

    async cadastraVendaProdutoTemp(clienteId: any, fidelidade: any, colaboradorPerfil: any) {
        try {
            if (InserirProdutoCarrinhoPage.produtoInserido === false) {
                this.dataVenda = new Date().toISOString().slice(0, 10);

                if (this.gorjeta === undefined || this.gorjeta === null)
                    this.gorjeta = 0;

                let dadosProdutos =
                    [{
                        "dataVenda": this.dataVenda,
                        "vendedor": this.colaborador,
                        "colaboradorPerfil": colaboradorPerfil,
                        "unidade": this.unidade,
                        "clienteId": clienteId,
                        "cliente": this.cliente,
                        "clienteFidelidade": fidelidade,
                        "produtoId": InserirProdutoCarrinhoPage.produtoId,
                        "produto": InserirProdutoCarrinhoPage.descricao,
                        "imagem": this.imagem,
                        "categoria": InserirProdutoCarrinhoPage.categoria,
                        "quantidadeVendida": this.quantidadeInserida,
                        "fidelidade": this.fidelidade,
                        "comissao": this.comissao,
                        "gorjeta": this.gorjeta,
                        "desconto": this.desconto,
                        "estoque": InserirProdutoCarrinhoPage.estoque,
                        "estoqueFinal": this.estoqueFinal,
                        "valorDeVenda": InserirProdutoCarrinhoPage.valorDeVenda,
                        "valorDeCusto": this.valorDeCusto,
                        "totalComissao": this.totalComissao,
                        "totalDeCusto": this.totalDeCusto,
                        "totalBruto": this.totalBruto,
                        "totalLiquido": this.totalLiquido,
                        "totalLucro": this.totalLucro
                    }];

                if (InserirProdutoCarrinhoPage.produtoInserido === false) {
                    InserirProdutoCarrinhoPage.produtoInserido = true;
                    ComandaPage.comandaNaoRegistrada = false;

                    this.firebaseService.registerProductTemp(dadosProdutos[0]);
                    this.modalCtrl.dismiss();
                    InserirProdutoCarrinhoPage.produtoInserido = true;
                }

                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
         <text>Produto Inserido Na comanda do Cliente<br><b>${this.cliente}</b>!</text>`,
                    backdropDismiss: false,
                    header: "Atenção",
                    cssClass: "alertaCss",
                    buttons: [
                        {
                            text: "Ok",
                            cssClass: "secondary",

                            handler: () => {
                            },
                        },
                    ],
                });
                await alert.present();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async sair() {
        this.modalCtrl.dismiss();
    }

    async carregaClientesTemp() {
        let popover: HTMLIonPopoverElement;
        let clientes: any = [];

        for (let clientesDados of this.clientesTemp) {
            let cliente = [];
            cliente[0] = clientesDados.unidade;
            cliente[1] = clientesDados.vendedor;
            cliente[2] = clientesDados.cliente;
            clientes.push(cliente);
        }

        ClientesTempComponentComponent.clientes = clientes;
        popover = await this.popoverController.create({
            component: ClientesTempComponentComponent,
            translucent: true,
            cssClass: 'cssPopover',
            componentProps: {
                clientes: clientes,
            }
        });

        await popover.present();

        await popover.onDidDismiss().then(async data => {
            if (data.data !== undefined) {
                this.cliente = data.data[2];
            }
        });

    }
}