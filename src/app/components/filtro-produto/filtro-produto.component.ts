import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSearchbar, LoadingController, PopoverController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-filtro-produto',
    templateUrl: './filtro-produto.component.html',
    styleUrls: ['./filtro-produto.component.scss'],
})
export class FiltroProdutoComponent {
    public searchBarVisible = false;
    public textoDoFiltro = ''; // campo de texto usado pelo SearchBar
    listaPromocoesSapComFiltro = [];
    listaFonrcedoresComFiltro = [];
    listaTabelasPrecoComFiltro = [];
    listaMarcaProdutoComFiltro = [];
    listaPrincipiosAtivosComFiltro = [];
    descricaoFiltro: string;
    @ViewChild('search', { static: false }) search: IonSearchbar;
    filtros = false;

    @Output() filtrandoBuscas: EventEmitter<any> = new EventEmitter();
    filtroDefinido: any = [];
    dadosFiltro: any = [];
    filtroPor: any;
    tipoDescricao: any;
    mostrarFooter = true;
    ordernar = false;
    tipoOrdemSelecionada = ''; // Ordenação de apresentação
    tipoClassificacaoSelecionada = ''; // Classificação de produtoss
    tipoResumoSelecionado = ''; // Escolha do resumo da tela de itens do pedido
    tipoOrdenacao = [];
    tipoClassificacao: any[] = [];
    tipoResumoItens = [];
    estoqueZero = false;
    comImagem = false;
    exibeFiltro = true;
    exibeMelhorPreco = false;
    exibeListaPromocoesSap = false;
    exibeListaFornecedores = false;
    exibeListaTabelasPreco = false;
    exibeListaMarcaProduto = false;
    exibeListaPrincipioAtivo = false;
    exibeResumoProdutos = false;


    produtosDeBeleza = false;
    roupas = false;
    produtosDeLimpeza = false;
    padaria = false;
    bebidas = false;
    alimentacao = false;
    higiene = false;
    tabacaria = false;
    diversos = false;
    hortifruti = false;
    servicos = false;
    papelaria = false;
    calcados = false;

    public promocoesSapSelecionadas: string[] = [];
    public fornecedoresSelecionados: string[] = [];
    public fornecedorSelecionado = false;
    public listaTabelasPreco: any[] = [];
    public tabelasPrecoSelecionadas: string[] = [];
    public listaPrincipiosAtivos: any[] = [];
    public principioAtivoSelecionado: string[] = [];
    exibeFaixaOrdem = false;
    exibeFaixaClassificacao = false;
    @Input() public pedidoTemp: any = [];

    msgButtonPromocaoSap = 'Voltar';
    msgButtonFornecedor = 'Voltar';
    msgButtonTabelaPreco = 'Voltar';
    msgButtonMarcaProduto = 'Voltar';
    msgButtonPrincipioAtivo = 'Voltar';
    public marcaProdutoSelecionados: string[] = [];
    public infiniteScrollDesabilitado: boolean = false;

    constructor(public popoverController: PopoverController,
        private toastController: ToastController,
        private loadingController: LoadingController) {

        // Lista de tipo ordenação
        this.tipoOrdenacao = ['Código Produto', 'Nome Produto', 'Nome Fornecedor'];

        // Lista de tipo ResumoRelatorioItens
        this.tipoResumoItens = ['Por Políticas', 'Por Fornecedores'];
    }

    // Busca os filtros já definidos
    async ionViewDidEnter() {
        // Lista de tipo ordenação
        // this.tipoClassificacao = await this.produtoRespository.findGeneric('SELECT nomeGrupoProduto FROM produto GROUP BY nomeGrupoProduto');

        const filtros = JSON.parse(localStorage.getItem('filtroProduto'));

        if (filtros !== null || undefined) {
            this.tipoOrdemSelecionada = filtros.ordernar;
            this.tipoClassificacaoSelecionada = filtros.classificacao;
            this.filtroDefinido = filtros.filtros !== undefined ? filtros.filtros : [];

            this.produtosDeBeleza = filtros.produtosDeBeleza;
            this.roupas = filtros.roupas;
            this.produtosDeLimpeza = filtros.produtosDeLimpeza;
            this.padaria = filtros.padaria;
            this.bebidas = filtros.bebidas;
            this.alimentacao = filtros.alimentacao;
            this.higiene = filtros.higiene;
            this.tabacaria = filtros.tabacaria;
            this.diversos = filtros.diversos;
            this.hortifruti = filtros.hortifruti;
            this.servicos = filtros.servicos;
            this.papelaria = filtros.papelaria;
            this.calcados = filtros.calcados;
        }
    }

