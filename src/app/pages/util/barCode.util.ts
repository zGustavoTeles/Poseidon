import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

/**
 * Classe responsavel pela manuteção e controle das leituras dos codigos de barras
 * @author Starley Cazorla
 */

@Injectable()
export class BarCodeUtil {
    codigoBarras: any;

    constructor(private barcodeScanner: BarcodeScanner) { }

    // Fazendo a leitura do codigo de barras e retornando o que foi encontrado!
    async searchingBarcode() {

        const options: BarcodeScannerOptions = {
            showTorchButton: true,
        };

        await this.barcodeScanner.scan(options).then(barcodeData => {
            this.codigoBarras = barcodeData;
            console.log('Barcode data', barcodeData);

        }).catch(err => {
            console.log('Error', err);
        });
        return this.codigoBarras;

    }

}
