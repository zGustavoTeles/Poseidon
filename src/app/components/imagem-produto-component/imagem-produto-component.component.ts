import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-imagem-produto-component',
  templateUrl: './imagem-produto-component.component.html',
  styleUrls: ['./imagem-produto-component.component.scss'],
})
export class ImagemProdutoComponentComponent implements OnInit {

    @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  
    produtoUrlImg: any;
    comBase64: any;
  
    sliderOpts = {
        zoom: true,
        // slidesPerView: 1.5,
        // centeredSlides: true
    };
  
    constructor(private navParams: NavParams,
                private modalCtrl: ModalController) {
    }
  
    // Pegando a imagem do produto
    ngOnInit() {
        this.produtoUrlImg = this.navParams.get('img');
        // Necessario quando a base64 vem embutida
        this.comBase64 = this.navParams.get('comBase64');
    }
  
    // Fechando o modal
    close() {
        this.modalCtrl.dismiss();
    }
  
  }
  