    // Aplicar filtro
    async touchAplicarFiltro() {
        let configFiltro: any;

        if (this.exibeResumoProdutos) {
            let resumoSelecionado = '';

            if (this.tipoResumoSelecionado === 'Por Políticas') {
                resumoSelecionado = 'tabPreco.descricao';
            } else if (this.tipoResumoSelecionado === 'Por Fornecedores') {
                resumoSelecionado = 'fab.nome';
            }

            configFiltro = ({
                resumoSelecionado
            });

            await this.popoverController.dismiss(configFiltro);

        } else {
            configFiltro = ({
                ordernar: this.tipoOrdemSelecionada,
                classificacao: this.tipoClassificacaoSelecionada,
                filtros: this.filtroDefinido,
                tabelasPrecoSelecionadas: this.tabelasPrecoSelecionadas,

                produtosDeBeleza: this.produtosDeBeleza,
                roupas: this.roupas,
                produtosDeLimpeza: this.produtosDeLimpeza,
                padaria: this.padaria,
                bebidas: this.bebidas,
                alimentacao: this.alimentacao,
                higiene: this.higiene,
                tabacaria: this.tabacaria,
                diversos: this.diversos,
                hortifruti: this.hortifruti,
                servicos: this.servicos,
                papelaria: this.papelaria,
                calcados: this.calcados
            });

            localStorage.setItem('filtroProduto', JSON.stringify(configFiltro));
        }

        await this.popoverController.dismiss(configFiltro);
        // if (!this.validaFlagsUtil.usaFiltroProdutosDivimed) {
        //     this.removerFiltroMelhorPreco();
        // }
    }

    removerFiltroMelhorPreco() {
        const configFiltro = ({
            ordernar: this.tipoOrdemSelecionada,
            classificacao: this.tipoClassificacaoSelecionada,
            filtros: this.filtroDefinido,
            tabelasPrecoSelecionadas: this.tabelasPrecoSelecionadas,

            produtosDeBeleza: this.produtosDeBeleza,
            roupas: this.roupas,
            produtosDeLimpeza: this.produtosDeLimpeza,
            padaria: this.padaria,
            bebidas: this.bebidas,
            alimentacao: this.alimentacao,
            higiene: this.higiene,
            tabacaria: this.tabacaria,
            diversos: this.diversos,
            hortifruti: this.hortifruti,
            servicos: this.servicos,
            papelaria: this.papelaria,
            calcados: this.calcados
        });

        localStorage.setItem('filtroProduto', JSON.stringify(configFiltro));
    }

    // Fechar modal sem filtro
    async fecharModal() {
        await this.popoverController.dismiss();
    }

    // Filtros selecionados
    tipoOrdem(item: string) {
        this.tipoOrdemSelecionada = item;
    }

    // Filtros selecionados
    tipoClass(item: string) {
        this.tipoClassificacaoSelecionada = item;
    }

    // Adiciona filtro por codigo
    async touchAddDescricaoFiltro(descricao: any, event?: any) {

        // if (descricao === undefined || descricao === null || descricao === '') {
        //     this.msg.alertaComOk('atencao', ' <b>Preenhca algum código ou use o leitor de codigo de barras!</b>');
        // } else {

        //     // Percorrendo o array do localStorage e verificando se ja existe o filtro!
        //     if (this.filtroDefinido.indexOf(descricao.toUpperCase()) !== -1) {

        //         this.msg.alertaComOk('atencao', ' <b>O item já existe neste filtro!</b>');
        //         this.tipoDescricao = '';

        //     } else {
        //         // Removendo do localStorage e da view!
        //         this.filtroDefinido.push(descricao.toUpperCase());

        //         this.tipoDescricao = '';
        //     }
        // }

        event.target.blur();
    }

