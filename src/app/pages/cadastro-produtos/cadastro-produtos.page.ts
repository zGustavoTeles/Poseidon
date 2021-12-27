import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, Config } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { Base64ImgUtil } from '../util/base64img.util';

@Component({
    selector: 'app-cadastro-produtos',
    templateUrl: './cadastro-produtos.page.html',
    styleUrls: ['./cadastro-produtos.page.scss'],
})
export class CadastroTipoProdutoPage implements OnInit {

    submitted = false;
    error: any;

    selecioneUmaCategoria: any = {
        header: 'Categorias'
    };

    ios: boolean;
    categoria: any;
    descricao: any;
    quantidade: any;
    fidelidade: any;
    comissao: any;
    valorCusto: any;
    valorVenda: any;

    categorias: any = [];
    imagem: string;
    produtoUid: any = [];

    perfil: any;
    unidade: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    email: any;
    senha: any;
    nome: any;

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        private dadosRepositories: DadosRepositories,
        private base64ImgUtil: Base64ImgUtil
    ) { }

    ngOnInit() {
        this.imagem = '';
        this.getDadosUsuario();
        this.carregaCategorias();
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.ios = this.config.get('mode') === 'ios';
    }

    ionViewDidLeave() {
        this.imagem = '';
    }

    carregaCategorias() {

        this.firebaseService.carregaCategorias().subscribe(data => {
            console.log(data)

            this.categorias = data;
        })

    }

    async cadastrarTipoVenda(form: NgForm) {
        this.submitted = true;

        if (form.valid) {

            try {

                if (this.quantidade > 0 || this.categoria === 'Serviços') {

                    if (this.categoria === 'Serviços')
                        this.quantidade = 'Serviços Disponíveis'

                    if (this.imagem.length === 0)
                        this.imagem = '';

                    let dados =
                        [{
                            "unidade": this.unidade,
                            "imagem": this.imagem,
                            "categoria": this.categoria,
                            "descricao": this.descricao,
                            "quantidade": this.quantidade,
                            "fidelidade": this.fidelidade,
                            "comissao": this.comissao,
                            "valorDeCusto": this.valorCusto,
                            "valorDeVenda": this.valorVenda

                        }];

                    console.log(dados);

                    this.firebaseService.cadastraProdutos(dados[0]);

                    const alert = await this.alertController.create({
                        message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                         <text>Produto Cadastrado Com Sucesso!</text>`,
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

                    this.imagem = '';
                    this.categoria = '';
                    this.descricao = '';
                    this.quantidade = '';
                    this.fidelidade = '';
                    this.comissao = '';
                    this.valorVenda = '';
                    this.valorCusto = '';

                    await alert.present();
                } else {
                    const alert = await this.alertController.create({
                        message: `<img src="assets/img/erro.png" alt="auto"><br><br>
                         <text>Por Favor Insira Uma Quantidade!</text>`,
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

            } catch (error) {
                console.log(error);
            }
        }
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

    // Carregando as imagens para a view
    async carregandoAsImgs() {
        this.imagem = '';
        this.imagem = this.base64ImgUtil.imgCapt;
    }

    updatePicture() {
        console.log('Clicked to update picture');
    }

    getDadosUsuario() {
        this.unidade = this.dadosRepositories.getLocalStorage('unidade');
        this.nome = this.dadosRepositories.getLocalStorage('nome');
        this.email = this.dadosRepositories.getLocalStorage('email');
        this.senha = this.dadosRepositories.getLocalStorage('senha');
        this.uid = this.dadosRepositories.getLocalStorage('uid');
        this.perfil = this.dadosRepositories.getLocalStorage('perfil');
        this.sexo = this.dadosRepositories.getLocalStorage('sexo');
    }
}
