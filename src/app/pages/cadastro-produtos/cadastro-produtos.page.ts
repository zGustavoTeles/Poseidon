import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, Config } from '@ionic/angular';
import { FirebaseService } from '../../firebase.service';
import { DadosRepositories } from '../../providers/dados-repositories';
import { Base64ImgUtil } from '../util/base64img.util';
import Quagga from 'quagga';

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

    barcode = '';
    barcodeResult;
    configQuagga = {
        inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: '#inputBarcode',
            constraints: {
                width: { min: 640 },
                height: { min: 480 },
                aspectRatio: { min: 1, max: 100 },
                facingMode: 'environment', // or user
            },
            singleChannel: false // true: only the red color-channel is read
        },
        locator: {
            patchSize: 'medium',
            halfSample: true
        },
        locate: true,
        numOfWorkers: 4,
        decoder: {
            readers: ['code_128_reader']
        }
    };

    constructor(
        private firebaseService: FirebaseService,
        public config: Config,
        private alertController: AlertController,
        private dadosRepositories: DadosRepositories,
        private base64ImgUtil: Base64ImgUtil,
        private ref: ChangeDetectorRef
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

    public async carregaCategorias() {
        this.firebaseService.findAllCategory().subscribe(data => {
            this.categorias = data;
        });
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

                    this.fidelidade = 0;
                    this.comissao = 0;

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

                    this.firebaseService.registerProduct(dados[0]);

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

    testChangeValues() {
        this.barcode = 'Code-barres bidon : 0123456789';
    }

    startScanner() {
        this.barcode = '';
        this.ref.detectChanges();

        Quagga.onProcessed((result) => this.onProcessed(result));

        Quagga.onDetected((result) => this.logCode(result));

        Quagga.init(this.configQuagga, (err) => {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
            console.log('Barcode: initialization finished. Ready to start');
        });


    }

    private onProcessed(result: any) {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'green', lineWidth: 2 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    }

    private logCode(result) {
        const code = result.codeResult.code;

        if (this.barcode !== code) {
            this.barcode = 'Code-barres EAN : ' + code;
            this.barcodeResult = result.codeResult;
            this.ref.detectChanges();
            console.log(this.barcode);
            console.log(this.barcodeResult);

            // this.barcodeValue = result.codeResult.code;
            // this.barcodeResult=result.codeResult
            // console.log("this.barcodeValue",this.barcodeValue)

            console.log("JSON.stringify(result.codeResult)", JSON.stringify(result.codeResult))
            console.log("Result", result)
            console.log("JSON.stringify(result)", JSON.stringify(result))
            // console.log("this.barcodeResult",this.barcodeResult.json())
            Quagga.stop();
        }

    }
}