    // Deletando itens do filtro
    touchDeletarFiltro(descricao: any) {


        if (this.textoDoFiltro !== '') {
            this.textoDoFiltro = '';
            this.filtros = false;
            // this.listaFornecedores = this.listaFonrcedoresComFiltro;
            this.listaTabelasPreco = this.listaTabelasPrecoComFiltro;
            // this.listaMarcaProduto = this.listaMarcaProdutoComFiltro;
            this.listaPrincipiosAtivos = this.listaPrincipiosAtivosComFiltro;
        } else {

            // Pegando itens do localStorage
            const removerFiltro = JSON.parse(localStorage.getItem('filtroProduto'));

            // Percorrendo o array do localStorage
            for (let i = 0; i < this.filtroDefinido.length; i++) {

                if (this.filtroDefinido[i] === descricao) {

                    this.filtroDefinido.splice(i, 1);
                    this.fornecedoresSelecionados.splice(i, 1);
                    this.tabelasPrecoSelecionadas.splice(i, 1);
                    this.marcaProdutoSelecionados.splice(i, 1);
                    this.principioAtivoSelecionado.splice(i, 1);
                    if (removerFiltro !== null) {
                        removerFiltro.filtros.splice(i, 1);
                    }
                }
            }
        }
    }

    // Apaga os filtros definidos
    touchLimparFiltro() {
        localStorage.removeItem('filtroProduto');
        this.filtroPor = '';
        this.tipoOrdemSelecionada = '';
        this.filtroDefinido = [];
        this.fornecedoresSelecionados = [];
        this.tipoClassificacaoSelecionada = '';
        this.tabelasPrecoSelecionadas = [];
        this.marcaProdutoSelecionados = [];
        this.principioAtivoSelecionado = [];

        this.produtosDeBeleza = false;
        this.roupas = false;
        this.produtosDeLimpeza = false;
        this.padaria = false;
        this.bebidas = false;
        this.alimentacao = false;
        this.higiene = false;
        this.tabacaria = false;
        this.diversos = false;
        this.hortifruti = false;
        this.servicos = false;
        this.papelaria = false;
        this.calcados = false;

    }

    // Escanea o codigo de barras
    touchAbrirLeitorDeCodigo() {
        // this.barCode.buscandoCodigo().then(res => {

        //     if (res.text.length > 4) {
        //         // Adicionando o codigo de barras automaticamente
        //         this.touchAddDescricaoFiltro(res.text);
        //     }
        // });
    }

    /**
     * Buscando a listaa de promoções SAP
     */
    public async touchExibirListaPromocoesSap() {
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br><br> Carregando...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();
        // try {

        //     this.exibeFiltro = false;
        //     this.exibeListaPromocoesSap = true;

        //     this.listaPromocoesSAP = await this.promocaoRepository.findAllOrderByNome();
        //     this.listaPromocoesSapComFiltro = this.listaPromocoesSAP;

        //     loading.dismiss();
        // } catch (err) {
        //     this.msg.alertaComOk('error', ' <b>Erro ao buscar a lista de <text>Promoções</text>!</b>');
        //     console.log('Erro ao buscar a lista de Promoções!', err)
        //     loading.dismiss();
        // }
    }

    /**
     * Buscando a lista de fornecedores
     */
    public async touchExibirListaFornecedores() {
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br><br> Carregando...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();
        try {

            this.exibeFiltro = false;
            this.exibeListaFornecedores = true;

            // this.listaFornecedores = await this.fabricanteRepository.findAllOrderByNome();
            // this.listaFonrcedoresComFiltro = this.listaFornecedores;

            loading.dismiss();
        } catch (err) {
            // this.msg.alertaComOk('error', ' <b>Erro ao buscar a lista de <text>Fornecedores</text>!</b>');
            console.log('Erro ao buscar a lista de forncedores!', err)
            loading.dismiss();
        }
    }

    /**
     * Busca a lista de tabela de precos
     */
    public async touchExibirListaTabelasPreco() {
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br><br> Carregando...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();
        // try {

        //     this.exibeFiltro = false;
        //     this.exibeListaTabelasPreco = true;

        //     if (this.pedidoTemp) {
        //         // const cliente = await this.clienteRepository.findOne(this.pedidoTemp.clienteId)

        //         /**
        //          * Quando for multiempresa ira buscar as tabelas dass duas empresas
        //          */
        //         let empresasIds: any;
        //         if (this.pedidosTempMultiEmpresa.length > 1) {
        //             empresasIds = `${this.pedidosTempMultiEmpresa[0].empresaId}, ${this.pedidosTempMultiEmpresa[1].empresaId}`;
        //         } else {
        //             empresasIds = `${this.pedidoTemp.empresaId}`;
        //         }

        //         this.listaTabelasPreco = await this.tabelaPrecoProdutoRepository.getPoliticasPorCliente(cliente, empresasIds, this.cargaInicialUtil.dadosGerais.emTipoIntegracao);
        //     } else {
        //         this.listaTabelasPreco = await this.tabelaPrecoProdutoRepository.findAllOrderByNome();
        //     }
        //     for (let tabela of this.listaTabelasPreco) {
        //         tabela["checked"] = false;
        //     }
        //     this.listaTabelasPrecoComFiltro = this.listaTabelasPreco;

        //     loading.dismiss();
        // } catch (err) {
        //     this.msg.alertaComOk('error', ' <b>Erro ao buscar a lista de <text>Tabelas de Preço</text>!</b>');
        //     console.log('Erro ao buscar a lista de Tabelas!', err)
        //     loading.dismiss();
        // }
    }

