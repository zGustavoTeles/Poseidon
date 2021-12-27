import { Injectable, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ModalController, NavParams } from '@ionic/angular';
import { ImagemProdutoComponentComponent } from '../../components/imagem-produto-component/imagem-produto-component.component';
/**
 * Classe responsavel pela manuteção e controle das imagens dos produtos
 * @author Gustavo Teles
 */

@Injectable()
export class Base64ImgUtil {
    @ViewChild('fileInput') fileInput;

    firstImg: any;
    exibirImagem = false;
    imgCapt = '';
    filePath: any;
    title: string;

    constructor(
        private modalCtrl: ModalController,
        private camera: Camera,
        private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController) {

        this.title = (navParams.get('action') == 'edit') ? 'Editar tarefa' : 'Criar tarefa';
    }


    // Abrindo modal da imagem grande
    async abrindoImgMaior(imagem?: any) {

        await this.modalCtrl.create({
            component: ImagemProdutoComponentComponent,
            cssClass: 'modalInterno',
            componentProps: {
                img: imagem
            }
        }).then(modal => modal.present());
    }

    /**
     * Pegando imagem da camera
     */
    async getImgCamera() {
        this.imgCapt = '';
        try {

            const actionSheet = this.actionSheetCtrl.create({
                buttons: [
                    {
                        text: 'Tirar foto',
                        handler: () => {
                            this.cameraOrLibraryPhoto(this.camera.PictureSourceType.CAMERA, this.camera.MediaType.PICTURE);
                        }
                    }, {
                        text: 'Buscar na galeria',
                        handler: () => {
                            this.cameraOrLibraryPhoto(this.camera.PictureSourceType.PHOTOLIBRARY, this.camera.MediaType.PICTURE);
                        }
                    }, {
                        text: 'Cancelar',
                        role: 'cancel'
                    }
                ]
            });
            (await actionSheet).present();

            const options: CameraOptions = {
                quality: 100,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            };

            await this.camera.getPicture(options).then((imageData) => {
                const base64Image = 'data:image/jpeg;base64,' + imageData;
                console.log(base64Image)
                this.imgCapt = imageData;

            }, (err) => {
                console.log('Erro ao abrir a camera!', err);
            });

            this.camera.getPicture(this.optionsGallery).then((imageData) => {
                this.imgCapt = 'data:image/jpeg;base64,' + imageData;
               }, (err) => {
                // Handle error
                console.log(err)
               })

               console.log('aaquiiii');
               console.log(this.imgCapt);


        } catch (error) {
            console.log('Erro ao abrir a camera!', error);
        }
    }

    private optionsCamera: CameraOptions = {
        quality: 100,
        targetWidth: 600,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }

    private optionsGallery: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }

    public async processWebImage(event) {
        this.imgCapt = '';

        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            let imageData = (readerEvent.target as any).result;
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.imgCapt = imageData;
            return this.imgCapt;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    cameraOrLibraryPhoto(source: number = 1, mediaType: number = 0) {
        const options: CameraOptions = {
            quality: 100,
            mediaType: mediaType,
            sourceType: source,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG
        };

        this.camera.getPicture(options).then((imageData) => {
            this.imgCapt = 'data:image/jpeg;base64,' + imageData;
        });
    }
}
