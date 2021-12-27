import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { AlterarNotificacoesPage } from '../alterar-notificacoes/alterar-notificacoes.page';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    perfil: any;
    unidade: any;
    sexo: any;
    uid: any;
    usuario: any = [];
    unidades: any = [];
    email: any;
    senha: any;
    nome: any;
    quantidade: any;
    imagem: any;
    imagens: any = [];
    produtosAux: any = [];
    produtos: any = [];
    noticias: any = [];

    cart = [];
    items = [];

    sliderConfig = {
        slidesPerView: 1.6,
        spaceBetween: 10,
        centeredSlides: true
    };

    constructor(private dadosRepositories: DadosRepositories,
        private firebaseService: FirebaseService,
        private loadingController: LoadingController,
        private alertController: AlertController,
        private modalCtrl: ModalController,
    ) { }

    ngOnInit() {
        this.getDadosUsuario();
        this.carregaProdutos();
        this.carregaNoticias();
        this.carregaUnidades();
        this.carregaImagens();
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

    async carregaProdutos() {

        const loading = await this.loadingController.create({
            message: '<ion-img src="/assets/gif/loading.gif" alt="loading..."></ion-img> <br> Carregando Home...',
            spinner: null,
            cssClass: 'loadingCss',
        });
        await loading.present();

        this.firebaseService.carregaProdutosIdDocumento().subscribe(data => {
            this.produtos = [];
            this.quantidade = 0;
            data.forEach(row => {
                this.produtosAux = [];
                let line = Object(row.payload.doc.data());
                line.doc = String(row.payload.doc.id);
                this.produtosAux.push(line);
                for (let produto of this.produtosAux) {
                    if (produto.unidade === this.unidade) {
                        this.produtos.push(produto);
                        this.quantidade += 1;
                    }
                }
            });

            loading.dismiss();
        });
    }

    async carregaNoticias() {
        this.firebaseService.carregaNoticais(this.unidade).subscribe(data => {
            this.noticias = [];
            data.forEach(row => {
                let line = Object(row.payload.doc.data());
                line.doc = String(row.payload.doc.id);

                this.noticias.push(line);
                console.log(this.noticias);
            });
        });
    }

    async carregaUnidades() {
        this.firebaseService.carregaUnidades(this.unidade).subscribe(data => {
            this.unidades = data;
        })
    }

    async carregaImagens() {
        this.firebaseService.carregaImagens(this.unidade).subscribe(data => {
            console.log('aquiiii');
            console.log(data);


            this.imagens = data;
            if (this.imagens[0] !== undefined && this.imagens[0] !== null)
                this.imagem = this.imagens[0].imagem;
            else
                this.imagem = "";
        })
    }

    async excluirNotificao(notificaoId: any) {

        try {
            const alert = await this.alertController.create({
                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                     <text>Deseja Excluir essa <b>Notificação?</b></text>`,

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
                            this.firebaseService.deletaNotificao(notificaoId);

                            const alert = await this.alertController.create({
                                message: `<img src="assets/img/atencao.png" alt="auto"><br><br>
                                 <text>Notificação Excluída Com Sucesso!</text>`,
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
                ]
            });
            await alert.present();

        } catch (error) {
            console.log(error);
        }
    }

    async alterarNotificao(notificaoId: any, data: any, titulo: any, mensagem: any, unidade: any, administrador: any) {

        AlterarNotificacoesPage.notificaoId = notificaoId;
        AlterarNotificacoesPage.dataAtual = data;
        AlterarNotificacoesPage.tituloAtual = titulo;
        AlterarNotificacoesPage.mensagemAtual = mensagem;
        AlterarNotificacoesPage.unidadeAtual = unidade;
        AlterarNotificacoesPage.administradorAtual = administrador;

        console.log(AlterarNotificacoesPage.administradorAtual);


        const modal = await this.modalCtrl.create({
            component: AlterarNotificacoesPage,
        });
        await modal.present();
    }

}
