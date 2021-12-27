import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';

@Component({
    selector: 'app-alterar-produto',
    templateUrl: './alterar-produto.page.html',
    styleUrls: ['./alterar-produto.page.scss'],
})
export class AlterarProdutoPage implements OnInit {

    dataFinal: any;
    dataInicial: any;

    dataNovo: any;
    tituloNovo: any;
    mensagemNovo: any;
    unidadeNovo: any;
    administradorNovo: any;
    imagem: string;
    produtoId: any;
    unidade: any;
    categoria: any;
    descricao: any;
    quantidade: any;
    fidelidade: any;
    comissao: any;
    valorDeCusto: any;
    valorDeVenda: any;

    error: any;
    submitted = false;

    categorias: any = [];

    public static produtoIdAtual: any;
    public static imagemAtual: any;
    public static unidadeAtual: any;
    public static categoriaAtual: any;
    public static descricaoAtual: any;
    public static quantidadeAtual: any;
    public static fidelidadeAtual: any;
    public static comissaoAtual: any;
    public static valorDeCustoAtual: any;
    public static valorDeVendaAtual: any;

    constructor(private firebaseService: FirebaseService,
        private alertController: AlertController,
        private modalCtrl: ModalController,
        public dadosRepositories: DadosRepositories,) { }

    ngOnInit() {
        this.carregaCategorias();
        this.administradorNovo = this.dadosRepositories.getLocalStorage('nome');
        this.produtoId = AlterarProdutoPage.produtoIdAtual;
        this.imagem = AlterarProdutoPage.imagemAtual;
        this.unidade = AlterarProdutoPage.unidadeAtual;
        this.categoria = AlterarProdutoPage.categoriaAtual;
        this.descricao = AlterarProdutoPage.descricaoAtual;
        this.quantidade = AlterarProdutoPage.quantidadeAtual;
        this.fidelidade = AlterarProdutoPage.fidelidadeAtual;
        this.comissao = AlterarProdutoPage.comissaoAtual;
        this.valorDeCusto = AlterarProdutoPage.valorDeCustoAtual;
        this.valorDeVenda = AlterarProdutoPage.valorDeVendaAtual;

    }
    async atualizarProduto(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            try {
                const alert = await this.alertController.create({
                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Deseja Alterar Esse Produto:<br><b>${this.descricao}</b></text>`,

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

                                let dados =
                                {
                                    administrador: this.administradorNovo,
                                    unidade: this.unidade,
                                    produtoId: this.produtoId,
                                    imagem: this.imagem,
                                    categoria: this.categoria,
                                    descricao: this.descricao,
                                    quantidade: this.quantidade,
                                    fidelidade: this.fidelidade,
                                    comissao: this.comissao,
                                    valorDeCusto: this.valorDeCusto,
                                    valorDeVenda: this.valorDeVenda

                                };
                                this.firebaseService.atualizaProduto(this.produtoId, dados);

                                const alert = await this.alertController.create({
                                    message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                     <text>Produto Alterado Com Sucesso!</text>`,
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

                                this.produtoId = '';
                                this.imagem = '';
                                this.unidade = '';
                                this.categoria = '';
                                this.descricao = '';
                                this.quantidade = '';
                                this.fidelidade = '';
                                this.comissao = '';
                                this.valorDeCusto = '';
                                this.valorDeVenda = '';
                                await alert.present();
                                this.modalCtrl.dismiss();

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
    async sair() {
        this.modalCtrl.dismiss();
    }

    carregaCategorias() {

        this.firebaseService.carregaCategorias().subscribe(data => {
            console.log(data)

            this.categorias = data;
        })

    }

    // /**
    //  * Pegando imagem
    //  */
    async touchCapturandoImg(event) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            this.imagem = imageData;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}