    /**
     * Busca a lista de Marca de produtos usado pela PC_SISTEMAS
     */
    public async touchExibirListaMarcaProduto() {
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br><br> Carregando...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();
        // try {
        //     this.exibeFiltro = false;
        //     this.exibeListaMarcaProduto = true;

        //     this.listaMarcaProduto = await this.produtoRespository.findAllByMarcaProduto();
        //     for (let marca of this.listaMarcaProduto) {
        //         marca.checked = false;
        //     }
        //     this.listaMarcaProdutoComFiltro = this.listaMarcaProduto;
        //     loading.dismiss();
        // } catch (err) {
        //     this.msg.alertaComOk('error', ' <b>Erro ao buscar a lista de <text>Marcas</text>!</b>');
        //     console.log('Erro ao buscar a lista de Marca!', err)
        //     loading.dismiss();
        // }
    }

    /**
     * Busca a lista de principios ativos
     */
    public async touchExibirListaPrincipioAtivo() {
        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br><br> Carregando...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();
        // try {
        //     this.exibeFiltro = false;
        //     this.exibeListaPrincipioAtivo = true;

        //     this.listaPrincipiosAtivos = await this.produtoRespository.findAllPrincipiosAtivos();
        //     for (let principio of this.listaPrincipiosAtivos) {
        //         principio["checked"] = false;
        //     }
        //     this.listaPrincipiosAtivosComFiltro = this.listaPrincipiosAtivos;
        //     loading.dismiss();
        // } catch (err) {
        //     this.msg.alertaComOk('error', ' <b>Erro ao buscar a lista de <text>Principio Ativo</text>!</b>');
        //     console.log('Erro ao buscar a lista de Principio Ativo!', err)
        //     loading.dismiss();
        // }
    }

    public async touchVoltarParaFiltro() {
        this.exibeFiltro = true;
        this.exibeListaPromocoesSap = false;
        this.exibeListaFornecedores = false;
        this.exibeListaTabelasPreco = false;
        this.exibeListaMarcaProduto = false;
        this.exibeListaPrincipioAtivo = false;
        this.listaFonrcedoresComFiltro = [];
        this.listaTabelasPrecoComFiltro = [];
        this.listaMarcaProdutoComFiltro = [];
        this.listaPrincipiosAtivosComFiltro = [];

        if (this.promocoesSapSelecionadas.length > 0) {
            for (const descricao of this.promocoesSapSelecionadas) {
                if (this.filtroDefinido.indexOf(descricao.toUpperCase()) !== -1) {
                    console.log('Promoção já adicionada!');
                } else {
                    this.filtroDefinido.push(descricao);
                }
            }
        } else if (this.fornecedoresSelecionados.length > 0) {
            for (const nomeFornecedor of this.fornecedoresSelecionados) {
                if (this.filtroDefinido.indexOf(nomeFornecedor.toUpperCase()) !== -1) {
                    console.log('Fornecedor já adicionado!');
                } else {
                    this.filtroDefinido.push(nomeFornecedor);
                }
            }
        } else if (this.tabelasPrecoSelecionadas.length > 0) {
            for (const tabelaPreco of this.tabelasPrecoSelecionadas) {
                if (this.filtroDefinido.indexOf(tabelaPreco.toUpperCase()) !== -1) {
                    console.log('Tabela de preço já adicionada!');
                } else {
                    this.filtroDefinido.push(tabelaPreco);
                }
            }
        } else if (this.marcaProdutoSelecionados.length > 0) {
            for (const marcaProduto of this.marcaProdutoSelecionados) {
                if (this.filtroDefinido.indexOf(marcaProduto.toUpperCase()) !== -1) {
                    console.log('Marca produto já adicionada!');
                } else {
                    this.filtroDefinido.push(marcaProduto);
                }
            }
        } else if (this.principioAtivoSelecionado !== undefined && this.principioAtivoSelecionado.length > 0) {
            this.filtroDefinido.push(this.principioAtivoSelecionado);
        }
    }

