import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController, IonicModule, NavParams } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AppRoutingModule } from "./AppRoutingModule";
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './firebaseConfig';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LoginUtil } from './pages/util/login.util';
import { AngularFireAuth } from '@angular/fire/auth';
import { ClientesTempComponentComponent } from './components/clientes-temp-component/clientes-temp-component.component';
import { FiltroProdutoComponent } from './components/filtro-produto/filtro-produto.component';
import { ClienteVendaProdutosComponentComponent } from './components/cliente-venda-produtos-component/cliente-venda-produtos-component.component';
import { FiltroVendasComponent } from './components/filtro-vendas/filtro-vendas.component';
import { ImagemProdutoComponentComponent } from './components/imagem-produto-component/imagem-produto-component.component';
import { Base64ImgUtil } from './pages/util/base64img.util';
import { CustomComponentPoseidon } from './components/components.module';

const PAGES_COMPONENTES = [
    ClientesTempComponentComponent,
    FiltroProdutoComponent,
    ClienteVendaProdutosComponentComponent,
    FiltroVendasComponent,
    ImagemProdutoComponentComponent
]
@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        HttpClientModule,
        CustomComponentPoseidon,
        FormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],

    declarations: [
        PAGES_COMPONENTES,
        AppComponent
    ],
    exports: [
        PAGES_COMPONENTES
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [ 
        SplashScreen, 
        StatusBar, 
        AngularFirestore, 
        LoginUtil, 
        AngularFireAuth, 
        Base64ImgUtil,
        Base64,
        Camera,
        ActionSheetController,
        NavParams,
    ],

    bootstrap: [AppComponent],
})
export class AppModule { }