    /**
     * Seleciona a promoção 
     * @param promocao 
     */
    public async touchSelecionarPromocaoSap(promocao: any) {
        this.promocoesSapSelecionadas = [];
        if (this.promocoesSapSelecionadas.indexOf(promocao.descricao) === -1) {
            this.promocoesSapSelecionadas.push(promocao.descricao);
            this.msgButtonPromocaoSap = 'Aplicar promoção';
        } else {
            this.promocoesSapSelecionadas.splice(this.promocoesSapSelecionadas.indexOf(promocao.descricao), 1);
        }


        if (this.promocoesSapSelecionadas.length <= 0) {
            this.msgButtonPromocaoSap = 'Voltar';
        }

        // await this.touchVoltarParaFiltro();
    }

    public async touchSelecionarFornecedor(fornecedor: any) {
        this.listaFonrcedoresComFiltro = [];
        if (this.fornecedoresSelecionados.indexOf(fornecedor.nome) === -1) {
            this.fornecedoresSelecionados.push(fornecedor.nome);
            this.msgButtonFornecedor = 'Aplicar fornecedor';
        } else {
            this.fornecedoresSelecionados.splice(this.fornecedoresSelecionados.indexOf(fornecedor.nome), 1);
        }


        if (this.fornecedoresSelecionados.length <= 0) {
            this.msgButtonFornecedor = 'Voltar';
        }

        // await this.touchVoltarParaFiltro();
    }

    public async touchSelecionarTabelaPreco(tabelaPreco: any) {
        this.listaTabelasPrecoComFiltro = [];
        if (this.tabelasPrecoSelecionadas.indexOf(tabelaPreco.descricao) === -1) {
            tabelaPreco.checked = true;
            this.tabelasPrecoSelecionadas.push(tabelaPreco.descricao);
            this.msgButtonTabelaPreco = 'Aplicar tabela de preço';
        } else {
            tabelaPreco.checked = false;
            this.tabelasPrecoSelecionadas.splice(this.tabelasPrecoSelecionadas.indexOf(tabelaPreco.descricao), 1);
        }

        if (this.tabelasPrecoSelecionadas.length <= 0) {
            this.msgButtonTabelaPreco = 'Voltar';
        }
    }

    public async touchSelecionarMarcaProduto(marca: any) {
        this.listaMarcaProdutoComFiltro = [];
        if (this.marcaProdutoSelecionados.indexOf(marca.descricaoMarca) === -1) {
            this.marcaProdutoSelecionados.push(marca.descricaoMarca);
            marca.checked = true;
            this.msgButtonMarcaProduto = 'Aplicar marca';
        } else {
            marca.checked = false;
            this.marcaProdutoSelecionados.splice(this.marcaProdutoSelecionados.indexOf(marca.descricaoMarca), 1);
        }

        if (this.marcaProdutoSelecionados.length <= 0) {
            this.msgButtonMarcaProduto = 'Voltar';
        }
    }

    public async touchSelecionarPrincipioAtivo(principio: any) {
        this.listaPrincipiosAtivosComFiltro = [];
        if (this.principioAtivoSelecionado.indexOf(principio.principioAtivo) === -1) {
            principio.checked = true;
            this.principioAtivoSelecionado.push(principio.principioAtivo);
            this.msgButtonPrincipioAtivo = 'Aplicar Principio Ativo';
        } else {
            principio.checked = false;
            this.principioAtivoSelecionado.splice(this.principioAtivoSelecionado.indexOf(principio.principioAtivo), 1);
        }
        // await this.touchVoltarParaFiltro();

        if (this.principioAtivoSelecionado.length <= 0) {
            this.msgButtonPrincipioAtivo = 'Voltar';
        }
    }

    exibleSearchBar() {
        this.searchBarVisible = !this.searchBarVisible;
        if (this.searchBarVisible) {
            setTimeout(() => {
                this.search.setFocus();
            }, 400);
        }
    }

    // Tira o foco da pesquisa
    async tirarFoco(event: any) {
        event.target.blur();
        this.exibleSearchBar();
    }

    // Buscando fornecedores por descrição
    async pesquisarItensNoFiltro(ev: any): Promise<any> {
        if (ev.target !== undefined) {
            this.textoDoFiltro = ev.target.value;
        } else {
            this.textoDoFiltro = ev;
        }

        if (this.textoDoFiltro.length >= 1) {
            const toast = await this.toastController.create({
                message: 'Filtrando...',
                cssClass: 'toastCss',
            });
            await toast.present();
            this.filtros = true;

            // this.listaPromocoesSAP = [];
            // this.listaFornecedores = [];
            // this.listaTabelasPreco = [];
            // this.listaMarcaProduto = [];
            // this.listaPrincipiosAtivos = [];
            try {
                if (this.listaPromocoesSapComFiltro.length > 0) {
                    return this.listaPromocoesSapComFiltro.filter(async (item) => {
                        if (item.descricao.toLowerCase().includes(this.textoDoFiltro.toLowerCase())) {

                            // this.listaPromocoesSAP.push(item);
                            await toast.dismiss();
                            return true;
                        } else {
                            await toast.dismiss();
                            return true;
                        }
                    });
                }

                if (this.listaFonrcedoresComFiltro.length > 0) {
                    return this.listaFonrcedoresComFiltro.filter(async (item) => {
                        if (item.nome.toLowerCase().includes(this.textoDoFiltro.toLowerCase())) {

                            // this.listaFornecedores.push(item);
                            await toast.dismiss();
                            return true;
                        } else {
                            await toast.dismiss();
                            return true;
                        }
                    });
                }

                if (this.listaTabelasPrecoComFiltro.length > 0) {
                    return this.listaTabelasPrecoComFiltro.filter(async (item) => {
                        if (item.descricao.toLowerCase().includes(this.textoDoFiltro.toLowerCase())) {

                            this.listaTabelasPreco.push(item);
                            await toast.dismiss();
                            return true;
                        } else {
                            await toast.dismiss();
                            return true;
                        }
                    });
                }

                if (this.listaMarcaProdutoComFiltro.length > 0) {
                    return this.listaMarcaProdutoComFiltro.filter(async (item) => {
                        if (item.descricaoMarca.toLowerCase().includes(this.textoDoFiltro.toLowerCase())) {

                            // this.listaMarcaProduto.push(item);
                            await toast.dismiss();
                            return true;
                        } else {
                            await toast.dismiss();
                            return true;
                        }
                    });
                }

                if (this.listaPrincipiosAtivosComFiltro.length > 0) {
                    return this.listaPrincipiosAtivosComFiltro.filter(async (item) => {
                        if (item.principioAtivo.toLowerCase().includes(this.textoDoFiltro.toLowerCase())) {

                            this.listaPrincipiosAtivos.push(item);
                            await toast.dismiss();
                            return true;
                        } else {
                            await toast.dismiss();
                            return true;
                        }
                    });
                }

            } catch (err) {
                // this.msg.alertaComOk('error', ' <b>Erro ao filtrar fornecedores!</b>');
                console.log('Erro ao filtrar fornecedores:', err);
                await toast.dismiss();
            }
            await toast.dismiss();
        }

    }

    // async carregaMaisPrincipiosAtivos(infiniteScroll) {
    //     // produtosFiltrados =  listaPrincipiosAtivosComFiltro
    //     // listaProdutosComFiltro = listaPrincipiosAtivos
    //     setTimeout(() => {
    //         if (this.listaPrincipiosAtivosComFiltro.length === this.listaPrincipiosAtivos.length) {
    //             this.presentToast('Fim da lista');
    //             this.infiniteScrollDesabilitado = true;
    //             infiniteScroll.target.complete();
    //         } else {
    //             // console.log('Lista carregada!');
    //             const tamanhoAtual = this.listaPrincipiosAtivosComFiltro.length;
    //             // console.log('Recarregando lista');
    //             const restante = this.listaPrincipiosAtivos.length - this.listaPrincipiosAtivosComFiltro.length;
    //             if (restante > 20) {
    //                 for (let i = tamanhoAtual; i < tamanhoAtual + 20; i++) {
    //                     this.listaPrincipiosAtivosComFiltro.push(this.listaPrincipiosAtivos[i]);
    //                 }
    //             } else {
    //                 for (let i = tamanhoAtual; i < this.listaPrincipiosAtivos.length; i++) {
    //                     this.listaPrincipiosAtivosComFiltro.push(this.listaPrincipiosAtivos[i]);
    //                 }
    //             }
    //         }

    //         // this.zone.run(() => console.log('atualizando a tela'));
    //         infiniteScroll.target.complete();

    //     }, 500);
    // }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            cssClass: 'toastCss',
            duration: 3000
        });
        toast.present();
    }

}
